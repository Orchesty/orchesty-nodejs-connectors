import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';

export const BASE_URL = 'https://api.twilio.com/2010-04-01';

export default class TwilioApplication extends ABasicApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Twilio is a cloud communication company that enables users to use standard web languages to build voice, VoIP, and SMS apps via a web API';

  public getName = (): string => 'twilio';

  public getPublicName = (): string => 'Twilio';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const userName = applicationInstall.getSettings()[FORM][USER];
    const password = applicationInstall.getSettings()[FORM][PASSWORD];

    const headers = new Headers({
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userName}:${password}`)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, data, headers);
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, USER, 'ACCOUNT SID', undefined, true))
    .addField(new Field(FieldType.PASSWORD, PASSWORD, 'AUTH TOKEN', undefined, true));
}
