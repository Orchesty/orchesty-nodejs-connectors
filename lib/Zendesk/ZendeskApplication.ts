import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ScopeSeparatorEnum from 'pipes-nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const SUBDOMAIN = 'subdomain';

export default class ZendeskApplication extends AOAuth2Application {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Zendesk is a customer support software. It helps companies and organisations manage customer queries and problems through a ticketing system.';

  public getName = (): string => 'zendesk';

  public getPublicName = (): string => 'Zendesk';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzAzMzYzRCIgZD0iTTcxLjc3OSwzOC4xNnY0Ni42MjdIMzMuMTY0TDcxLjc3OSwzOC4xNnogTTcxLjc3OSwyMS40MzRjMCwxMC42NTUtOC42MzIsMTkuMjg3LTE5LjI4NywxOS4yODcNCglzLTE5LjMyOC04LjYzMi0xOS4zMjgtMTkuMjg3SDcxLjc3OXogTTc4LjEzOSw4NC43ODdjMC0xMC42NTUsOC42MzItMTkuMjg3LDE5LjI4Ny0xOS4yODdzMTkuMjg3LDguNjMyLDE5LjI4NywxOS4yODdINzguMTM5DQoJTDc4LjEzOSw4NC43ODd6IE03OC4xMzksNjguMDYxVjIxLjQzNGgzOC42MTVMNzguMTM5LDY4LjA2MXogTTk5LjczOCwxMjQuNjQyYzEuOTgyLDAuMDQxLDMuOTIzLTAuNzAyLDUuMzY5LTIuMDY1bDIuNjQzLDIuODUNCgljLTEuNzM1LDEuODE3LTQuMTcxLDMuMTM5LTcuOTcxLDMuMTM5Yy02LjQ4NCwwLTEwLjY1NS00LjI5NS0xMC42NTUtMTAuMTE4Yy0wLjEyNC01LjQ5Myw0LjI1NC05Ljk5NCw5LjcwNS0xMC4xMThoMC4zMw0KCWM2LjQ0MywwLDEwLjA3Nyw0Ljg3Myw5Ljc0NywxMS42ODhIOTMuNzVDOTQuMjg3LDEyMi44NjYsOTYuMjY5LDEyNC42ODMsOTkuNzM4LDEyNC42NDIgTTEwNC4zNjQsMTE2LjgzNg0KCWMtMC40MTMtMi42NDMtMS45ODItNC41ODQtNS4xMjEtNC41ODRjLTIuOTMyLDAtNC45NTYsMS42NTItNS40OTMsNC41ODRIMTA0LjM2NHogTTAsMTI0LjQzNWwxMS42ODgtMTEuODk0SDAuMjg5di0zLjcxN2gxNi44MDkNCgl2My44TDUuNDEsMTI0LjUxOGgxMS44NTN2My43MTdIMFYxMjQuNDM1eiBNMzAuMzk2LDEyNC42NDJjMS45ODIsMC4wNDEsMy45MjMtMC43MDIsNS4zMjgtMi4wNjVsMi42NDMsMi44NQ0KCWMtMS43MzUsMS44MTctNC4xNzEsMy4xMzktNy45NzEsMy4xMzljLTYuNDg0LDAtMTAuNjU1LTQuMjk1LTEwLjY1NS0xMC4xMThjLTAuMTI0LTUuNDkzLDQuMjU0LTkuOTk0LDkuNzA1LTEwLjExOGgwLjMzDQoJYzYuNDQzLDAsMTAuMDc3LDQuODczLDkuNzQ3LDExLjY4OEgyNC40MDhDMjQuOTQ1LDEyMi44NjYsMjYuOTI3LDEyNC42ODMsMzAuMzk2LDEyNC42NDIgTTM1LjAyMiwxMTYuODM2DQoJYy0wLjQxMy0yLjY0My0xLjk4Mi00LjU4NC01LjEyMS00LjU4NGMtMi45MzIsMC00Ljk1NiwxLjY1Mi01LjQ5Myw0LjU4NEgzNS4wMjJ6IE02NC44NCwxMTguNDg4YzAtNi4xOTUsNC42MjYtMTAuMDc3LDkuNzQ3LTEwLjA3Nw0KCWMyLjQ3OC0wLjA0MSw0LjgzMiwxLjAzMiw2LjQ4NCwyLjg5MXYtMTEuNDRoNC4xM3YyOC4zMzFoLTQuMTN2LTIuNjg0Yy0xLjYxMSwxLjk0MS00LjAwNiwzLjA5Ny02LjUyNSwzLjA1Ng0KCUM2OS41OSwxMjguNTY1LDY0Ljg0LDEyNC42NDIsNjQuODQsMTE4LjQ4OCBNODEuMjc4LDExOC40NDdjLTAuMDgzLTMuMzg3LTIuOTMyLTYuMDcxLTYuMzE5LTUuOTg4DQoJYy0zLjM4NywwLjA4My02LjA3MSwyLjkzMi01Ljk4OCw2LjMxOWMwLjA4MywzLjM0NSwyLjgwOCw1Ljk4OCw2LjE1NCw1Ljk4OEM3OC42NzYsMTI0Ljc2NSw4MS4yNzgsMTIxLjk1Nyw4MS4yNzgsMTE4LjQ0Nw0KCSBNMTExLjYzMywxMjQuMDYzbDMuNzU4LTEuOTQxYzAuOTkxLDEuODE3LDIuOTMyLDIuODkxLDQuOTk3LDIuODVjMi4zNTQsMCwzLjU1Mi0xLjE5OCwzLjU1Mi0yLjU2MWMwLTEuNTY5LTIuMjcxLTEuOS00LjcwOC0yLjM5NQ0KCWMtMy4zMDQtMC43MDItNi43MzItMS43NzYtNi43MzItNS43ODJjMC0zLjA1NiwyLjkzMi01LjkwNiw3LjUxNy01Ljg2NWMzLjYzNCwwLDYuMzE5LDEuNDQ1LDcuODQ3LDMuNzU4bC0zLjQ2OSwxLjkNCgljLTAuOTkxLTEuNDQ1LTIuNjQzLTIuMjcxLTQuMzc4LTIuMjNjLTIuMjMsMC0zLjM0NSwxLjA3NC0zLjM0NSwyLjMxM2MwLDEuNDA0LDEuNzc2LDEuNzc2LDQuNTg0LDIuMzk1DQoJYzMuMTgsMC43MDIsNi44MTQsMS43MzUsNi44MTQsNS43ODJjMCwyLjY4NC0yLjM1NCw2LjI3OC03Ljg4OCw2LjIzNkMxMTYuMTM0LDEyOC41NjUsMTEzLjI4NSwxMjYuOTU0LDExMS42MzMsMTI0LjA2Mw0KCSBNMTM5LjI2MiwxMTkuNTYybC0zLjI2MywzLjU5M3Y1LjAzOWgtNC4xM1Y5OS44NjJoNC4xM3YxOC41NDRsOC43NTYtOS42MjNoNS4wMzlsLTcuNTk5LDguMzAxbDcuODA2LDExLjExaC00LjY2N0wxMzkuMjYyLDExOS41NjINCgl6IE01Mi4zNjgsMTA4LjM3Yy00LjkxNSwwLTkuMDQ1LDMuMTgtOS4wNDUsOC40NjZ2MTEuMzU3aDQuMjEzdi0xMC44MmMwLTMuMTgsMS44MTctNS4wOCw0Ljk1Ni01LjA4YzMuMTM5LDAsNC42NjcsMS45LDQuNjY3LDUuMDgNCgl2MTAuODJoNC4xNzF2LTExLjM1N0M2MS4zNzEsMTExLjU1LDU3LjI0MSwxMDguMzcsNTIuMzY4LDEwOC4zNyIvPg0KPC9zdmc+DQo=';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const request = new RequestDto(this.getUri(url)
      .toString(), method);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    };

    if (data) {
      request.body = data;
    }

    return request;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['read', 'write'];

  public getSettingsForm = (): Form => (new Form())
    .addField((new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true)))
    .addField((new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)));

  public getAuthUrlWithSubdomain = (applicationInstall: ApplicationInstall): string => `https://${applicationInstall.getSettings()[FORM][SUBDOMAIN]}.zendesk.com/oauth/authorizations/new`;

  public getAuthUrl(): string {
    throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getAuthUrlWithSubdomain.name}] instead.`);
  }

  public getTokenUrlWithSubdomain = (applicationInstall: ApplicationInstall): string => `https://${applicationInstall.getSettings()[FORM][SUBDOMAIN]}.zendesk.com/oauth/tokens`;

  public getTokenUrl(): string {
    throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getTokenUrlWithSubdomain.name}] instead.`);
  }

  protected _getScopesSeparator = (): string => ScopeSeparatorEnum.SPACE;
}
