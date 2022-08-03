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
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';
import { createHash, createHmac, randomUUID } from 'crypto';

export const NAME = 'ceska-posta';
export const API_TOKEN = 'api_token';
export const CONTENT_SHA256 = 'Authorization-Content-SHA256';
export const TIMESTAMP = 'Authorization-Timestamp';
export const SECRET_KEY = 'secret_key';
export const HMAC256_HASH = 'Authorization';

export default class CeskaPostaApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'CeskaPosta';

  public getDescription = (): string => 'CeskaPosta description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, API_TOKEN, 'api token', undefined, true))
      .addField(new Field(FieldType.TEXT, SECRET_KEY, 'secret key', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const uuidv4 = randomUUID();
    const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
    const timestamp = DateTimeUtils.getTimestamp(DateTimeUtils.utcDate) / 1000;
    const url = `https://b2b.postaonline.cz:444/restservices/ZSKService/v1/${_url}`;
    const request = new RequestDto(url, method, dto);
    const headers: HeadersInit = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [TIMESTAMP]: timestamp.toString(),
      [CommonHeaders.AUTHORIZATION]: authorizationForm[API_TOKEN],
    };
    if (method === HttpMethods.GET) {
      const signature = `;${timestamp};${uuidv4}`;
      const hmac256hash = createHmac('sha256', authorizationForm[SECRET_KEY]).update(signature).digest('base64');
      headers[HMAC256_HASH] = `CP-HMAC-SHA256 nonce="${uuidv4}" signature="${hmac256hash}"`;
    } else {
      const sha256Hash = createHash('sha256').update(JSON.stringify(data)).digest('hex');
      const signature = `${sha256Hash};${timestamp};${uuidv4}`;
      const hmac256hash = createHmac('sha256', authorizationForm[SECRET_KEY]).update(signature).digest('base64');
      headers[CONTENT_SHA256] = sha256Hash;
      headers[HMAC256_HASH] = `CP-HMAC-SHA256 nonce="${uuidv4}" signature="${hmac256hash}"`;
    }
    request.headers = headers;
    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}
