import { BodyInit } from 'node-fetch';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_SETTINGS } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';

const BASE_URL = 'https://app.asana.com';

export default class AsanaApplication extends AOAuth2Application {
  public getAuthUrl = (): string => 'https://app.asana.com/-/oauth_authorize';

  public getTokenUrl = (): string => 'https://app.asana.com/-/oauth_token';

  public getName = (): string => 'asana';

  public getPublicName = (): string => 'Asana';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Asana is a collaborative information manager for workspace. It helps you organize people and tasks effectively.';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJDQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGN4PSItMjM1LjQ5NzYiIGN5PSI0NjcuNzY5MSIgcj0iMC4zNTM4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDI4MC45MjYxIDAgMCAtMjU5LjY2MzYgNjYyMzIuNDIxOSAxMjE1NDQuMDQ2OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQjkwMCIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIwLjYiIHN0eWxlPSJzdG9wLWNvbG9yOiNGOTVEOEYiLz4NCgkJPHN0b3AgIG9mZnNldD0iMC45OTkxIiBzdHlsZT0ic3RvcC1jb2xvcjojRjk1MzUzIi8+DQoJPC9yYWRpYWxHcmFkaWVudD4NCgk8cGF0aCBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIgZD0iTTExNy4zNzksNzkuMDc3Yy0xOC4wMTksMC0zMi42MjQsMTQuNjA1LTMyLjYyNCwzMi42MjFjMCwxOC4wMTgsMTQuNjA1LDMyLjYyNiwzMi42MjQsMzIuNjI2DQoJCWMxOC4wMTYsMCwzMi42MjEtMTQuNjA4LDMyLjYyMS0zMi42MjZDMTUwLDkzLjY4MiwxMzUuMzk1LDc5LjA3NywxMTcuMzc5LDc5LjA3N0wxMTcuMzc5LDc5LjA3N3ogTTMyLjYyMiw3OS4wNzkNCgkJQzE0LjYwNiw3OS4wOCwwLDkzLjY4MiwwLDExMS42OTljMCwxOC4wMTYsMTQuNjA2LDMyLjYyMiwzMi42MjIsMzIuNjIyYzE4LjAxOCwwLDMyLjYyNC0xNC42MDYsMzIuNjI0LTMyLjYyMg0KCQljMC0xOC4wMTgtMTQuNjA2LTMyLjYyMS0zMi42MjYtMzIuNjIxTDMyLjYyMiw3OS4wNzl6IE0xMDcuNjIyLDM4LjI5OWMwLDE4LjAxNi0xNC42MDUsMzIuNjI2LTMyLjYyMSwzMi42MjYNCgkJYy0xOC4wMTksMC0zMi42MjQtMTQuNjA5LTMyLjYyNC0zMi42MjZTNTYuOTgyLDUuNjc3LDc1LjAwMiw1LjY3N2MxOC4wMTYsMCwzMi42MTksMTQuNjA2LDMyLjYxOSwzMi42MjJIMTA3LjYyMnoiLz4NCjwvZz4NCjwvc3ZnPg0K';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
    }

    const token = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[TOKEN];
    return new RequestDto(
      new URL(url ?? '', BASE_URL).toString(),
      method,
      _dto,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Bearer ${token.accessToken}`,
      },
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['default'];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
}
