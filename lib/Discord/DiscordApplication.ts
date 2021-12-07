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
import { CLIENT_ID } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';

const BASE_URL = 'https://discord.com/';

export default class DiscordApplication extends ABasicApplication {
  public getName = (): string => 'discord';

  public getPublicName = (): string => 'Discord';

  public getDescription = (): string => 'An all-in-one voice & text chat for gamers';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMl8pO30KCS5zdDF7ZmlsbDojNTg2NUYyO30KPC9zdHlsZT4KPGc+Cgk8ZGVmcz4KCQk8cmVjdCBpZD0iU1ZHSURfMV8iIHg9IjAuMiIgeT0iMTciIHdpZHRoPSIxNDkuNyIgaGVpZ2h0PSIxMTYiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MCI+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEyNi45LDI3LjNjLTkuNS00LjQtMTkuOC03LjYtMzAuNS05LjVjLTAuMiwwLTAuNCwwLjEtMC41LDAuMmMtMS4zLDIuMy0yLjgsNS40LTMuOCw3LjgKCQkJYy0xMS41LTEuNy0yMy0xLjctMzQuMiwwYy0xLTIuNS0yLjUtNS41LTMuOS03LjhjLTAuMS0wLjItMC4zLTAuMy0wLjUtMC4yYy0xMC43LDEuOC0yMC45LDUuMS0zMC41LDkuNWMtMC4xLDAtMC4yLDAuMS0wLjIsMC4yCgkJCUMzLjUsNTYuNS0xLjgsODQuOCwwLjgsMTEyLjdjMCwwLjEsMC4xLDAuMywwLjIsMC40YzEyLjgsOS40LDI1LjIsMTUuMSwzNy40LDE4LjljMC4yLDAuMSwwLjQsMCwwLjUtMC4yCgkJCWMyLjktMy45LDUuNC04LjEsNy42LTEyLjRjMC4xLTAuMywwLTAuNi0wLjMtMC43Yy00LjEtMS41LTcuOS0zLjQtMTEuNy01LjZjLTAuMy0wLjItMC4zLTAuNiwwLTAuOGMwLjgtMC42LDEuNi0xLjIsMi4zLTEuOAoJCQljMC4xLTAuMSwwLjMtMC4xLDAuNS0wLjFjMjQuNSwxMS4yLDUxLDExLjIsNzUuMiwwYzAuMi0wLjEsMC4zLTAuMSwwLjUsMC4xYzAuNywwLjYsMS41LDEuMiwyLjMsMS44YzAuMywwLjIsMC4zLDAuNiwwLDAuOAoJCQljLTMuNywyLjItNy42LDQtMTEuNyw1LjZjLTAuMywwLjEtMC40LDAuNC0wLjMsMC43YzIuMiw0LjQsNC44LDguNSw3LjYsMTIuNGMwLjEsMC4yLDAuMywwLjIsMC41LDAuMgoJCQljMTIuMi0zLjgsMjQuNi05LjUsMzcuNC0xOC45YzAuMS0wLjEsMC4yLTAuMiwwLjItMC4zYzMuMS0zMi4zLTUuMi02MC4zLTIyLjEtODUuMkMxMjcsMjcuNCwxMjcsMjcuNCwxMjYuOSwyNy4zeiBNNTAuMiw5NS43CgkJCWMtNy40LDAtMTMuNS02LjgtMTMuNS0xNS4xczYtMTUuMSwxMy41LTE1LjFjNy42LDAsMTMuNiw2LjgsMTMuNSwxNS4xQzYzLjYsODguOSw1Ny43LDk1LjcsNTAuMiw5NS43eiBNOTkuOSw5NS43CgkJCWMtNy40LDAtMTMuNS02LjgtMTMuNS0xNS4xczYtMTUuMSwxMy41LTE1LjFjNy42LDAsMTMuNiw2LjgsMTMuNSwxNS4xQzExMy40LDg4LjksMTA3LjUsOTUuNyw5OS45LDk1Ljd6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const token = applicationInstall.getSettings()?.[FORM]?.[TOKEN];
    if (!token) {
      throw new Error(`Application [${this.getPublicName()}] doesn't have token!`);
    }
    return new RequestDto(
      new URL(url ?? BASE_URL, BASE_URL).toString(),
      method,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Bot ${token}`,
      },
    );
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, TOKEN, 'Bot token', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client id', undefined, true));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _customFormReplace = (form: Form, applicationInstall: ApplicationInstall): void => {
    form.fields.forEach((field) => {
      if (field.key === CLIENT_ID && field.value) {
        form.addField(
          new Field(
            FieldType.TEXT,
            'URL',
            'Url to add bot to your server',
            `https://discord.com/api/oauth2/authorize?client_id=${field.value}&permissions=67584&scope=bot`,
          ).setReadOnly(true),
        );
      }
    });
  };
}
