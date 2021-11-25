import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { BodyInit } from 'node-fetch';

export const INSTANCE_NAME = 'instance_name';

const SALES_URL = 'https://login.salesforce.com/services/oauth2/authorize';
const TOKEN_URL = 'https://login.salesforce.com/services/oauth2/token';

export default class SalesForceApplication extends AOAuth2Application {
  public getDescription = (): string => 'Salesforce is one of the largest CRM platform.';

  public getName = (): string => 'salesforce';

  public getPublicName = (): string => 'Salesforce';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const request = new RequestDto(url ?? '', parseHttpMethod(method));
    request.headers = {
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    };

    if (data) {
      request.body = data;
    }

    return request;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [];

  public getSettingsForm = (): Form => (new Form())
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
    .addField(new Field(FieldType.TEXT, INSTANCE_NAME, 'Instance Name', undefined, true));

  public getAuthUrl = (): string => SALES_URL;

  public getTokenUrl = (): string => TOKEN_URL;
}
