import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CurlSender from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import { OAuth2Provider } from 'pipes-nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

export const MAILCHIMP_URL = 'https://login.mailchimp.com/oauth2/authorize';
export const MAILCHIMP_DATACENTER_URL = 'https://login.mailchimp.com';
export const AUDIENCE_ID = 'audience_id';
export const TOKEN_URL = 'https://login.mailchimp.com/oauth2/token';
export const API_KEYPOINT = 'api_keypoint';
export const SEGMENT_ID = 'segment_id';

export default class MailchimpApplication extends AOAuth2Application implements IWebhookApplication {
  constructor(private _sender: CurlSender, private _inputProvider: OAuth2Provider) {
    super(_inputProvider);
  }

  public getDescription = (): string => 'Mailchimp v3';

  public getName = (): string => 'mailchimp';

  public getPublicName = (): string => 'Mailchimp';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto {
    const request = new RequestDto(this.getUri(url)
      .toString(), method);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `OAuth ${this.getAccessToken(applicationInstall)}`,
    };

    if (data) {
      request.body = data;
    }

    return request;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
    .addField(new Field(FieldType.TEXT, AUDIENCE_ID, 'Audience Id', undefined, true));

  public getAuthUrl = (): string => MAILCHIMP_URL;

  public getTokenUrl = (): string => TOKEN_URL;

  public getWebhookSubscriptions = (): WebhookSubscription[] => [
    new WebhookSubscription('Create User', 'starting-point', '', { name: 'subscribe' }),
    new WebhookSubscription('Update User', 'starting-point', '', { name: 'upemail' }),
    new WebhookSubscription('Delete User', 'starting-point', '', { name: 'unsubscribe' }),
  ];

  public getWebhookSubscribeRequestDto = (
    applicationInstall: ApplicationInstall,
    subscription: WebhookSubscription,
    url: string,
  ): RequestDto => this.getRequestDto(
    new ProcessDto(),
    applicationInstall,
    HttpMethods.POST,
    `${applicationInstall.getSettings()[API_KEYPOINT]}
    /3.0/lists/${applicationInstall.getSettings()[FORM][AUDIENCE_ID]}/webhooks`,
    JSON.stringify(
      {
        url,
        events: {
          [subscription.getParameters().name]: true,
        },
        sources:
          {
            user: true,
            admin: true,
            api: true,
          },
      },
    ),
  );

  public getWebhookUnsubscribeRequestDto = (
    applicationInstall: ApplicationInstall,
    id: string,
  ): RequestDto => this.getRequestDto(
    new ProcessDto(),
    applicationInstall,
    HttpMethods.DELETE,
    // eslint-disable-next-line max-len
    `${applicationInstall.getSettings()[API_KEYPOINT]}/3.0/lists/${applicationInstall.getSettings()[FORM][AUDIENCE_ID]}/webhooks/${id}`,
  );

  public processWebhookSubscribeResponse = (
    dto: ResponseDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationInstall: ApplicationInstall,
  ): string => JSON.parse(dto.body).id;

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 204;

  public async getApiEndpoint(applicationInstall: ApplicationInstall): Promise<string> {
    const output = await this._sender.send(
      this.getRequestDto(
        new ProcessDto(),
        applicationInstall,
        HttpMethods.GET,
        '%s/oauth2/metadata',
        MAILCHIMP_DATACENTER_URL,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return output.jsonBody as { api_endpoint: string }['api_endpoint'] ?? '';
  }
}
