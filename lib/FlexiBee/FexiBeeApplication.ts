import {
  ABasicApplication,
  PASSWORD,
  USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const CANNOT_GET_BODY = 'Cannot get body from response.';
export const TOKEN_NOT_SUCCESS = 'Token is not succeed returned';

export const FLEXIBEE_URL = 'flexibeeUrl';

const CLIENT_SETTINGS = 'client_settings';
const AUTH_SESSION_ID = 'authSessionId';
const REFRESH_TOKEN = 'refreshToken';
const CSRF_TOKEN = 'csrfToken';
const TOKEN_GET = 'token_get';

const AUTH = 'auth';
const AUTH_JSON = 'json';
const AUTH_HTTP = 'http';

const X_AUTH_SESSION_ID = 'X-authSessionId';

const TOKEN_MAX_LIFE = 60 * 30; // 30 min

const ENDPOINT_LOGIN = 'login-logout/login.json';

interface IToken {
  success: boolean,
  [AUTH_SESSION_ID]: string,
  [REFRESH_TOKEN]: string,
  [CSRF_TOKEN]: string,
  [TOKEN_GET]: number
}

export default class FlexiBeeApplication extends ABasicApplication {
  constructor(private _sender: CurlSender, private _dbClient: MongoDbClient) {
    super();
  }

  public getName = (): string => 'flexibee';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'FlexiBee is a modern economic system designed for small companies. It covers tax records, homebanking, pricing, accounts receivable/payable and has many other other options.';

  public getPublicName = (): string => 'FlexiBee';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iVnJzdHZhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNDI1LjE5N3B4IiBoZWlnaHQ9IjQyNS4xOTdweCIgdmlld0JveD0iMCAwIDQyNS4xOTcgNDI1LjE5NyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDI1LjE5NyA0MjUuMTk3Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwb2x5Z29uIGZpbGw9IiNGREI5MzQiIHBvaW50cz0iMjc1Ljk2NCwzMzEuMjExIDM0My41OTgsMjE0LjExNSA0MTEuMTk3LDMzMS4yMTEgCSIvPg0KCTxwb2x5Z29uIGZpbGw9IiNEOTk1MjgiIHBvaW50cz0iMjc1Ljk2NCwzMzEuMjExIDIwOC4zNDUsMjE0LjExNSAzNDMuNTk4LDIxNC4xMTUgCSIvPg0KCTxwb2x5Z29uIGZpbGw9IiNBMTZGMkEiIHBvaW50cz0iMjA4LjM0NSwyMTQuMTE1IDI3NS45NjQsOTYuOTg2IDM0My41OTgsMjE0LjExNSAJIi8+DQoJPHBvbHlnb24gZmlsbD0iIzg3ODc4NyIgcG9pbnRzPSIyNzUuOTY0LDk2Ljk4NiAxNDAuNzQxLDk2Ljk4NiA1LjQ3MywzMzEuMjExIDE0MC43NDEsMzMxLjIxMSAJIi8+DQo8L2c+DQo8L3N2Zz4NCg==';

  public async getRequestDto(
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): Promise<RequestDto> {
    let headers = new Headers();
    if (applicationInstall.getSettings()[AUTHORIZATION_FORM][AUTH] === AUTH_JSON) {
      headers = new Headers({
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.ACCEPT]: JSON_TYPE,
        [X_AUTH_SESSION_ID]: await this._getApiToken(applicationInstall, dto),
      });
    } else if (applicationInstall.getSettings()[AUTHORIZATION_FORM][AUTH] === AUTH_HTTP) {
      headers = new Headers({
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.ACCEPT]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Basic 
        ${encode(`${applicationInstall.getSettings()[AUTHORIZATION_FORM][USER]}:
        ${applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD]}`)}`,
      });
    }

    return new RequestDto(url ?? '', method, dto, data, headers);
  }

  public getFormStack = (): FormStack => {
    const authTypeField = new Field(FieldType.SELECT_BOX, AUTH, 'Authorize type', null, true);
    authTypeField.setChoices([AUTH_HTTP, AUTH_JSON]);

    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', null, true))
      .addField(new Field(FieldType.URL, FLEXIBEE_URL, 'Flexibee URL', null, true))
      .addField(authTypeField);

    return new FormStack().addForm(form);
  };

  public getUrl(applicationInstall: ApplicationInstall, url?: string): string {
    const host = applicationInstall.getSettings()[AUTHORIZATION_FORM][FLEXIBEE_URL] ?? '';

    if (host) {
      throw Error('There is no flexibee url');
    }

    return `${host}/${this.getUri(url)}`;
  }

  private async _getApiToken(applicationInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
    let token = await this._getApiTokenFromSettings(applicationInstall);

    if (!token) {
      const res = await this._sender.send(this._getApiTokenDto(applicationInstall, dto), [200]);

      try {
        token = res.jsonBody as IToken;
      } catch (Throwable) {
        throw Error(CANNOT_GET_BODY);
      }

      if (!token.success) {
        throw Error(TOKEN_NOT_SUCCESS);
      }

      applicationInstall.addSettings(
        {
          [CLIENT_SETTINGS]: {
            [AUTH_SESSION_ID]: token[AUTH_SESSION_ID],
            [REFRESH_TOKEN]: token[REFRESH_TOKEN],
            [CSRF_TOKEN]: token[CSRF_TOKEN],
            [TOKEN_GET]: DateTimeUtils.getTimestamp(DateTimeUtils.utcDate),
          },
        },
      );
      const repository = await this._dbClient.getApplicationRepository();
      await repository.insert(applicationInstall);
    }

    return token[AUTH_SESSION_ID];
  }

  private async _getApiTokenFromSettings(
    applicationInstall: ApplicationInstall,
  ): Promise<IToken | null> {
    const repository = await this._dbClient.getApplicationRepository();
    await repository.findById(applicationInstall.getObjectId());
    const token = applicationInstall.getSettings()[CLIENT_SETTINGS] ?? [];

    const date = DateTimeUtils.utcDate;
    const valid = date.setMinutes(date.getMinutes() - TOKEN_MAX_LIFE);

    if (token[AUTH_SESSION_ID] !== undefined && token[TOKEN_GET] !== undefined && token[TOKEN_GET] > valid) {
      return token;
    }
    return null;
  }

  private _getApiTokenDto(applicationInstall: ApplicationInstall, dto: AProcessDto): RequestDto {
    const setting = applicationInstall.getSettings();
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error('User is not authenticated');
    }

    const user = setting[AUTHORIZATION_FORM][USER];
    const password = setting[AUTHORIZATION_FORM][PASSWORD];

    const headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
    };

    return new RequestDto(
      this.getUrl(applicationInstall, ENDPOINT_LOGIN)
        .toString(),
      HttpMethods.POST,
      dto,
      JSON.stringify({
        [USER]: user,
        [PASSWORD]: password,
      }),
      headers,
    );
  }
}
