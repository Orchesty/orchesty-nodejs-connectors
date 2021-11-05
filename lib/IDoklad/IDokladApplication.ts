import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';

export const BASE_URL = 'https://api.idoklad.cz/v3';

export default class IDokladApplication extends AOAuth2Application {
  public getName = (): string => 'i-doklad';

  public getPublicName = (): string => 'iDoklad';

  public getDescription = (): string => 'iDoklad Application';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> {
    const headers = new Headers({
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, data, headers);
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', true));

  public getAuthUrl = (): string => 'https://identity.idoklad.cz/server/connect/authorize';

  public getTokenUrl = (): string => 'https://identity.idoklad.cz/server/connect/token';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['idoklad_api', 'offline_access'];
}
