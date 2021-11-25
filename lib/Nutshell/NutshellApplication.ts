import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { BodyInit } from 'node-fetch';

export default class NutshellApplication extends ABasicApplication {
  public getDescription = (): string => 'Nutshell v1';

  public getName = (): string => 'nutshell';

  public getPublicName = (): string => 'Nutshell';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const request = new RequestDto(this.getUri(url)
      .toString(), method);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${this._getToken(applicationInstall)}`,
    };
    if (data) {
      request.body = data;
    }

    return request;
  };

  public getSettingsForm = (): Form => (new Form())
    .addField(new Field(FieldType.TEXT, USER, 'Username', undefined, true))
    .addField(new Field(FieldType.TEXT, PASSWORD, 'API Key', undefined, true));

  private _getToken = (applicationInstall: ApplicationInstall): string => encode(
    // eslint-disable-next-line max-len
    `${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER]}:${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][PASSWORD]}`,
  );
}
