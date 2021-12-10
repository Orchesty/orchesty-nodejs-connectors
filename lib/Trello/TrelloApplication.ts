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

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Trello is a team collaboration tool that lets you organize anything and everything to keep your projects on task.';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMjMwLjg3NzYiIHkxPSI0NzAuNDAzMSIgeDI9Ii0yMzAuODc3NiIgeTI9IjQ3MC4zOTc1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDI1MDAgMCAwIDI2NDQzLjg0MTggNTc3MjY5IC0xMjQzOTExNikiPg0KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDkxRTYiLz4NCgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA3OUJGIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPHBhdGggZmlsbD0idXJsKCNTVkdJRF8xXykiIGQ9Ik0xNC42NDgsMTUwaDEyMC43MDNjOC4wOSwwLDE0LjY0OC02LjU1OCwxNC42NDgtMTQuNjQ4VjE0LjY0OEMxNTAsNi41NTgsMTQzLjQ0MiwwLDEzNS4zNTIsMEgxNC42NDgNCglDNi41NTgsMCwwLDYuNTU4LDAsMTQuNjQ4djEyMC43MDNDMCwxNDMuNDQyLDYuNTU4LDE1MCwxNC42NDgsMTUweiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTkxLjE4MSwxMzIuOWgzMS42ODhjMy44ODMsMCw3LjAzMS0zLjE0OCw3LjAzMS03LjAzMVY3NC4zMDZjMC0zLjg4My0zLjE0OC03LjAzMS03LjAzMS03LjAzMUg5MS4xODENCgljLTMuODgzLDAtNy4wMzEsMy4xNDgtNy4wMzEsNy4wMzF2NTEuNTYyQzg0LjE1LDEyOS43NTIsODcuMjk4LDEzMi45LDkxLjE4MSwxMzIuOXoiLz4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yNi41MzEsMTMwLjVoMzEuNjg4YzMuODgzLDAsNy4wMzEtMy4xNDgsNy4wMzEtNy4wMzFWMzQuNDA2YzAtMy44ODMtMy4xNDgtNy4wMzEtNy4wMzEtNy4wMzFIMjYuNTMxDQoJYy0zLjg4MywwLTcuMDMxLDMuMTQ4LTcuMDMxLDcuMDMxdjg5LjA2MkMxOS41LDEyNy4zNTIsMjIuNjQ4LDEzMC41LDI2LjUzMSwxMzAuNXoiLz4NCjwvc3ZnPg0K';

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
