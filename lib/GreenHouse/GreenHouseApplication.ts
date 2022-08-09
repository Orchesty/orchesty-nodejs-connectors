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

export const USERNAME = 'username';
export const PASSWORD = 'password';
export const NAME = 'green-house';

export default class GreenHouseApplication extends ABasicApplication {
  public getName = (): string => 'green-house';

  public getPublicName = (): string => 'Green House';

  public getDescription = (): string => 'Green House description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, USERNAME, ' username', undefined, true))
      .addField(new Field(FieldType.PASSWORD, PASSWORD, ' password', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const request = new RequestDto(`https://harvest.greenhouse.io/v1/${_url}`, method, dto);
    const username = applicationInstall.getSettings()[AUTHORIZATION_FORM][USERNAME];
    const password = applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD];
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: encode(`${username}:${password}`),
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}
