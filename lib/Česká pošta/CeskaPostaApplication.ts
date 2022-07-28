import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';

export const NAME = 'ceska-posta';
export const API_TOKEN = 'api_token';
export const CONTENT_SHA256 = 'content_sha256';
export const HMAC_SHA256_AUTH = 'HMAC_SHA256_Auth';
const AUTHORIZATION_TIMESTAMP = 'authorization_timestamp';

export default class CeskaPostaApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Ceska Posta';

  public getDescription = (): string => 'Ceska Posta description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, API_TOKEN, 'api token', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const url = `http://localhost:8080/restservices/ZSKService/v1/${_url}`;
    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: encode(`${API_TOKEN}:${HMAC_SHA256_AUTH}:${CONTENT_SHA256}`),
    };

    if (data) {
      request.setJsonBody(data);
    }
    applicationInstall.addSettings(
      {
        [AUTHORIZATION_TIMESTAMP]: DateTimeUtils.getTimestamp(DateTimeUtils.utcDate),
      },
    );
    return request;
  };
}
