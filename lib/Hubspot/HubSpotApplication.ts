import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ApplicationTypeEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/ApplicationTypeEnum';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';

const APP_ID = 'app_id';
export const BASE_URL = 'https://api.hubapi.com';

export default class HubSpotApplication extends AOAuth2Application implements IWebhookApplication {
  public getApplicationType = (): ApplicationTypeEnum => ApplicationTypeEnum.WEBHOOK;

  public getName = (): string => 'hub-spot';

  public getPublicName = (): string => 'HubSpot';

  public getAuthUrl = (): string => 'https://app.hubspot.com/oauth/authorize';

  public getTokenUrl = (): string => 'https://api.hubapi.com/oauth/v1/token';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iT3V0bGluZXNfLV9GdWxsX0NvbG9yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KCSB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1MHB4IiBoZWlnaHQ9IjE1MHB4IiB2aWV3Qm94PSIwIDAgMTUwIDE1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUwIDE1MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iU3Byb2NrZXQiPg0KCTxnPg0KCQk8ZGVmcz4NCgkJCTxyZWN0IGlkPSJTVkdJRF8xXyIgeD0iMy4xODIiIHk9IjAiIHdpZHRoPSIxNDMuNjM2IiBoZWlnaHQ9IjE1MCIvPg0KCQk8L2RlZnM+DQoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPg0KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBvdmVyZmxvdz0idmlzaWJsZSIvPg0KCQk8L2NsaXBQYXRoPg0KCQk8ZyBjbGlwLXBhdGg9InVybCgjU1ZHSURfMl8pIj4NCgkJCTxnPg0KCQkJCTxkZWZzPg0KCQkJCQk8cmVjdCBpZD0iU1ZHSURfM18iIHg9IjMuMTgyIiB5PSIwIiB3aWR0aD0iMTQzLjYzNiIgaGVpZ2h0PSIxNTAiLz4NCgkJCQk8L2RlZnM+DQoJCQkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+DQoJCQkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgb3ZlcmZsb3c9InZpc2libGUiLz4NCgkJCQk8L2NsaXBQYXRoPg0KCQkJCTxnIGNsaXAtcGF0aD0idXJsKCNTVkdJRF80XykiPg0KCQkJCQk8cGF0aCBmaWxsPSIjRkY3QTU5IiBkPSJNMTEzLjMwMSw0OS45MDhWMzIuMjMxYzQuNzc2LTIuMjMxLDcuODM3LTcuMDE1LDcuODYtMTIuMjg2di0wLjQxMw0KCQkJCQkJYy0wLjAyLTcuNTEzLTYuMTA1LTEzLjU5OC0xMy42MTgtMTMuNjE4aC0wLjQxM2MtNy41MTMsMC4wMi0xMy41OTgsNi4xMDUtMTMuNjE4LDEzLjYxOHYwLjQxMw0KCQkJCQkJYzAuMDIzLDUuMjcxLDMuMDg1LDEwLjA1Niw3Ljg2LDEyLjI4NnYxNy43MTRjLTYuNzI3LDEuMDI5LTEzLjA2MiwzLjgxNi0xOC4zNjUsOC4wODFsLTQ4LjYxMy0zNy44Ng0KCQkJCQkJYzIuMjEtOC4yNzYtMi43MDYtMTYuNzc2LTEwLjk4Mi0xOC45ODdTNi42MzYsMy44ODUsNC40MjUsMTIuMTYxczIuNzA2LDE2Ljc3NiwxMC45ODIsMTguOTg3DQoJCQkJCQljMy45NTcsMS4wNTcsOC4xNzEsMC41MDYsMTEuNzIzLTEuNTMzbDQ3Ljc5NiwzNy4yMDhjLTguODExLDEzLjI5Mi04LjU3NCwzMC42MjYsMC41OTcsNDMuNjczbC0xNC41NDUsMTQuNTQ1DQoJCQkJCQljLTEuMTY4LTAuMzcyLTIuMzg0LTAuNTctMy42MDktMC41ODhjLTYuOTczLDAtMTIuNjI2LDUuNjUzLTEyLjYyNiwxMi42MjZzNS42NTMsMTIuNjI2LDEyLjYyNiwxMi42MjYNCgkJCQkJCXMxMi42MjYtNS42NTMsMTIuNjI2LTEyLjYyNmwwLDBjLTAuMDE3LTEuMjI1LTAuMjE1LTIuNDQxLTAuNTg4LTMuNjA5bDE0LjM4OS0xNC4zODljMTcuMDI4LDEzLjAwNiw0MS4zNzYsOS43NDYsNTQuMzgyLTcuMjgyDQoJCQkJCQljMTMuMDA2LTE3LjAyOCw5Ljc0Ni00MS4zNzYtNy4yODItNTQuMzgyYy01LjE1NC0zLjkzNy0xMS4yMTQtNi41MTktMTcuNjI0LTcuNTEgTTEwNy4zMTQsMTA4LjE0NQ0KCQkJCQkJYy0xMC45OTUtMC4wMjUtMTkuODg4LTguOTU5LTE5Ljg2Mi0xOS45NTRzOC45NTktMTkuODg4LDE5Ljk1NC0xOS44NjJjMTAuOTgxLDAuMDI1LDE5Ljg2Nyw4LjkzNywxOS44NjIsMTkuOTE3DQoJCQkJCQljMCwxMC45OTUtOC45MTMsMTkuOTA4LTE5LjkwOCwxOS45MDgiLz4NCgkJCQk8L2c+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'HubSpot offers a full stack of software for marketing, sales, and customer service, with a completely free CRM at its core. They’re powerful alone — but even better when used together.';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto {
    const headers = new Headers({
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
  }

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', true))
      .addField(new Field(FieldType.TEXT, APP_ID, 'Application Id', null, true));

    return new FormStack().addForm(form);
  };

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
    const hubspotUrl = `${BASE_URL}/webhooks/v1/${applicationInstall.getSettings()[AUTHORIZATION_FORM][APP_ID]}`;
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
    const url = `${BASE_URL}/webhooks/v1/${applicationInstall
      .getSettings()[AUTHORIZATION_FORM][APP_ID]}/subscriptions/${id}`;

    return this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.DELETE, url);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public processWebhookSubscribeResponse = (dto: ResponseDto, applicationInstall: ApplicationInstall): string => {
    const jsonBody = dto.jsonBody as { id: string };

    return jsonBody.id ?? '';
  };

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 204;
}
