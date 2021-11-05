import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { Headers } from 'node-fetch';
import { CommonHeaders } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
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

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto | Promise<RequestDto> {
    const headers = new Headers({
      [CommonHeaders.ACCEPT]: 'application/json',
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
