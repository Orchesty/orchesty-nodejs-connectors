import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { EXPIRES } from 'pipes-nodejs-sdk/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { BASE_URL } from '../SendGrid/SendGridApplication';

export default class DiscordApplication extends AOAuth2Application {
  public getName = (): string => 'discord';

  public getPublicName = (): string => 'Discord';

  public getDescription = (): string => 'Discord Application';

  public getAuthUrl = (): string => 'https://discord.com/api/oauth2/authorize';

  public getTokenUrl = (): string => 'https://discord.com/api/oauth2/token';

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

    const token = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[TOKEN];
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    applicationInstall.setExpires((tokenFromProvider as any)[EXPIRES] ?? undefined);

    if (Object.prototype.hasOwnProperty.call(tokenFromProvider, EXPIRES)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tokenFromProvider as any)[EXPIRES] = (tokenFromProvider as any)[EXPIRES].toString();
    }

    const settings = applicationInstall.getSettings();
    this._createAuthSettings(applicationInstall);
    settings[AUTHORIZATION_SETTINGS][TOKEN] = tokenFromProvider;
    applicationInstall.setSettings(settings);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['activities.read', 'bot'];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
}
