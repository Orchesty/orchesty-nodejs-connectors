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

export const NAME = 'bulk-gate';
export const CREATE_FORM = 'create_form';
export const APPLICATION_ID = 'application_id';
export const APPLICATION_TOKEN = 'application_token';

export default class BulkGateApplicationApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Bulk Gate Application';

  public getDescription = (): string => 'Bulk Gate Application description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, APPLICATION_ID, 'Application Id', undefined, true))
      .addField(new Field(FieldType.TEXT, APPLICATION_TOKEN, 'Application token', undefined, true));

    return new FormStack()
      .addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const url = `https://portal.bulkgate.com/api/1.0/simple/${_url}`;
    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
    };

    if (data) {
      const newBody = {
        [APPLICATION_ID]: applicationInstall.getSettings()[AUTHORIZATION_FORM][APPLICATION_ID],
        [APPLICATION_TOKEN]: applicationInstall.getSettings()[AUTHORIZATION_FORM][APPLICATION_TOKEN],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...data as any,
      };
      request.setJsonBody(newBody);
    }

    return request;
  };
}
