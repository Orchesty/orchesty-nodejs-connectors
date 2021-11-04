import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { TOKEN } from 'pipes-nodejs-sdk/lib/Authorization/Type/Basic/ABasicApplication';
import { AUTHORIZATION_SETTINGS, FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';

export const BASE_URL = 'https://api.airtable.com/v0';
export const BASE_ID = 'base_id';
export const TABLE_NAME = 'table_name';

export default class AirtableApplication extends ABasicApplication {
  public getDescription = (): string => 'Airtable v1';

  public getName = (): string => 'airtable';

  public getPublicName = (): string => 'Airtable';

  public getSettingsForm = (): Form => {
    const form = new Form();
    form.addField(new Field(FieldType.TEXT, TOKEN, 'API Key', undefined, true));
    form.addField(new Field(FieldType.TEXT, BASE_ID, 'Base id', undefined, true));
    form.addField(new Field(FieldType.TEXT, TABLE_NAME, 'Table name', undefined, true));

    return form;
  };

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> {
    const headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this._getAccessToken(applicationInstall)}`,
    };
    return new RequestDto(url ?? '', method, data, headers);
  }

  public getValue = (applicationInstall: ApplicationInstall, value: string): string | undefined => {
    if (applicationInstall.getSettings()[FORM][value]) {
      return applicationInstall.getSettings()[FORM][value];
    }

    return undefined;
  };

  private _getAccessToken = (applicationInstall: ApplicationInstall): string => {
    if (applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][TOKEN]) {
      return applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][TOKEN];
    }

    throw new Error('There is no access token');
  };
}
