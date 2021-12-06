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
  public getName = (): string => 'google-drive';

  public getPublicName = (): string => 'GoogleDrive';

  public getDescription = (): string => 'GoogleDrive Application';

  public getAuthUrl = (): string => 'https://accounts.google.com/o/oauth2/auth';

  public getTokenUrl = (): string => 'https://oauth2.googleapis.com/token';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzAwNjZEQSIgZD0iTTExLjM0LDEyNC41bDYuNjE1LDExLjgyYzEuMzc1LDIuNDg4LDMuMzUxLDQuNDQzLDUuNjcsNS44NjVsMjMuNjI1LTQyLjMwMkgwDQoJCWMwLDIuNzU1LDAuNjg3LDUuNTEsMi4wNjIsNy45OThMMTEuMzQsMTI0LjV6Ii8+DQoJPHBhdGggZmlsbD0iIzAwQUM0NyIgZD0iTTc1LDUwLjExN0w1MS4zNzUsNy44MTVjLTIuMzIsMS40MjItNC4yOTYsMy4zNzctNS42Nyw1Ljg2NUwyLjA2Miw5MS44ODUNCgkJQzAuNzEzLDk0LjMyLDAuMDAyLDk3LjA3NywwLDk5Ljg4M2g0Ny4yNTFMNzUsNTAuMTE3eiIvPg0KCTxwYXRoIGZpbGw9IiNFQTQzMzUiIGQ9Ik0xMjYuMzc1LDE0Mi4xODVjMi4zMi0xLjQyMiw0LjI5Ni0zLjM3Nyw1LjY3LTUuODY1bDIuNzQ5LTQuODg4bDEzLjE0NC0yMy41NQ0KCQljMS4zNzUtMi40ODgsMi4wNjItNS4yNDMsMi4wNjItNy45OThoLTQ3LjI1NGwxMC4wNTUsMjAuNDRMMTI2LjM3NSwxNDIuMTg1eiIvPg0KCTxwYXRoIGZpbGw9IiMwMDgzMkQiIGQ9Ik03NSw1MC4xMTdMOTguNjI1LDcuODE1Yy0yLjMyLTEuNDIyLTQuOTgzLTIuMTMzLTcuNzMyLTIuMTMzSDU5LjEwN2MtMi43NDksMC01LjQxMiwwLjgtNy43MzIsMi4xMzMNCgkJTDc1LDUwLjExN3oiLz4NCgk8cGF0aCBmaWxsPSIjMjY4NEZDIiBkPSJNMTAyLjc0OSw5OS44ODNINDcuMjUxbC0yMy42MjUsNDIuMzAyYzIuMzIsMS40MjIsNC45ODMsMi4xMzMsNy43MzIsMi4xMzNoODcuMjg1DQoJCWMyLjc0OSwwLDUuNDEyLTAuOCw3LjczMi0yLjEzM0wxMDIuNzQ5LDk5Ljg4M3oiLz4NCgk8cGF0aCBmaWxsPSIjRkZCQTAwIiBkPSJNMTI2LjExNyw1Mi43ODNMMTA0LjI5NiwxMy42OGMtMS4zNzUtMi40ODgtMy4zNTEtNC40NDMtNS42Ny01Ljg2NUw3NSw1MC4xMTdsMjcuNzQ5LDQ5Ljc2N2g0Ny4xNjUNCgkJYzAtMi43NTUtMC42ODctNS41MS0yLjA2Mi03Ljk5OEwxMjYuMTE3LDUyLjc4M3oiLz4NCjwvZz4NCjwvc3ZnPg0K';

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
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['https://www.googleapis.com/auth/drive.file'];
}
