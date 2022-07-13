import { ABasicApplication, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const PIPEDRIVE_URL = 'https://api.pipedrive.com';
export const ADDED = 'added';
export const ACTIVITY = 'activity';

export default class PipedriveApplication extends ABasicApplication implements IWebhookApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Sales pipeline and CRM software for deal makers. Get super-organized. Close deals in less time.';

  public getName = (): string => 'pipedrive';

  public getPublicName = (): string => 'Pipedrive';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGlkPSJwYXRoLTEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjRkZGRkZGIiBkPSJNNTkuNjU3LDU5LjA0OWMwLDEyLjMzNiw2LjI1OCwyNS42NDMsMjAuMDI5LDI1LjY0Mw0KCQkJYzEwLjIxMywwLDIwLjUzOS03Ljk3MywyMC41MzktMjUuODI0YzAtMTUuNjUxLTguMTE3LTI2LjE1OC0yMC4xOTktMjYuMTU4QzcwLjE4MSwzMi43MSw1OS42NTcsMzkuNjI2LDU5LjY1Nyw1OS4wNDl6DQoJCQkgTTg0Ljg3OCw5Ljg1OGMyNC42OTIsMCw0MS4yOTUsMTkuNTU2LDQxLjI5NSw0OC42NjdjMCwyOC42NTQtMTcuNDksNDguNjU4LTQyLjQ5NCw0OC42NThjLTExLjkyMSwwLTE5LjU1Ny01LjEwNi0yMy41NS04LjgwMg0KCQkJYzAuMDI4LDAuODc2LDAuMDQ3LDEuODU4LDAuMDQ3LDIuOTA1djM4Ljg1NkgzNC41OTdWMzYuNjE2YzAtMS41MDUtMC40ODEtMS45ODEtMS45NzMtMS45ODFoLTguNzk3VjExLjk2M2gyMS40NjQNCgkJCWM5Ljg4MiwwLDEyLjQxMiw1LjAzLDEyLjg5Myw4LjkwN0M2Mi4xOTYsMTYuMzc0LDcwLjUxMiw5Ljg1OCw4NC44NzgsOS44NTh6Ii8+DQoJPC9nPg0KCTxnIGlkPSJQaXBlZHJpdmVfbGV0dGVyX2xvZ29fbGlnaHQiPg0KCQk8ZyBpZD0iUGlwZWRyaXZlX21vbm9ncmFtX2xvZ29fbGlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY3LjAwMDAwMCwgNDQuMDAwMDAwKSI+DQoJCQk8ZyBpZD0iQ2xpcC01Ij4NCgkJCQk8cGF0aCBpZD0icGF0aC0xXzFfIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzI2MjkyQyIgZD0iTS03LjM0MywxNS4wNDkNCgkJCQkJYzAsMTIuMzM2LDYuMjU4LDI1LjY0MywyMC4wMjksMjUuNjQzYzEwLjIxMywwLDIwLjUzOS03Ljk3MywyMC41MzktMjUuODI0YzAtMTUuNjUxLTguMTE3LTI2LjE1OC0yMC4xOTktMjYuMTU4DQoJCQkJCUMzLjE4MS0xMS4yOS03LjM0My00LjM3NC03LjM0MywxNS4wNDl6IE0xNy44NzgtMzQuMTQyYzI0LjY5MiwwLDQxLjI5NSwxOS41NTYsNDEuMjk1LDQ4LjY2Nw0KCQkJCQljMCwyOC42NTQtMTcuNDksNDguNjU4LTQyLjQ5NCw0OC42NThjLTExLjkyMSwwLTE5LjU1Ny01LjEwNi0yMy41NS04LjgwMmMwLjAyOCwwLjg3NiwwLjA0NywxLjg1OCwwLjA0NywyLjkwNXYzOC44NTZoLTI1LjU3OQ0KCQkJCQlWLTcuMzg0YzAtMS41MDUtMC40ODEtMS45ODEtMS45NzMtMS45ODFoLTguNzk3di0yMi42NzFoMjEuNDY0YzkuODgyLDAsMTIuNDEyLDUuMDMsMTIuODkzLDguOTA3DQoJCQkJCUMtNC44MDQtMjcuNjI2LDMuNTEyLTM0LjE0MiwxNy44NzgtMzQuMTQyeiIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';

  public getRequestDto(
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: BodyInit,
  ): RequestDto {
    const join = _url?.indexOf('?') ? '&' : '?';
    const url = `${_url}${join}api_token=${this._getToken(applicationInstall)}`;
    const request = new RequestDto(url.toString(), method, dto);
    request.headers = {
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
    };
    if (data) {
      request.body = data;
    }

    return request;
  }

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, USER, 'API token', undefined, true));

    return new FormStack().addForm(form);
  };

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
  ): string => applicationInstall.getSettings()[AUTHORIZATION_FORM][USER];
}
