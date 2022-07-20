import { ABasicApplication, PASSWORD } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders, JSON_TYPE, USER } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';
import { createHmac } from 'crypto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const SERVER = 'server';
export const API = 'api_path';
export const NAME = 'alza';

export default class AlzaApplication extends ABasicApplication {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Alza';

  public getDescription = (): string => 'Alza description';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/png;base64,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';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, USER, 'Client', null, true))
      .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Secret', null, true))
      .addField(new Field(FieldType.TEXT, SERVER, 'Server', null, true))
      .addField(new Field(FieldType.TEXT, API, 'Api path', '/rest/api/v1', true));

    return new FormStack().addForm(form);
  };

  public getRequestDto(
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: BodyInit,
  ): RequestDto {
    const headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
    };

    if (!_url) {
      throw new Error('Url must be set.');
    }
    const url = `${this._getBaseUrl(applicationInstall)}/${_url}`;
    const token = this._getToken(method, url, applicationInstall);

    const newUrl = `${url}${url.includes('?') ? '&' : '?'}token=${token}`;

    return new RequestDto(newUrl, method, dto, data, headers);
  }

  private _getBaseUrl = (applicationInstall: ApplicationInstall) => {
    const server = applicationInstall.getSettings()[AUTHORIZATION_FORM][SERVER];
    const apiPath = applicationInstall.getSettings()[AUTHORIZATION_FORM][API];

    return `${server}/${apiPath}`;
  };

  private _getToken = (
    method: HttpMethods,
    url: string,
    applicationInstall: ApplicationInstall,
  ): string => {
    const secret = applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD];
    if (!secret) {
      throw new Error('Invalid secret.');
    }

    const client = applicationInstall.getSettings()[AUTHORIZATION_FORM][USER];
    if (!client) {
      throw new Error('Invalid user.');
    }

    const date = new Date();
    const baseUrl = this._getBaseUrl(applicationInstall);
    return createHmac('sha1', secret, { encoding: 'base64' })
      .update(`${client}+${method}+${API}${url.replace(baseUrl, '')}+${date.toISOString()}`)
      .digest('base64');
  };
}
