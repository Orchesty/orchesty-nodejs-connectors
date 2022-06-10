import { BodyInit } from 'node-fetch';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_SETTINGS, FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';

const PREFIX_URL = 'prefix_url';

export default class JiraApplication extends ABasicApplication {
  public getName = (): string => 'jira';

  public getPublicName = (): string => 'Jira';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Jira Software is a bug and issue tracking tool that allows software developers to manage product development and build better software. This integration connects to cloud-hosted instances of Jira.';

  public getBaseUrl = (
    applicationInstall: ApplicationInstall,
  ): string => {
    const prefix = applicationInstall.getSettings()?.[FORM]?.[PREFIX_URL];
    if (!prefix) {
      throw new Error(`Application [${this.getPublicName()}] doesn't have url prefix!`);
    }
    return `https://${prefix}.atlassian.net`;
  };

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDp1cmwoI1NWR0lEXzFfKTt9Cgkuc3Qxe2ZpbGw6dXJsKCNTVkdJRF8yXyk7fQo8L3N0eWxlPgo8Zz4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNjIuODcwNCIgeTE9IjQwLjIxMTIiIHgyPSI3NC41MDQ5IiB5Mj0iMTAwLjE2NzMiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAxNTEuOTIpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwLjE1IiBzdHlsZT0ic3RvcC1jb2xvcjojMDA1MkNDIi8+CgkJPHN0b3AgIG9mZnNldD0iMC41IiBzdHlsZT0ic3RvcC1jb2xvcjojMEU2NERFIi8+CgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzI2ODRGRiIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wLDBjMC4xLDI4LjMsMjMsNTEuMSw1MS4yLDUxLjFoNDcuNnY0Ny42aDUxLjFWOC4yYzAtNC41LTMuNi04LjEtOC4xLTguMkgweiIvPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMTQwNy43ODY3IiB5MT0iNzQ4LjQyNDkiIHgyPSItMTM5Ni4xMjQ4IiB5Mj0iODA4LjQwODQiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgLTEzMjAuNyAtNzEwLjIzKSI+CgkJPHN0b3AgIG9mZnNldD0iMC4xNSIgc3R5bGU9InN0b3AtY29sb3I6IzAwNTJDQyIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNSIgc3R5bGU9InN0b3AtY29sb3I6IzBFNjRERSIvPgoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNjg0RkYiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTQ5LjksMTQ5LjljMC0yOC4yLTIyLjktNTEuMS01MS4xLTUxLjJINTEuMlY1MS4xSDB2OTAuN2MwLDQuNSwzLjcsOC4yLDguMiw4LjJsMCwwTDE0OS45LDE0OS45eiIvPgo8L2c+Cjwvc3ZnPgo=';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const password = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[PASSWORD];
    const user = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[USER];

    if (!password || !user) {
      throw new Error(`Application [${this.getPublicName()}] doesn't have user name, password or both!`);
    }
    return new RequestDto(
      new URL(url ?? '', this.getBaseUrl(applicationInstall)).toString(),
      method,
      _dto,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${user}:${password}`)}`,
      },
    );
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, PREFIX_URL, 'Attlasian prefix url', undefined, true))
    .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
    .addField(new Field(FieldType.TEXT, PASSWORD, 'Token', undefined, true));
}
