import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_SETTINGS, FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import DateTimeUtils from 'pipes-nodejs-sdk/dist/lib/Utils/DateTimeUtils';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import CurlSender from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import MongoDbClient from 'pipes-nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import { Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';

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

  public getDescription = (): string => 'FlexiBee Application';

  public getPublicName = (): string => 'FlexiBee';

  public async getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): Promise<RequestDto> {
    let headers = new Headers();
    if (applicationInstall.getSettings()[FORM][AUTH] === AUTH_JSON) {
      headers = new Headers({
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.ACCEPT]: JSON_TYPE,
        [X_AUTH_SESSION_ID]: await this._getApiToken(applicationInstall),
      });
    } else if (applicationInstall.getSettings()[FORM][AUTH] === AUTH_HTTP) {
      headers = new Headers({
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.ACCEPT]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Basic 
        ${encode(`${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER]}:
        ${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][PASSWORD]}`)}`,
      });
    }

    return new RequestDto(url ?? '', method, data, headers);
  }

  public getSettingsForm = (): Form => {
    const authTypeField = new Field(FieldType.SELECT_BOX, AUTH, 'Authorize type', null, true);
    authTypeField.setChoices([AUTH_HTTP, AUTH_JSON]);

    return new Form().addField(new Field(FieldType.TEXT, USER, 'User', null, true))
      .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Password', null, true))
      .addField(new Field(FieldType.URL, FLEXIBEE_URL, 'Flexibee URL', null, true))
      .addField(authTypeField);
  };

  public getUrl(applicationInstall: ApplicationInstall, url?: string): string {
    const host = applicationInstall.getSettings()[FORM][FLEXIBEE_URL] ?? '';

    if (host) {
      throw Error('There is no flexibee url');
    }

    return `${host}/${this.getUri(url)}`;
  }

  private async _getApiToken(applicationInstall: ApplicationInstall): Promise<string> {
    let token = await this._getApiTokenFromSettings(applicationInstall);

    if (!token) {
      const res = await this._sender.send(this._getApiTokenDto(applicationInstall), [200]);

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

  private _getApiTokenDto(applicationInstall: ApplicationInstall): RequestDto {
    const setting = applicationInstall.getSettings();
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error('User is not authenticated');
    }

    const user = setting[AUTHORIZATION_SETTINGS][USER];
    const password = setting[AUTHORIZATION_SETTINGS][PASSWORD];

    const headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
    };

    return new RequestDto(
      this.getUrl(applicationInstall, ENDPOINT_LOGIN)
        .toString(),
      HttpMethods.POST,
      JSON.stringify({
        [USER]: user,
        [PASSWORD]: password,
      }),
      headers,
    );
  }
}
