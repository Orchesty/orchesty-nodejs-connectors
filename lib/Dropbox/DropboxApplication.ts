import { BodyInit } from 'node-fetch';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export default class DropboxApplication extends AOAuth2Application {
  public getAuthUrl = (): string => 'https://www.dropbox.com/oauth2/authorize';

  public getTokenUrl = (): string => 'https://api.dropboxapi.com/oauth2/token';

  public getName = (): string => 'dropbox';

  public getPublicName = (): string => 'Dropbox';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Dropbox lets you store your files online, sync them to all your devices, and share them easily. Get started for free, then upgrade for more space and security features.';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxMzkuN3B4IiB2aWV3Qm94PSIwIDAgMTUwIDEzOS43IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNTAgMTM5Ljc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMDA2MkZGO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTM3LjUsNkwwLDMwLjFsMzcuNSwyMy43TDc1LDMwLjFMMzcuNSw2eiBNMTEyLjUsNkw3NSwzMC4xbDM3LjUsMjMuN0wxNTAsMzAuMUwxMTIuNSw2eiBNMCw3Ny44bDM3LjUsMjQuMQoJTDc1LDc3LjhMMzcuNSw1My44TDAsNzcuOHogTTExMi41LDUzLjhMNzUsNzcuOGwzNy41LDI0LjFMMTUwLDc3LjhMMTEyLjUsNTMuOHogTTM3LjUsMTA5LjdMNzUsMTMzLjdsMzcuNS0yNC4xTDc1LDg2TDM3LjUsMTA5Ljd6IgoJLz4KPC9zdmc+Cg==';

  public getRequestDto = (
    _dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
    }

    const token = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN];
    return new RequestDto(
      url ?? '',
      method,
      _dto,
      data,
      {
        [CommonHeaders.AUTHORIZATION]: `Bearer ${token.accessToken}`,
      },
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['files.content.write'];

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

    return new FormStack().addForm(form);
  };
}
