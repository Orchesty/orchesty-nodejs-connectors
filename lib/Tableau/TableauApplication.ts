import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { TOKEN } from 'pipes-nodejs-sdk/lib/Authorization/Type/Basic/ABasicApplication';
import CurlSender from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import MongoDbClient from 'pipes-nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import { AUTHORIZATION_SETTINGS, FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { EXPIRES } from 'pipes-nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';

const BASE_URL = 'https://replace_me.online.tableau.com/api/3.14/';
const PREFIX_SITE = 'prefix_site';
const TOKEN_NAME = 'token_name';
const SITE = 'site';
const MAX_EXPIRE = 14;
const X_TABLEAU_AUTH = 'X-Tableau-Auth';

export default class TableauApplication extends ABasicApplication {
  constructor(private _sender: CurlSender, private _dbClient: MongoDbClient) {
    super();
  }

  public getName = (): string => 'tableau';

  public getPublicName = (): string => 'Tableau';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Tableau helps global organizations unleash the power of their most valuable assets: their data and their people.';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRTg3NjJEO30KCS5zdDF7ZmlsbDojQzcyMDM3O30KCS5zdDJ7ZmlsbDojNUI4NzlCO30KCS5zdDN7ZmlsbDojNUM2NjkyO30KCS5zdDR7ZmlsbDojRUI5MTI5O30KCS5zdDV7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMUY0NTdFO30KCS5zdDZ7ZmlsbDojNzE5OUE2O30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzAuOSwxMDAuN2g4LjFWNzguNmgyMC40di03LjlINzkuMVY0OC41aC04LjF2MjIuMkg1MC43djcuOWgyMC4yVjEwMC43eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMzLjIsMTMyLjhoNi45di0xOS43aDE4LjJ2LTYuMkg0MC4xdi0yMGgtNi45djIwSDE1djYuMmgxOC4yVjEzMi44eiIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwOS45LDYxLjZoNi45VjQxLjloMTguNVYzNmgtMTguNVYxNmgtNi45djIwSDkxLjZ2NS45aDE4LjJWNjEuNnoiLz4KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik03Mi4yLDE0OC4zaDUuOXYtMTRoMTIuNnYtNS4ySDc4LjF2LTE0aC01Ljl2MTRINTkuOHY1LjJoMTIuM1YxNDguM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zMy41LDYxLjZoNi40di0yMGgxOC41VjM2SDM5LjlWMTZoLTYuNHYyMEgxNXY1LjdoMTguNVY2MS42eiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTEzMC44LDkxLjFoNS45Vjc3LjNoMTIuNnYtNS40aC0xMi42VjU4LjFoLTUuOXYxMy44aC0xMi4zdjUuNGgxMi4zVjkxLjF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMTA5LjksMTMyLjhoNi45di0xOS43aDE4LjV2LTYuMmgtMTguNXYtMjBoLTYuOXYyMEg5MS42djYuMmgxOC4yVjEzMi44eiIvPgoJPHBhdGggY2xhc3M9InN0NiIgZD0iTTg5LjcsMTkuNHYtNC4ySDc3LjNWMS43aC00LjR2MTMuNkg2MC42djQuMmgxMi4zVjMzaDQuNFYxOS40SDg5Ljd6IE0xMyw5MC4yaDQuNFY3Ni42aDEyLjN2LTQuMkgxNy41VjU5LjEKCQlIMTN2MTMuM0gwLjd2NC40TDEzLDc2LjZWOTAuMnoiLz4KPC9nPgo8L3N2Zz4K';

  public async getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): Promise<RequestDto> {
    const token = await this._getOrRefreshToken(applicationInstall);

    const headers = new Headers({
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [X_TABLEAU_AUTH]: token,
    });
    return new RequestDto(url ?? BASE_URL, method, data, headers);
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, SITE, 'Site', null, true))
    .addField(new Field(
      FieldType.TEXT,
      PREFIX_SITE,
      'Prefix site (https://[this value].online.tableau.com/)',
      null,
      true,
    ))
    .addField(new Field(FieldType.TEXT, TOKEN, 'Token', null, true))
    .addField(new Field(FieldType.TEXT, TOKEN_NAME, 'Token name', null, true));

  private _getUrl = (applicationInstall: ApplicationInstall): string => {
    const prefix = applicationInstall.getSettings()[FORM][PREFIX_SITE];
    if (prefix) {
      return BASE_URL.replace('replace_me', prefix);
    }
    throw new Error('Missing site prefix');
  };

  private async _getOrRefreshToken(_applicationInstall: ApplicationInstall): Promise<string> {
    let applicationInstall = _applicationInstall;
    const expires = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[EXPIRES];
    if (!expires || expires > new Date()) {
      applicationInstall = await this._setToken(applicationInstall);
      await (await this._dbClient.getApplicationRepository()).insert(applicationInstall);
    }

    return applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[TOKEN];
  }

  private async _setToken(applicationInstall: ApplicationInstall): Promise<ApplicationInstall> {
    const token = await this._getToken(applicationInstall);
    const date = new Date();
    date.setDate(date.getDate() + MAX_EXPIRE);
    applicationInstall.setExpires(date);
    applicationInstall.addSettings({ [AUTHORIZATION_SETTINGS]: { [TOKEN]: token } });

    return applicationInstall;
  }

  private async _getToken(applicationInstall: ApplicationInstall): Promise<string> {
    const headers = new Headers({
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
    });
    const form = applicationInstall.getSettings()?.[FORM];
    checkParams(form, [TOKEN_NAME, TOKEN, SITE]);
    const data = {
      credentials: {
        personalAccessTokenName: form[TOKEN_NAME],
        personalAccessTokenSecret: form[TOKEN],
        site: {
          contentUrl: form[SITE],
        },
      },
    };

    const request = new RequestDto(
      `${this._getUrl(applicationInstall)}auth/signin`,
      HttpMethods.POST,
      JSON.stringify(data),
      headers,
    );

    const resp = await this._sender.send(request, [200]);
    const token = (resp.jsonBody as { credentials: { token: string }})?.credentials?.token;
    if (!token) {
      throw new Error(`Token was not received. Response body: [${resp.jsonBody}]`);
    }
    return token;
  }
}