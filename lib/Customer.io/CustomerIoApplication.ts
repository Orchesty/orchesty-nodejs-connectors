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

export const NAME = 'customer-io';
export const SITE_ID = 'site_id';
export const API_KEY = 'api_key';

export default class CustomerIoApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Customer Io';

  public getDescription = (): string => 'Customer Io description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, SITE_ID, 'site id', undefined, true))
      .addField(new Field(FieldType.TEXT, API_KEY, 'api key', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: unknown,
  ): RequestDto => {
    const request = new RequestDto(`https://track.customer.io/api/v1/${url}`, method, dto);
    const siteId = applicationInstall.getSettings()[AUTHORIZATION_FORM][SITE_ID];
    const apiKey = applicationInstall.getSettings()[AUTHORIZATION_FORM][API_KEY];
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${siteId}:${apiKey}`)}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}
