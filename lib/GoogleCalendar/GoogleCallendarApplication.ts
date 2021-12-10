import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';

export const BASE_URL = 'https://www.googleapis.com';

export default class GoogleDriveApplication extends AOAuth2Application {
  public getName = (): string => 'google-Calendar';

  public getPublicName = (): string => 'GoogleCalendar';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Google Calendar lets you organize your schedule and share events with co-workers and friends. With Google\'s free online calendar, it\'s easy to keep track of your daily schedule.';

  public getAuthUrl = (): string => 'https://accounts.google.com/o/oauth2/auth';

  public getTokenUrl = (): string => 'https://oauth2.googleapis.com/token';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KCS5zdDF7ZmlsbDojRUE0MzM1O30NCgkuc3Qye2ZpbGw6I0ZCQkMwNDt9DQoJLnN0M3tmaWxsOiMzNEE4NTM7fQ0KCS5zdDR7ZmlsbDojMTg4MDM4O30NCgkuc3Q1e2ZpbGw6IzE5NjdEMjt9DQoJLnN0NntmaWxsOiM0Mjg1RjQ7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTQuNSwzNS41SDM1LjV2NzguOWg3OC45VjM1LjV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTExNC41LDE1MGwzNS41LTM1LjVoLTM1LjVWMTUweiIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNTAsMzUuNWgtMzUuNXY3OC45SDE1MFYzNS41eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMTQuNSwxMTQuNUgzNS41VjE1MGg3OC45VjExNC41eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0wLDExNC41djIzLjdjMCw2LjUsNS4zLDExLjgsMTEuOCwxMS44aDIzLjd2LTM1LjVIMHoiLz4NCgk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMTUwLDM1LjVWMTEuOEMxNTAsNS4zLDE0NC43LDAsMTM4LjIsMGgtMjMuN3YzNS41SDE1MHoiLz4NCgk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNMTE0LjUsMEgxMS44QzUuMywwLDAsNS4zLDAsMTEuOHYxMDIuNmgzNS41VjM1LjVoNzguOVYweiIvPg0KCTxwYXRoIGNsYXNzPSJzdDYiIGQ9Ik01MS43LDk2LjhjLTMtMi01LTQuOS02LjEtOC44bDYuOC0yLjhjMC42LDIuNCwxLjcsNC4yLDMuMyw1LjVjMS41LDEuMywzLjQsMS45LDUuNiwxLjljMi4yLDAsNC4yLTAuNyw1LjgtMg0KCQlzMi40LTMuMSwyLjQtNS4yYzAtMi4yLTAuOC0zLjktMi41LTUuM2MtMS43LTEuNC0zLjgtMi02LjQtMmgtNHYtNi44aDMuNmMyLjIsMCw0LTAuNiw1LjUtMS44YzEuNS0xLjIsMi4yLTIuOCwyLjItNC45DQoJCWMwLTEuOC0wLjctMy4zLTItNC40Yy0xLjMtMS4xLTMtMS42LTUuMS0xLjZjLTIsMC0zLjYsMC41LTQuOCwxLjZjLTEuMiwxLjEtMi4xLDIuNC0yLjYsNGwtNi44LTIuOGMwLjktMi41LDIuNS00LjgsNS02LjcNCgkJczUuNS0yLjksOS4zLTIuOWMyLjgsMCw1LjMsMC41LDcuNSwxLjZjMi4yLDEuMSwzLjksMi42LDUuMiw0LjVjMS4zLDEuOSwxLjksNCwxLjksNi40YzAsMi40LTAuNiw0LjUtMS43LDYuMXMtMi42LDMtNC4zLDMuOXYwLjQNCgkJYzIuMiwwLjksNC4xLDIuNCw1LjUsNC4zYzEuNCwxLjksMi4yLDQuMiwyLjIsNi45cy0wLjcsNS4xLTIsNy4yYy0xLjQsMi4xLTMuMiwzLjgtNS42LDVjLTIuNCwxLjItNS4xLDEuOC04LjEsMS44DQoJCUM1Ny45LDk5LjgsNTQuNyw5OC44LDUxLjcsOTYuOEw1MS43LDk2Ljh6IE05My44LDYyLjhsLTcuNSw1LjRsLTMuOC01LjdMOTYsNTIuOGg1LjJ2NDUuOWgtNy40VjYyLjh6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> {
    const headers = new Headers({
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    });
    return new RequestDto(url ?? BASE_URL, method, data, headers);
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['https://www.googleapis.com/auth/calendar'];
}
