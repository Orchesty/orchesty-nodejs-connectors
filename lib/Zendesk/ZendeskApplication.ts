import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const SUBDOMAIN = 'subdomain';
export const NAME = 'zendesk';
export default class ZendeskApplication extends AOAuth2Application {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Zendesk is a customer support software. It helps companies and organisations manage customer queries and problems through a ticketing system.';

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Zendesk';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gZmlsbD0iIzAzMzYzRCIgcG9pbnRzPSI2OS4yOTQsNDguMTc3IDAuMDE1LDEzMS44MzIgNjkuMjk0LDEzMS44MzIgIi8+DQo8cGF0aCBmaWxsPSIjMDMzNjNEIiBkPSJNMzQuNjkyLDUyLjc3MWMxOS4xMTcsMCwzNC42MDMtMTUuNDg2LDM0LjYwMy0zNC42MDNIMC4wMTVDMC4wMTUsMzcuMjg1LDE1LjU3NSw1Mi43NzEsMzQuNjkyLDUyLjc3MXoiLz4NCjxwb2x5Z29uIGZpbGw9IiMwMzM2M0QiIHBvaW50cz0iODAuNzA1LDE4LjE2OCA4MC43MDUsMTAxLjgyMyAxNDkuOTg1LDE4LjE2OCAiLz4NCjxwYXRoIGZpbGw9IiMwMzM2M0QiIGQ9Ik0xMTUuMzA4LDk3LjIyOWMtMTkuMTE3LDAtMzQuNjAzLDE1LjQ4Ni0zNC42MDMsMzQuNjAzaDY5LjIwNg0KCUMxNDkuOTExLDExMi43MTUsMTM0LjQyNSw5Ny4yMjksMTE1LjMwOCw5Ny4yMjl6Ii8+DQo8L3N2Zz4NCg==';

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto | Promise<RequestDto> => {
    const subdomain = applicationInstall.getSettings()[AUTHORIZATION_FORM][SUBDOMAIN];
    const url = `https://${subdomain}.zendesk.com/api/v2${_url}`;

    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['read', 'write'];

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField((new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true)))
      .addField((new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true)))
      .addField((new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)));

    return new FormStack().addForm(form);
  };

  public getAuthUrlWithSubdomain = (applicationInstall: ApplicationInstall): string => `https://${applicationInstall.getSettings()[AUTHORIZATION_FORM][SUBDOMAIN]}.zendesk.com/oauth/authorizations/new`;

  public getAuthUrl(): string {
    throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getAuthUrlWithSubdomain.name}] instead.`);
  }

  public getTokenUrlWithSubdomain = (applicationInstall: ApplicationInstall): string => `https://${applicationInstall.getSettings()[AUTHORIZATION_FORM][SUBDOMAIN]}.zendesk.com/oauth/tokens`;

  public getTokenUrl(): string {
    throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getTokenUrlWithSubdomain.name}] instead.`);
  }

  protected _getScopesSeparator = (): string => ScopeSeparatorEnum.SPACE;
}
