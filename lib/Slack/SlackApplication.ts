import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';

const BASE_URL = 'https://slack.com/api/';

export default class SlackApplication extends AOAuth2Application {
  public getAuthUrl = (): string => 'https://slack.com/oauth/v2/authorize';

  public getTokenUrl = (): string => 'https://slack.com/api/oauth.v2.access';

  public getDescription = (): string => 'Slack application';

  public getName = (): string => 'slack';

  public getPublicName = (): string => 'Slack';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> => {
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error(`Application ${this.getPublicName()} is not authorized!`);
    }

    const token = applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][TOKEN];
    const dto = new RequestDto(
      new URL(url ?? BASE_URL).toString(),
      method,
      JSON.stringify({
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
      }),
    );
    if (data) {
      dto.body = data;
    }

    return dto;
  };

  public authorize(applicationInstall: ApplicationInstall): string {
    return this._provider.authorize(
      this.createDto(applicationInstall),
      this.getScopes(applicationInstall),
      this._getScopesSeparator(),
      {
        http: {
          'headers.authorization': 'headers.Accept = application/x-www-form-urlencoded',
        },
        options: {
          authorizationMethod: 'body',
        },
      },
    );
  }

  public async setAuthorizationToken(
    applicationInstall: ApplicationInstall,
    token: { [p: string]: string },
  ): Promise<void> {
    const tokenFromProvider = await this._provider.getAccessToken(this.createDto(applicationInstall), token.code, {
      http: {
        'headers.authorization': 'headers.Accept = application/x-www-form-urlencoded',
      },
      options: {
        authorizationMethod: 'body',
      },
    });

    const settings = applicationInstall.getSettings();
    this._createAuthSettings(applicationInstall);
    settings[AUTHORIZATION_SETTINGS][TOKEN] = tokenFromProvider;
    applicationInstall.setSettings(settings);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [
    'app_mentions:read',
    'chat:write',
    'chat:write.public',
  ];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
}
