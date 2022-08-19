import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';

export const NAME = 'plivo';
export const AUTH_ID = 'Authorization_id';
export const AUTH_TOKEN = 'Authorization_token';

export default class PlivoApplication extends ABasicApplication {
  public getName = (): string => 'plivo';

  public getPublicName = (): string => 'Plivo';

  public getDescription = (): string => 'Plivo description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, AUTH_ID, ' Authorization id', undefined, true))
      .addField(new Field(FieldType.PASSWORD, AUTH_TOKEN, ' Authorization token', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: unknown,
  ): RequestDto => {
    const request = new RequestDto(`https://api.plivo.com/v1/${url}`, method, dto);
    const id = applicationInstall.getSettings()[AUTHORIZATION_FORM][AUTH_ID];
    const token = applicationInstall.getSettings()[AUTHORIZATION_FORM][AUTH_TOKEN];
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${id}:${token}`)}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}
