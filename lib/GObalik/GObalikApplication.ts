import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';

export const NAME = 'go-balik';
export const USER = 'user';
export const PASSWORD = 'password';

export default class GObalikApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'GO balik';

  public getDescription = (): string => 'GO balik description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, USER, 'user', undefined, true))
      .addField(new Field(FieldType.TEXT, PASSWORD, 'password', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const url = `https://go-balik.cz/api/v1/${_url}`;
    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: encode(`${USER}:${PASSWORD}`),
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}