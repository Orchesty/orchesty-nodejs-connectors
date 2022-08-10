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

export const SUBDOMAIN = 'subdomain';
export const NAME = 'sage-hr';
export const API_KEY = 'api_key';
export default class SageHrApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Sage Hr';

  public getDescription = (): string => 'Sage Hr description';

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const settings = applicationInstall.getSettings();
    const key = settings[AUTHORIZATION_FORM][API_KEY];
    const subdomain = settings[AUTHORIZATION_FORM][SUBDOMAIN];
    const url = `https://${subdomain}.sage.hr/api/${_url}`;
    const request = new RequestDto(url ?? '', method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      'X-Auth-Token': key,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField((new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true)))
      .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

    return new FormStack().addForm(form);
  };
}
