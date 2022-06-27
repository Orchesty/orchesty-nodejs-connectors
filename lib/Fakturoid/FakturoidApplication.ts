import {
  ABasicApplication,
  PASSWORD,
  USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_SETTINGS } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { BodyInit, Headers } from 'node-fetch';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const BASE_URL = 'https://app.fakturoid.cz/api/v2';
export const BASE_ACCOUNTS = 'accounts';
export const ACCOUNT = 'account';

export default class FakturoidApplication extends ABasicApplication {
  public getName = (): string => 'fakturoid';

  public getPublicName = (): string => 'Fakturoid';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Fakturoid is an online invoicing service for freelancers and small businesses. It simplifies the invoicing process and gives users the option to choose from several invoice designs. ';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iVnJzdHZhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTUwcHgiIGhlaWdodD0iMTUwcHgiIHZpZXdCb3g9IjAgMCAxNTAgMTUwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxNTAgMTUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMUExOTE5IiBkPSJNODcuNjcyLDk3LjMyOGMwLDUuMjQ5LDQuMzUyLDguMzc0LDExLjkwNCw4LjM3NA0KCQljNy40MjcsMCwxMS4wMTItMy41LDExLjAxMi0xMC4zNzVWODguODNoLTYuMTQ0QzkxLjM4MSw4OC44Myw4Ny42NzIsOTEuODI3LDg3LjY3Miw5Ny4zMjgiLz4NCgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzFBMTkxOSIgZD0iTTc1LjAwNCwzLjc1QzMzLjU4MywzLjc1LDAsMjkuODEzLDAsNjEuOTY0djI2LjA2Nw0KCQljMCwzMi4xNTEsMzMuNTgzLDU4LjIxOCw3NS4wMDQsNTguMjE4YzQxLjQyLDAsNzQuOTk2LTI2LjA2Nyw3NC45OTYtNTguMjE4VjYxLjk2NEMxNTAsMjkuODEzLDExNi40MjUsMy43NSw3NS4wMDQsMy43NQ0KCQlMNzUuMDA0LDMuNzV6IE01MC42NTgsODkuOTk1aC03LjQyN1YxMTguMkgzNi4zMmMtNS41MDgsMC0xMC4zNzMtNC4xMjQtMTAuMzczLTEwLjAwMXYtNDQuNTVjMC0xMy43NTEsNi41MzItMzAuOTcxLDI2LjE1My0zNS4yMzYNCgkJYzE5Ljg2MS00LjMxNywyNS40MTYsNS4xODQsMjUuNDE2LDUuMTg0cy0xMi40MjctMC4xNjYtMjIuMTY0LDcuMjY1Yy01LjU0NCw0LjIzLTExLjkyNywxMy41NTctMTIuMTIxLDI0LjE2NHYxMy4xMDMNCgkJYzEyLjI2MSwyLjI5NywyMi4wNzUtMS42ODgsMjQuOTcxLTIuOTQ3bDAuNDk3LTAuMDYxQzY4LjY5OCw3NS4xMjEsNjcuODE5LDg5Ljk5NSw1MC42NTgsODkuOTk1TDUwLjY1OCw4OS45OTV6IE0xMjcuMzYsOTUuMjAyDQoJCWMwLDE0LjI1LTEwLjc1MiwyNC4xMjItMjYuMTE3LDI0LjEyMmgtMy40NThjLTE2LjM4OCwwLTI3LjY1Ny04Ljk5Ny0yNy42NTctMjEuMzcxYzAtMTEuOTk4LDguOTYzLTIxLjEyMiwzNC4zMTYtMjEuMTIyaDYuMDE2DQoJCXYtMC44NzhjMC05LjQ5OC00LjYwOC0xNi4yNDgtMTQuODUzLTE2LjI0OGMtMTIuNDE5LDAtMTkuMzMsNC42MjQtMjEuODkzLDcuNzVoLTAuNjM5di01LjM3NGMwLTcuNSw2LjkxNS0xNi40OTcsMjUuMDk0LTE2LjQ5Nw0KCQljMTUuMzY1LDAsMjkuMTkyLDEwLjg3NCwyOS4xOTIsMzQuMTE5Vjk1LjIwMkwxMjcuMzYsOTUuMjAyeiIvPg0KPC9nPg0KPC9zdmc+DQo=';

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

    return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, ACCOUNT, 'Account', null, true))
    .addField(new Field(FieldType.TEXT, USER, 'Username', null, true))
    .addField(new Field(FieldType.TEXT, PASSWORD, 'API key', true));
}
