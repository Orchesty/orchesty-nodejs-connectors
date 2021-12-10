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
import { BodyInit } from 'node-fetch';

export const BASE_URL = 'https://api.sendgrid.com/v3';

export default class SendGridApplication extends ABasicApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Cloud-based email infrastructure relieves businesses of the cost and complexity of maintaining custom email systems';

  public getName = (): string => 'send-grid';

  public getPublicName = (): string => 'SendGrid';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzlERTFGMyIgZD0iTTUwLDUwSDB2MTAwaDEwMFY1MEg1MHoiLz4NCjxwYXRoIGZpbGw9IiMyN0I0RTEiIGQ9Ik01MCwwdjEwMGgxMDBWMEg1MHoiLz4NCjxwYXRoIGZpbGw9IiMxQTgyRTIiIGQ9Ik0wLDE1MGg1MHYtNTBIMFYxNTB6IE0xMDAsNTBoNTBWMGgtNTBMMTAwLDUweiIvPg0KPHBhdGggZmlsbD0iIzIzOUZENyIgZD0iTTUwLDEwMGg1MFY1MEg1MFYxMDB6Ii8+DQo8L3N2Zz4NCg==';

  public getRequestDto(
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
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
