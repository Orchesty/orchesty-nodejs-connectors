import { BodyInit } from 'node-fetch';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ABasicApplication, TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';

const BASE_URL = 'https://api.trello.com';
const API_KEY = 'apiKey';

export default class TrelloApplication extends ABasicApplication {
  public getName = (): string => 'trello';

  public getPublicName = (): string => 'Trello';

  public getDescription = (): string => 'Trello Application';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const token = applicationInstall.getSettings()?.[FORM]?.[TOKEN];
    const apiKey = applicationInstall.getSettings()?.[FORM]?.[API_KEY];
    if (!token && !apiKey) {
      throw new Error(`Application [${this.getPublicName()}] doesn't have token, apiKey or both!`);
    }

    const requestUrl = new URL(url ?? '', BASE_URL);
    const query = new URLSearchParams(requestUrl.search);
    query.set('key', apiKey);
    query.set('token', token);
    requestUrl.search = query.toString();

    return new RequestDto(
      requestUrl.toString(),
      method,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      },
    );
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, TOKEN, 'Bot token', undefined, true))
    .addField(new Field(FieldType.TEXT, API_KEY, 'Api key', undefined, true));
}
