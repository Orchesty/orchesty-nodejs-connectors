import { ABasicApplication, TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';

export const BASE_URL = 'https://api.sendgrid.com/v3';

export default class SendGridApplication extends ABasicApplication {
  public getDescription = (): string => 'Send Email With Confidence.';

  public getName = (): string => 'send-grid';

  public getPublicName = (): string => 'SendGrid';

  public getRequestDto(
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> {
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error('Application SendGrid is not authorized!');
    }

    const settings = applicationInstall.getSettings();
    const token = settings[AUTHORIZATION_SETTINGS][TOKEN];
    const dto = new RequestDto(
      new URL(url ?? BASE_URL).toString(),
      method,
      JSON.stringify({
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
      }),
    );
    if (data) {
      dto.body = data;
    }

    return dto;
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, TOKEN, 'Api key', undefined, true));
}
