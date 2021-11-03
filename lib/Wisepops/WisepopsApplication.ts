import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';

const API_KEY = 'api_key';
const WISEPOOPS_URL = 'https://app.wisepops.com/api1/hooks';
const EMAIL_EVENT = 'email';

export default class WisepopsApplication extends ABasicApplication implements IWebhookApplication {
  public getDescription = (): string => 'Build website popups.';

  public getName = (): string => 'wisepops';

  public getPublicName = (): string => 'Wisepops';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto => {
    const request = new RequestDto(this.getUri(url)
      .toString(), parseHttpMethod(method));
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]:
      /* eslint-enable @typescript-eslint/naming-convention */
        `WISEPOPS-API key="${applicationInstall.getSettings()[FORM][API_KEY]}"`,
    };

    if (data) {
      request.body = data;
    }

    return request;
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, API_KEY, 'API Key', undefined, true));

  public getWebhookSubscribeRequestDto = (
    applicationInstall: ApplicationInstall,
    subscription: WebhookSubscription,
    url: string,
  ): RequestDto => {
    const request = new ProcessDto();
    return this.getRequestDto(request, applicationInstall, HttpMethods.POST, WISEPOOPS_URL,
      JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        target_url: url,
        event: subscription.getParameters().name,
      }));
  };

  public getWebhookSubscriptions = (): WebhookSubscription[] => [
    new WebhookSubscription('Collected Emails', 'Webhook', '', { name: EMAIL_EVENT }),
  ];

  public getWebhookUnsubscribeRequestDto = (applicationInstall: ApplicationInstall, id: string): RequestDto => {
    const request = new ProcessDto();
    return this.getRequestDto(
      request,
      applicationInstall,
      HttpMethods.DELETE,
      `${WISEPOOPS_URL}?hook_id=${id}`,
    );
  };

  public processWebhookSubscribeResponse = (
    dto: ResponseDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationInstall: ApplicationInstall,
  ): string => JSON.parse(dto.body).id;

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 200;
}
