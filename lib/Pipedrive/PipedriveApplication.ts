import { ABasicApplication, USER } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

export const PIPEDRIVE_URL = 'https://api.pipedrive.com';
export const ADDED = 'added';
export const ACTIVITY = 'activity';

export default class PipedriveApplication extends ABasicApplication implements IWebhookApplication {
  public getDescription = (): string => 'Pipedrive v1';

  public getName = (): string => 'pipedrive';

  public getPublicName = (): string => 'Pipedrive';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: BodyInit,
  ): RequestDto {
    const join = _url?.indexOf('?') ? '&' : '?';
    const url = this.getUri(`${_url}${join}api_token=${this._getToken(applicationInstall)}`);
    const request = new RequestDto(url.toString(), method);
    request.headers = {
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
    };
    if (data) {
      request.body = data;
    }

    return request;
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, USER, 'API token', undefined, true));

  public getWebhookSubscribeRequestDto(
    applicationInstall: ApplicationInstall,
    subscription: WebhookSubscription,
    url: string,
  ): RequestDto {
    return this.getRequestDto(
      new ProcessDto(),
      applicationInstall,
      HttpMethods.POST,
      `${PIPEDRIVE_URL}/v1/webhooks`,
      JSON.stringify(
        {
          /* eslint-disable @typescript-eslint/naming-convention */
          subscription_url: url,
          event_action: subscription.getParameters().action,
          event_object: subscription.getParameters().object,
          /* eslint-enable @typescript-eslint/naming-convention */
        },
      ),
    );
  }

  public getWebhookSubscriptions = (): WebhookSubscription[] => [
    new WebhookSubscription(
      'New activity',
      'Webhook',
      '',
      {
        action:
        ADDED,
        object:
        ACTIVITY,
      },
    ),
  ];

  public getWebhookUnsubscribeRequestDto = (
    applicationInstall: ApplicationInstall,
    id: string,
  ): RequestDto => this.getRequestDto(
    new ProcessDto(),
    applicationInstall,
    HttpMethods.DELETE,
    `${PIPEDRIVE_URL}/v1/webhooks/${id}`,
  );

  public processWebhookSubscribeResponse = (
    dto: ResponseDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationInstall: ApplicationInstall,
  ): string => (dto.jsonBody as { data: { id: string } }).data.id;

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 200;

  private _getToken = (
    applicationInstall: ApplicationInstall,
  ): string => applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER];
}
