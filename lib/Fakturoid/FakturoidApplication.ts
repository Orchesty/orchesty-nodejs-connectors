import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { BodyInit, Headers } from 'node-fetch';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';

export const BASE_URL = 'https://app.fakturoid.cz/api/v2';
export const BASE_ACCOUNTS = 'accounts';
export const ACCOUNT = 'account';

export default class FakturoidApplication extends ABasicApplication {
  public getName = (): string => 'fakturoid';

  public getPublicName = (): string => 'Fakturoid';

  public getDescription = (): string => 'Fakturoid aplication';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const userName = applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER];
    const password = applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][PASSWORD];

    const headers = new Headers({
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userName}:${password}`)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, data, headers);
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, ACCOUNT, 'Account', null, true))
    .addField(new Field(FieldType.TEXT, USER, 'Username', null, true))
    .addField(new Field(FieldType.PASSWORD, PASSWORD, 'API key', true));
}
