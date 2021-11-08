import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ApplicationTypeEnum from 'pipes-nodejs-sdk/dist/lib/Application/Base/ApplicationTypeEnum';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';

const APP_ID = 'app_id';
export const BASE_URL = 'https://api.hubapi.com';

export default class HubSpotApplication extends AOAuth2Application implements IWebhookApplication {
  public getApplicationType = (): ApplicationTypeEnum => ApplicationTypeEnum.WEBHOOK;

  public getName = (): string => 'hub-spot';

  public getPublicName = (): string => 'HubSpot';

  public getAuthUrl = (): string => 'https://app.hubspot.com/oauth/authorize';

  public getTokenUrl = (): string => 'https://api.hubapi.com/oauth/v1/token';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'HubSpot offers a full stack of software for marketing, sales, and customer service, with a completely free CRM at its core. They’re powerful alone — but even better when used together.';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto {
    const headers = new Headers({
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, data, headers);
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
    .addField(new Field(FieldType.PASSWORD, CLIENT_SECRET, 'Client Secret', true))
    .addField(new Field(FieldType.TEXT, APP_ID, 'Application Id', null, true));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['contacts'];

  public getWebhookSubscriptions = (): WebhookSubscription[] => [
    new WebhookSubscription('Create Contact', 'Webhook', '', { name: 'contact.creation' }),
    new WebhookSubscription('Delete Contact', 'Webhook', '', { name: 'contact.deletion' }),
  ];

  public getWebhookSubscribeRequestDto(
    applicationInstall: ApplicationInstall,
    subscription: WebhookSubscription,
    url: string,
  ): RequestDto {
    const hubspotUrl = `${BASE_URL}/webhooks/v1/${applicationInstall.getSettings()[FORM][APP_ID]}`;
    const body = JSON.stringify({
      webhookUrl: url,
      subscriptionDetails: {
        subscriptionType: subscription.getParameters().name,
        propertyName: 'email',
      },
      enabled: false,
    });

    return this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.POST, hubspotUrl, body);
  }

  public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, id: string): RequestDto {
    const url = `${BASE_URL}/webhooks/v1/${applicationInstall.getSettings()[FORM][APP_ID]}/subscriptions/${id}`;

    return this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.DELETE, url);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public processWebhookSubscribeResponse = (dto: ResponseDto, applicationInstall: ApplicationInstall): string => {
    const jsonBody = dto.jsonBody as {id: string};

    return jsonBody.id ?? '';
  };

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 204;
}
