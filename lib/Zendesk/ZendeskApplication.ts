import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ScopeSeparatorEnum from 'pipes-nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const SUBDOMAIN = 'subdomain';

export default class ZendeskApplication extends AOAuth2Application {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Zendesk is a customer support software. It helps companies and organisations manage customer queries and problems through a ticketing system.';

  public getName = (): string => 'zendesk';

  public getPublicName = (): string => 'Zendesk';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const request = new RequestDto(this.getUri(url)
      .toString(), method);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    };

    if (data) {
      request.body = data;
    }

    return request;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['read', 'write'];

  public getSettingsForm = (): Form => (new Form())
    .addField((new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)));

  public getAuthUrlWithSubdomain = (applicationInstall: ApplicationInstall): string => `https://${applicationInstall.getSettings()[FORM][SUBDOMAIN]}.zendesk.com/oauth/authorizations/new`;

  public getAuthUrl(): string {
    throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getAuthUrlWithSubdomain.name}] instead.`);
  }

  public getTokenUrlWithSubdomain = (applicationInstall: ApplicationInstall): string => `https://${applicationInstall.getSettings()[FORM][SUBDOMAIN]}.zendesk.com/oauth/tokens`;

  public getTokenUrl(): string {
    throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getTokenUrlWithSubdomain.name}] instead.`);
  }

  protected _getScopesSeparator = (): string => ScopeSeparatorEnum.SPACE;
}
