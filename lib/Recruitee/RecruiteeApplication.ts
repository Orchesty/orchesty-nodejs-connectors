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

export const NAME = 'recruitee';
export const API_TOKEN = 'api token';

export default class RecruiteeApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Recruitee';

  public getDescription = (): string => 'Recruitee description';

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
    const request = new RequestDto(`https://${_url}`, method, dto);
    const apiToken = applicationInstall.getSettings()[AUTHORIZATION_FORM][API_TOKEN];
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${apiToken}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}
