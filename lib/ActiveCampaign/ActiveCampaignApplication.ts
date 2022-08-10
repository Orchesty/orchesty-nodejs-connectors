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
import { APPLICATION_TOKEN } from '../Humaans/HumaansApplication';

export const NAME = 'active-campaign';

export default class ActiveCampaignApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Active Campaign';

  public getDescription = (): string => 'Active Campaign description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, APPLICATION_TOKEN, 'Application token', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): RequestDto => {
    const settings = applicationInstall.getSettings();
    const token = settings[AUTHORIZATION_FORM][APPLICATION_TOKEN];
    const url = `https://youraccountname.api-us1.com/api/3/${_url}`;
    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,

    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}
