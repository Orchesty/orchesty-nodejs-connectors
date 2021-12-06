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

  public getDescription = (): string => 'Discord Application';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzEiIGhlaWdodD0iNTUiIHZpZXdCb3g9IjAgMCA3MSA1NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik02MC4xMDQ1IDQuODk3OEM1NS41NzkyIDIuODIxNCA1MC43MjY1IDEuMjkxNiA0NS42NTI3IDAuNDE1NDJDNDUuNTYwMyAwLjM5ODUxIDQ1LjQ2OCAwLjQ0MDc2OSA0NS40MjA0IDAuNTI1Mjg5QzQ0Ljc5NjMgMS42MzUzIDQ0LjEwNSAzLjA4MzQgNDMuNjIwOSA0LjIyMTZDMzguMTYzNyAzLjQwNDYgMzIuNzM0NSAzLjQwNDYgMjcuMzg5MiA0LjIyMTZDMjYuOTA1IDMuMDU4MSAyNi4xODg2IDEuNjM1MyAyNS41NjE3IDAuNTI1Mjg5QzI1LjUxNDEgMC40NDM1ODkgMjUuNDIxOCAwLjQwMTMzIDI1LjMyOTQgMC40MTU0MkMyMC4yNTg0IDEuMjg4OCAxNS40MDU3IDIuODE4NiAxMC44Nzc2IDQuODk3OEMxMC44Mzg0IDQuOTE0NyAxMC44MDQ4IDQuOTQyOSAxMC43ODI1IDQuOTc5NUMxLjU3Nzk1IDE4LjczMDkgLTAuOTQzNTYxIDMyLjE0NDMgMC4yOTM0MDggNDUuMzkxNEMwLjI5OTAwNSA0NS40NTYyIDAuMzM1Mzg2IDQ1LjUxODIgMC4zODU3NjEgNDUuNTU3NkM2LjQ1ODY2IDUwLjAxNzQgMTIuMzQxMyA1Mi43MjQ5IDE4LjExNDcgNTQuNTE5NUMxOC4yMDcxIDU0LjU0NzcgMTguMzA1IDU0LjUxMzkgMTguMzYzOCA1NC40Mzc4QzE5LjcyOTUgNTIuNTcyOCAyMC45NDY5IDUwLjYwNjMgMjEuOTkwNyA0OC41MzgzQzIyLjA1MjMgNDguNDE3MiAyMS45OTM1IDQ4LjI3MzUgMjEuODY3NiA0OC4yMjU2QzE5LjkzNjYgNDcuNDkzMSAxOC4wOTc5IDQ2LjYgMTYuMzI5MiA0NS41ODU4QzE2LjE4OTMgNDUuNTA0MSAxNi4xNzgxIDQ1LjMwNCAxNi4zMDY4IDQ1LjIwODJDMTYuNjc5IDQ0LjkyOTMgMTcuMDUxMyA0NC42MzkxIDE3LjQwNjcgNDQuMzQ2MUMxNy40NzEgNDQuMjkyNiAxNy41NjA2IDQ0LjI4MTMgMTcuNjM2MiA0NC4zMTUxQzI5LjI1NTggNDkuNjIwMiA0MS44MzU0IDQ5LjYyMDIgNTMuMzE3OSA0NC4zMTUxQzUzLjM5MzUgNDQuMjc4NSA1My40ODMxIDQ0LjI4OTggNTMuNTUwMiA0NC4zNDMzQzUzLjkwNTcgNDQuNjM2MyA1NC4yNzc5IDQ0LjkyOTMgNTQuNjUyOSA0NS4yMDgyQzU0Ljc4MTYgNDUuMzA0IDU0Ljc3MzIgNDUuNTA0MSA1NC42MzMzIDQ1LjU4NThDNTIuODY0NiA0Ni42MTk3IDUxLjAyNTkgNDcuNDkzMSA0OS4wOTIxIDQ4LjIyMjhDNDguOTY2MiA0OC4yNzA3IDQ4LjkxMDIgNDguNDE3MiA0OC45NzE4IDQ4LjUzODNDNTAuMDM4IDUwLjYwMzQgNTEuMjU1NCA1Mi41Njk5IDUyLjU5NTkgNTQuNDM1QzUyLjY1MTkgNTQuNTEzOSA1Mi43NTI2IDU0LjU0NzcgNTIuODQ1IDU0LjUxOTVDNTguNjQ2NCA1Mi43MjQ5IDY0LjUyOSA1MC4wMTc0IDcwLjYwMTkgNDUuNTU3NkM3MC42NTUxIDQ1LjUxODIgNzAuNjg4NyA0NS40NTkgNzAuNjk0MyA0NS4zOTQyQzcyLjE3NDcgMzAuMDc5MSA2OC4yMTQ3IDE2Ljc3NTcgNjAuMTk2OCA0Ljk4MjNDNjAuMTc3MiA0Ljk0MjkgNjAuMTQzNyA0LjkxNDcgNjAuMTA0NSA0Ljg5NzhaTTIzLjcyNTkgMzcuMzI1M0MyMC4yMjc2IDM3LjMyNTMgMTcuMzQ1MSAzNC4xMTM2IDE3LjM0NTEgMzAuMTY5M0MxNy4zNDUxIDI2LjIyNSAyMC4xNzE3IDIzLjAxMzMgMjMuNzI1OSAyMy4wMTMzQzI3LjMwOCAyMy4wMTMzIDMwLjE2MjYgMjYuMjUzMiAzMC4xMDY2IDMwLjE2OTNDMzAuMTA2NiAzNC4xMTM2IDI3LjI4IDM3LjMyNTMgMjMuNzI1OSAzNy4zMjUzWk00Ny4zMTc4IDM3LjMyNTNDNDMuODE5NiAzNy4zMjUzIDQwLjkzNzEgMzQuMTEzNiA0MC45MzcxIDMwLjE2OTNDNDAuOTM3MSAyNi4yMjUgNDMuNzYzNiAyMy4wMTMzIDQ3LjMxNzggMjMuMDEzM0M1MC45IDIzLjAxMzMgNTMuNzU0NSAyNi4yNTMyIDUzLjY5ODYgMzAuMTY5M0M1My42OTg2IDM0LjExMzYgNTAuOSAzNy4zMjUzIDQ3LjMxNzggMzcuMzI1M1oiIGZpbGw9IiM1ODY1RjIiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSI3MSIgaGVpZ2h0PSI1NSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K';

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
