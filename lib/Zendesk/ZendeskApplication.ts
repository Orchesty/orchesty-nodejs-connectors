import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ScopeSeparatorEnum from 'pipes-nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';

const AUTH_URL = 'https://%s.zendesk.com/oauth/authorizations/new';

const SUBDOMAIN = 'subdomain';

export default class ZendeskApplication extends AOAuth2Application {
  protected _getScopesSeparator = (): string => ScopeSeparatorEnum.SPACE;

  public getAuthUrl = (): string => AUTH_URL;

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Zendesk is a customer support software. It helps companies and organisations manage customer queries and problems through a ticketing system.';

  public getName = (): string => 'zendesk';

  public getPublicName = (): string => 'Zendesk';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> => {
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
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['read', 'write'];

  public getSettingsForm = (): Form => (new Form())
    .addField((new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)));

  public getTokenUrl = (): string => 'https://%s.zendesk.com/oauth/tokens';
}
