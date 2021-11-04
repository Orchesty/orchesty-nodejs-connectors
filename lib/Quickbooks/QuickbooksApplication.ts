import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';

export const QUICKBOOKS_URL = 'https://appcenter.intuit.com/connect/oauth2';
export const TOKEN_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
export const APP_ID = 'app_id';

const SCOPES = ['com.intuit.quickbooks.accounting'];
const VERSION = 'v3';
const BASE_URL = 'https://quickbooks.api.intuit.com';

export default class QuickbooksApplication extends AOAuth2Application {
  getDescription(): string {
    return 'Quickbooks v1';
  }
  
  getName(): string {
    return 'quickbooks';
  }
  
  getPublicName(): string {
    return 'Quickbooks';
  }
  
  getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> {
    const request = new RequestDto(
      this.getUri(`${this._getBaseUrl(applicationInstall)}${url}`)
      .toString(),
      method,
    );
    
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    };
    
    if (data) {
      request.body = data;
    }
    
    return request;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getScopes(applicationInstall: ApplicationInstall): string[] {
    return SCOPES;
  }
  
  getSettingsForm(): Form {
    return (new Form())
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
    .addField(new Field(FieldType.TEXT, APP_ID, 'Realm Id', undefined, true));
  }
  
  getAuthUrl(): string {
    return QUICKBOOKS_URL;
  }
  
  getTokenUrl(): string {
    return TOKEN_URL;
  }
  
  private _getBaseUrl = (
    applicationInstall: ApplicationInstall,
  ): string => `${BASE_URL}/${VERSION}/company/${applicationInstall.getSettings()[FORM][APP_ID]}`;
}
