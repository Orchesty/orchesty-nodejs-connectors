import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ABasicApplication, TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';

const BASE_URL = 'https://discord.com/api';

export default class DiscordApplication extends ABasicApplication {
  public getName = (): string => 'discord';

  public getPublicName = (): string => 'Discord';

  public getDescription = (): string => 'Discord Application';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> => {
    const token = applicationInstall.getSettings()?.[AUTHORIZATION_SETTINGS]?.[TOKEN];
    if (!token) {
      throw new Error(`Application [${this.getPublicName()}] doesn't have token!`);
    }
    return new RequestDto(
      new URL(url ?? BASE_URL).toString(),
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
