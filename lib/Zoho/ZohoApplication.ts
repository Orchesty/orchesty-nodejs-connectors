import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ScopeSeparatorEnum from 'pipes-nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';

export default class ZohoApplication extends AOAuth2Application {
  
  protected SCOPE_SEPARATOR = ScopeSeparatorEnum.SPACE;
  
  private AUTH_URL = 'https://accounts.zoho.eu/oauth/v2/auth';
  private TOKEN_URL = 'https://accounts.zoho.eu/oauth/v2/token';
  private SCOPES = ['ZohoCRM.modules.ALL', 'ZohoCRM.settings.ALL'];
  
  public getAuthUrl(): string {
    return this.AUTH_URL;
  }
  
  public getDescription(): string {
    return 'Zoho is a provider of a Customer Relationship Management (CRM) solution';
  }
  
  public getName(): string {
    return 'zoho';
  }
  
  public getPublicName(): string {
    return 'Zoho';
  }
  
  getRequestDto(dto: ProcessDto, applicationInstall: ApplicationInstall, method: string | HttpMethods, url?: string, data?: string): RequestDto | Promise<RequestDto> {
    const request = new RequestDto(this.getUri(url)
    .toString(), parseHttpMethod(method));
    request.headers =
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.getAccessToken(applicationInstall)}`,
      };
    
    if (data) {
      request.body = data;
    }
    
    return request;
    
  }
  
  public getScopes(applicationInstall: ApplicationInstall): string[] {
    applicationInstall;
    return this.SCOPES;
  }
  
  public getSettingsForm(): Form {
    return new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
  }
  
  public getTokenUrl(): string {
    return this.TOKEN_URL;
  }
  
}
