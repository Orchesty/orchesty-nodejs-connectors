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

const BASE_URL = 'https://api.zoom.us/';

export default class ZoomApplication extends AOAuth2Application {
  public getAuthUrl = (): string => 'https://zoom.us/oauth/authorize';

  public getTokenUrl = (): string => 'https://zoom.us/oauth/token';

  public getName = (): string => 'zoom';

  public getPublicName = (): string => 'Zoom';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Zoom brings teams together to get more done in a frictionless environment. Zoom\'s reliable, video-first unified communications platform provides video meetings, voice, webinars, and chat across desktops, phones, mobile devices, and conference systems';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMl8pO30KCS5zdDF7ZmlsbDojRTVFNUU0O30KCS5zdDJ7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNF8pO30KCS5zdDN7ZmlsbDojRkZGRkZGO30KCS5zdDR7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNl8pO30KCS5zdDV7ZmlsbDojNEE4Q0ZGO30KCS5zdDZ7Y2xpcC1wYXRoOnVybCgjU1ZHSURfOF8pO30KPC9zdHlsZT4KPGc+Cgk8Zz4KCQk8ZGVmcz4KCQkJPGNpcmNsZSBpZD0iU1ZHSURfMV8iIGN4PSI3NSIgY3k9Ijc1IiByPSI3MS41Ii8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+CgkJPGcgY2xhc3M9InN0MCI+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wLDBoMTUwdjE1MEgwVjB6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGRlZnM+CgkJCTxjaXJjbGUgaWQ9IlNWR0lEXzNfIiBjeD0iNzUiIGN5PSI3NSIgcj0iNzAuMSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzRfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfM18iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJCTxnIGNsYXNzPSJzdDIiPgoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMS40LDEuNGgxNDcuMnYxNDcuMkgxLjRWMS40eiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxkZWZzPgoJCQk8Y2lyY2xlIGlkPSJTVkdJRF81XyIgY3g9Ijc1IiBjeT0iNzUiIHI9IjY0LjUiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF82XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzVfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCQk8ZyBjbGFzcz0ic3Q0Ij4KCQkJPHBhdGggY2xhc3M9InN0NSIgZD0iTTcsN2gxMzZ2MTM2SDdWN3oiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8ZGVmcz4KCQkJPHBhdGggaWQ9IlNWR0lEXzdfIiBkPSJNOTQuNiw2Ni42bDE4LjItMTMuM2MxLjYtMS4zLDIuOC0xLDIuOCwxLjR2NDAuNmMwLDIuNy0xLjUsMi40LTIuOCwxLjRMOTQuNiw4My40VjY2LjZ6IE0zMi45LDU0Ljh2MzAuMwoJCQkJYzAsNi44LDUuNiwxMi40LDEyLjUsMTIuM2g0NC4yYzEuMiwwLDIuMy0xLDIuMy0yLjJWNjQuOWMwLTYuOC01LjYtMTIuNC0xMi41LTEyLjNIMzUuMkMzNCw1Mi42LDMzLDUzLjYsMzIuOSw1NC44eiIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzhfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfN18iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJCTxnIGNsYXNzPSJzdDYiPgoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjkuNCw0OS4xaDg5Ljd2NTEuOUgyOS40VjQ5LjF6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=';

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
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['chat_message:write:admin'];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
}
