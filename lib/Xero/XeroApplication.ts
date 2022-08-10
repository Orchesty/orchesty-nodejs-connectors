import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';

export const NAME = 'xero';
export default class XeroApplication extends AOAuth2Application {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Xero';

  public getDescription = (): string => 'Xero description';

  public getAuthUrl = (): string => 'https://login.xero.com/identity/connect/authorize';

  public getTokenUrl = (): string => 'https://identity.xero.com/connect/token';

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const clientId = applicationInstall.getSettings()[AUTHORIZATION_FORM][USER];
    const clientSecret = applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD];
    const url = `https://api.xero.com/api.xro/2.0/${_url}`;
    const request = new RequestDto(url ?? '', method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${clientId}:${clientSecret}`)}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

    return new FormStack().addForm(form);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [];
}
