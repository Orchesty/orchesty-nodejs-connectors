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

const AUTH_URL = 'https://accounts.zoho.eu/oauth/v2/auth';

export default class ZohoApplication extends AOAuth2Application {
  public getAuthUrl = (): string => AUTH_URL;

  public getDescription = (): string => 'Zoho is a provider of a Customer Relationship Management (CRM) solution';

  public getName = (): string => 'zoho';

  public getPublicName = (): string => 'Zoho';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> {
    const request = new RequestDto(this.getUri(url)
      .toString(), parseHttpMethod(method));
    request.headers = {
      'Content-Type': 'application/json',
      /* eslint-disable @typescript-eslint/naming-convention */
      Accept: 'application/json',
      Authorization: `Bearer ${this.getAccessToken(applicationInstall)}`,
      /* eslint-enable @typescript-eslint/naming-convention */
    };

    if (data) {
      request.body = data;
    }

    return request;
  }

  public getScopes = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationInstall: ApplicationInstall,
  ): string[] => ['ZohoCRM.modules.ALL', 'ZohoCRM.settings.ALL'];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

  public getTokenUrl = (): string => 'https://accounts.zoho.eu/oauth/v2/token';

  protected _getScopesSeparator = (): string => ScopeSeparatorEnum.SPACE;
}
