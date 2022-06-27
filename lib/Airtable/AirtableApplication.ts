import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { AUTHORIZATION_SETTINGS, FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

export const BASE_URL = 'https://api.airtable.com/v0';
export const BASE_ID = 'base_id';
export const TABLE_NAME = 'table_name';

export default class AirtableApplication extends ABasicApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Airtable is an online platform for creating and sharing relational databases. Fast & flexible way to create tables to keep track of anything, from sales leads to vacation planning to inventory management. ';

  public getName = (): string => 'airtable';

  public getPublicName = (): string => 'Airtable';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaWQ9ImJvZHlfMSIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij4KCjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMCAwKSI+CiAgICA8cGF0aCBkPSJNMjguNTc4IDUuOTA2TDQuNzE3IDE1Ljc4QyAzLjM4OTk5OTkgMTYuMzMgMy40MDQgMTguMjE0IDQuNzM5IDE4Ljc0M0w0LjczOSAxOC43NDNMMjguNjk5IDI4LjI0NDk5OUMgMzAuODA0MjMyIDI5LjA3OTk1NiAzMy4xNDg3NjYgMjkuMDc5OTU2IDM1LjI1Mzk5OCAyOC4yNDQ5OTlMMzUuMjUzOTk4IDI4LjI0NDk5OUw1OS4yMTM5OTcgMTguNzQzQyA2MC41NDg5OTYgMTguMjEzIDYwLjU2Mzk5NSAxNi4zMjkgNTkuMjM1OTk2IDE1Ljc4TDU5LjIzNTk5NiAxNS43OEwzNS4zNzU5OTYgNS45MDY5OTk2QyAzMy4xOTkxOSA1LjAwNjEyOTMgMzAuNzUzODAzIDUuMDA2MTI5MyAyOC41NzY5OTYgNS45MDY5OTk2IiBzdHJva2U9Im5vbmUiIGZpbGw9IiNGRkNDMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgLz4KICAgIDxwYXRoIGQ9Ik0zNC4xMDMgMzMuNDMzTDM0LjEwMyA1Ny4xN0MgMzQuMTAzNjc2IDU3LjY5OTM3IDM0LjM2NjE0MiA1OC4xOTQxNCAzNC44MDQwNjYgNTguNDkxNTZDIDM1LjI0MTk5IDU4Ljc4ODk4IDM1Ljc5ODY3IDU4Ljg1MDU0NCAzNi4yOTEgNTguNjU2TDM2LjI5MSA1OC42NTZMNjIuOTkxIDQ4LjI5MkMgNjMuNTk5ODcgNDguMDQ5OTg0IDYzLjk5OTY1IDQ3LjQ2MTIwNSA2NCA0Ni44MDZMNjQgNDYuODA2TDY0IDIzLjA3QyA2My45OTkzMiAyMi41NDA2MjggNjMuNzM2ODU1IDIyLjA0NTg1NiA2My4yOTg5MyAyMS43NDg0MzhDIDYyLjg2MTAwOCAyMS40NTEwMTcgNjIuMzA0MzI1IDIxLjM4OTQ1NCA2MS44MTIgMjEuNTg0TDYxLjgxMiAyMS41ODRMMzUuMTEyIDMxLjk0OEMgMzQuNTAzMTMgMzIuMTkwMDE4IDM0LjEwMzM0OCAzMi43Nzg3OTcgMzQuMTAzIDMzLjQzNCIgc3Ryb2tlPSJub25lIiBmaWxsPSIjMzFDMkYyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIC8+CiAgICA8cGF0aCBkPSJNMjcuODcgMzQuNjU4TDE5LjE0MjAwMiAzOC44NzNMMi40MTUwMDI4IDQ2Ljg4OEMgMS4zNTUwMDI5IDQ3LjQgMC4wMDEwMDI3ODg1IDQ2LjYyODAwMiAwLjAwMTAwMjc4ODUgNDUuNDQ4TDAuMDAxMDAyNzg4NSA0NS40NDhMMC4wMDEwMDI3ODg1IDIzLjE3QyAwLjAwMTAwMjc4ODUgMjIuNzQ0IDAuMjE5MDAyNzggMjIuMzc2IDAuNTEzMDAyOCAyMi4xQyAwLjYzMzE3NjU3IDIxLjk4MDI5IDAuNzY5NDk2MSAyMS44Nzc5NjQgMC45MTgwMDI4NCAyMS43OTZDIDEuMzE4MDAyOCAyMS41NTYgMS44ODgwMDI5IDIxLjQ5MTk5OSAyLjM3MzAwMyAyMS42ODRMMi4zNzMwMDMgMjEuNjg0TDI3LjczODAwMyAzMS43MzQwMDFDIDI5LjAzODAwMiAzMi4yNDYwMDIgMjkuMTM4MDAyIDM0LjA1MjAwMiAyNy44NzEwMDIgMzQuNjU5IiBzdHJva2U9Im5vbmUiIGZpbGw9IiNFRDMwNDkiIGZpbGwtcnVsZT0ibm9uemVybyIgLz4KICAgIDxwYXRoIGQ9Ik0yNy44NyAzNC42NThMMTkuOTQ2MDAxIDM4LjQ4NEwwLjUxMiAyMi4wOThDIDAuNjMyMTczOCAyMS45NzgyODcgMC43Njg0OTMzIDIxLjg3NTk2MyAwLjkxNzAwMDA2IDIxLjc5Mzk5OUMgMS4zMTcgMjEuNTUzOTk5IDEuODg3MDAwMSAyMS40ODk5OTggMi4zNzIwMDAyIDIxLjY4MkwyLjM3MjAwMDIgMjEuNjgyTDI3LjczNyAzMS43MzE5OThDIDI5LjAzNjk5OSAzMi4yNDQgMjkuMTM3IDM0LjA1IDI3Ljg2OTk5OSAzNC42NTY5OTgiIHN0cm9rZT0ibm9uZSIgZmlsbD0iI0M2Mjg0MiIgZmlsbC1ydWxlPSJub256ZXJvIiAvPgo8L2c+Cjwvc3ZnPg==';

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
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> {
    const headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this._getAccessToken(applicationInstall)}`,
    };
    return new RequestDto(url ?? '', method, dto, data, headers);
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
