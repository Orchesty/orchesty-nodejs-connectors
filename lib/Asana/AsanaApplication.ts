import { BodyInit } from 'node-fetch';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';

const BASE_URL = 'https://app.asana.com';

export default class AsanaApplication extends AOAuth2Application {
  public getAuthUrl = (): string => 'https://app.asana.com/-/oauth_authorize';

  public getTokenUrl = (): string => 'https://app.asana.com/-/oauth_token';

  public getName = (): string => 'asana';

  public getPublicName = (): string => 'Asana';

  public getDescription = (): string => 'Asana Application';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
    }

    const token = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[TOKEN];
    return new RequestDto(
      new URL(url ?? '', BASE_URL).toString(),
      method,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Bearer ${token.accessToken}`,
      },
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['default'];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
}
