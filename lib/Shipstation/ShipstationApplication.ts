import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';

export const SHIPSTATION_URL = 'https://ssapi.shipstation.com';
export const ORDER_NOTIFY = 'ORDER_NOTIFY';

export default class ShipstationApplication extends ABasicApplication implements IWebhookApplication {
  public getDescription = (): string => 'Shipstation v1';
  
  public getName = (): string => 'shipstation';
  
  public getPublicName = (): string => 'Shipstation';
  
  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto {
    const request = new RequestDto(this.getUri(url)
    .toString(), method);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${this._getToken(applicationInstall)}`,
    };
    if (data) {
      request.body = data;
    }
    
    return request;
  }
  
  public getSettingsForm = (): Form => new Form()
  .addField(new Field(FieldType.TEXT, USER, 'API Key', undefined, true))
  .addField(new Field(FieldType.TEXT, PASSWORD, 'API Secret', undefined, true));
  
  public getWebhookSubscribeRequestDto(
    applicationInstall: ApplicationInstall,
    subscription: WebhookSubscription,
    url: string,
  ): RequestDto {
    const request = new ProcessDto();
    return this.getRequestDto(request, applicationInstall, HttpMethods.POST, `${SHIPSTATION_URL}/webhooks/subscribe`,
      JSON.stringify({
        name: subscription.getParameters().name,
        event: ORDER_NOTIFY,
        /* eslint-disable @typescript-eslint/naming-convention */
        target_url: url,
        store_id: undefined,
        /* eslint-enable @typescript-eslint/naming-convention */
      }));
  }
  
  public getWebhookSubscriptions = (): WebhookSubscription[] => [
    new WebhookSubscription('New order', 'Webhook', '', { name: ORDER_NOTIFY }),
  ];
  
  public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, id: string): RequestDto {
    const request = new ProcessDto();
    return this.getRequestDto(
      request,
      applicationInstall,
      HttpMethods.DELETE,
      `${SHIPSTATION_URL}/webhooks/${id}`,
    );
  }
  
  public processWebhookSubscribeResponse = (
    dto: ResponseDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationInstall: ApplicationInstall,
  ): string => JSON.parse(dto.body).id;
  
  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 200;
  
  private _getToken = (applicationInstall: ApplicationInstall): string => encode(
    `${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER]}:
      ${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][PASSWORD]}`,
  );
}
