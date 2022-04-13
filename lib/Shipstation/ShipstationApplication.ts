import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

export const SHIPSTATION_URL = 'https://ssapi.shipstation.com';
export const ORDER_NOTIFY = 'ORDER_NOTIFY';

export default class ShipstationApplication extends ABasicApplication implements IWebhookApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'ShipStation helps eCommerce retailers organize, process, and fulfill their orders from all the most popular marketplaces and shopping carts using the top shipping carriers.';

  public getName = (): string => 'shipstation';

  public getPublicName = (): string => 'Shipstation';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzZEQkU0NiIgZD0iTTM2LjUxMywxOC42MWMyLjkzMSwyLjE1LDUuNzY3LDQuMTc2LDguNTEyLDYuMzE5YzAuODg2LDAuNjkyLDEuNDg2LDAuNTk0LDIuNDQ3LDAuMTUzDQoJYzMuNTQtMS42MjYsNy4wNzgtMy4zMTksMTAuNzY2LTQuNTMyYzEuNzQzLTAuNTc0LDIuMzQzLTEuMzkyLDIuNTY3LTIuOTg4YzAuNzE4LTUuMTM0LDEuNDg1LTEwLjI2MiwyLjI1LTE1LjM4OQ0KCUM2My4xNTcsMS40NzUsNjMuMzU1LDAuNzkxLDYzLjUzMiwwYzcuNTUsMCwxNS4wNjYsMCwyMi44MjEsMGMwLjczOSw0LjgxMiwxLjcxMiw5LjYxMSwyLjE0MywxNC40NTkNCgljMC4zMjYsMy42NiwxLjIwNyw2LjA5LDUuMzY0LDYuOTAxYzIuODQ2LDAuNTU1LDUuNDk3LDIuMjM0LDguMTU3LDMuNTY3YzEuMTYsMC41ODEsMS45MjIsMC42MzksMy4wMjctMC4yMDMNCgljNC44MDQtMy42NjEsOS43MDUtNy4xOTQsMTQuNDI0LTEwLjY2NmM1LjM4Myw1LjQyNSwxMC43MjcsMTAuODEsMTYuMjQ5LDE2LjM3M2MtMy4xNTMsNC4yODUtNi41Miw5LjAxNy0xMC4wNzUsMTMuNjA0DQoJYy0xLjIwOSwxLjU2LTEuMzAyLDIuNjc5LTAuMzkyLDQuNDc5YzEuNjU5LDMuMjgsMi45ODUsNi43NDcsNC4xOTYsMTAuMjI0YzAuNDQ5LDEuMjg5LDEuMDA5LDEuNzk5LDIuMjgxLDEuOTgNCgljNS4yMDIsMC43NDEsMTAuMzkyLDEuNTU3LDE1LjU4NiwyLjM1NGMwLjgzNCwwLjEyOCwxLjY2MSwwLjMwMSwyLjY2NSwwLjQ4NWMwLDQuMTQzLDAsOC4xODksMCwxMi4yMzUNCgljMCwyLjk4OS0wLjA0NCw1Ljk4LDAuMDIxLDguOTY4YzAuMDI3LDEuMjI2LTAuMzQzLDEuNjk5LTEuNjM0LDEuODc0Yy01LjQ4NywwLjc0NC0xMC45NSwxLjY3NS0xNi40MzYsMi40MzENCgljLTEuMzgzLDAuMTktMS45OTMsMC42OTItMi40ODIsMi4wNzJjLTEuNDkxLDQuMjAyLTMuMjU0LDguMzA4LTUuMDc5LDEyLjg2OGMzLjYyNiw0LjkyNCw3LjU3OCwxMC4yOTIsMTEuMzgxLDE1LjQ1OA0KCWMtNS4zOTksNS4zOTQtMTAuNzY0LDEwLjc1NC0xNi4zMjIsMTYuMzA2Yy00Ljk0NS0zLjY0My0xMC4zMDItNy41OS0xNS4zOS0xMS4zMzljLTQuNzEzLDEuODE1LTkuMjgsMy40OTQtMTMuNzU1LDUuMzg4DQoJYy0wLjY0NSwwLjI3My0xLjA3OSwxLjU0Ni0xLjIyMSwyLjQyYy0wLjk0Myw1LjgxMi0xLjc4MSwxMS42NDEtMi42NzEsMTcuNTg1Yy03LjYxNCwwLTE1LjEyNiwwLTIyLjkzOSwwDQoJYy0wLjU2Ny0zLjYxNy0xLjE0Ny03LjMwNy0xLjcyMy0xMC45OTdjLTAuMDQ0LTAuMjgxLTAuMDM5LTAuNTY5LTAuMDg0LTAuODQ5Yy0wLjQxLTIuNTIzLTAuMDg5LTUuNjA2LTEuNDU2LTcuNDA0DQoJYy0xLjI2Ny0xLjY2Ni00LjM1NS0xLjkyMi02LjYxMy0yLjg2OWMtMS43NjQtMC43NC0zLjYyNC0xLjM4LTUuMTg2LTIuNDRjLTEuNzQ5LTEuMTg2LTIuODgtMC43NjctNC40LDAuNDExDQoJYy00LjU0NiwzLjUyMy05LjIzMiw2Ljg2NC0xMy43NzQsMTAuMjFjLTUuMzc1LTUuNDM0LTEwLjcwNy0xMC44MjQtMTYuMi0xNi4zNzZjMy4zOTktNC42MTIsNi45NzYtOS41NTIsMTAuNjY3LTE0LjQwNw0KCWMwLjgxOS0xLjA3OCwwLjc4Ny0xLjgxNiwwLjI0MS0zLjAwN2MtMS42NTMtMy42MDUtMy4yMDQtNy4yNjYtNC41NzEtMTAuOTg4Yy0wLjQ5OC0xLjM1Ni0xLjEyNy0xLjg1OC0yLjUxLTIuMDQ2DQoJQzExLjkzNiw4OC4yNTUsNi4wNDcsODcuMzI2LDAsODYuNDJjMC03LjU4LDAtMTUuMDksMC0yMi45MjhjMi41OTQtMC40MTIsNS4yOTUtMC44NDgsNy45OTgtMS4yNw0KCWMzLjUwOC0wLjU0OCw3LjAyOC0xLjAyNywxMC41MTUtMS42ODFjMC42MzEtMC4xMTgsMS4zNzgtMC44MjcsMS42NDktMS40NDhjMS42NzQtMy44MywzLjE1My03Ljc0Niw0Ljg2OS0xMS41NTUNCgljMC40ODktMS4wODYsMC40MjMtMS43MTQtMC4yNjYtMi42MzFDMjEuMDk0LDQwLjAyNywxNy41LDM1LjA4OCwxNCwzMC4zMzNjNS40NDMtNS40NCwxMC44MDktMTAuODAzLDE2LjI5OS0xNi4yOQ0KCUMzMi4xNjksMTUuNDIzLDM0LjI3NiwxNi45NzcsMzYuNTEzLDE4LjYxeiBNNzAuOTc3LDUwLjIzMmMtMTIuODk1LDIuMDQ5LTIyLjgzNiwxNC4wMzctMjAuNzg0LDI4LjU3Mw0KCWMxLjk4NSwxNC4wNjQsMTYuMDA1LDIzLjU2LDMwLjIxOSwyMC41MTVjMTMuNjY5LTIuOTI5LDIyLjIzMS0xNy4zMTMsMTguNjE0LTMwLjkwMUM5Ni4zMzksNTguMzI2LDg1Ljg3OSw0OC4yNTcsNzAuOTc3LDUwLjIzMnoiLz4NCjwvc3ZnPg0K';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto {
    const request = new RequestDto(this.getUri(url).toString(), method, dto);
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
    return this.getRequestDto(
      request,
      applicationInstall,
      HttpMethods.POST,
      `${SHIPSTATION_URL}/webhooks/subscribe`,
      JSON.stringify({
        name: subscription.getParameters().name,
        event: ORDER_NOTIFY,
        /* eslint-disable @typescript-eslint/naming-convention */
        target_url: url,
        store_id: undefined,
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    );
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
  ): string => (dto.jsonBody as { id: string }).id;

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 200;

  private _getToken = (applicationInstall: ApplicationInstall): string => encode(
    `${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER]}:
      ${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][PASSWORD]}`,
  );
}
