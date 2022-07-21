import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import {
  ABasicApplication,
  PASSWORD,
  USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';

export const NAME = 'fakturaonline';
export const API_KEY = 'api_key';

export default class FakturaonlineApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Fakturaonline';

  public getDescription = (): string => 'Fakturaonline description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const url = `https://api.fakturaonline.cz/v0/${_url}`;
    const request = new RequestDto(url, method, dto);
    const settings = applicationInstall.getSettings();
    const apiKey = encode(`${settings[AUTHORIZATION_FORM][API_KEY]}`);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `${apiKey}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}