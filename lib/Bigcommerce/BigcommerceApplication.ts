import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { Headers } from 'node-fetch';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';

export default class BigcommerceApplication extends AOAuth2Application {
  public getName = (): string => 'bigcommerce';

  public getPublicName = (): string => 'Bigcommerce';

  public getDescription = (): string => 'Bigcommerce v1';

  public getAuthUrl = (): string => 'https://login.bigcommerce.com/oauth2/authorize';

  public getTokenUrl = (): string => 'https://login.bigcommerce.com/oauth2/token';

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
      [CommonHeaders.AUTHORIZATION]: `OAuth ${this.getAccessToken(applicationInstall)}`,
    });
    if (url) {
      return new RequestDto(url, method, data, headers);
    }
    throw Error('Url is empty');
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['store_v2_products'];
}
