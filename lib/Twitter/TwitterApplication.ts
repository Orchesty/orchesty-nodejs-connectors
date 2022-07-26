import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';

export const BASE_URL = 'https://api.twitter.com';

export const NAME = 'twitter';
export default class TwitterApplication extends ABasicApplication {
  constructor(private _sender: CurlSender) {
    super();
  }

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Twitter';

  public getDescription = (): string => 'Twitter description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = async (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): Promise<RequestDto> => {
    const url = `${BASE_URL}/${_url}`;
    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${await this._getAuthorizationCode(applicationInstall, dto)}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };

  private _getAuthorizationCode = async (appInstall: ApplicationInstall, dto: AProcessDto): Promise<string> => {
    const clientId = appInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_ID];
    const clientSecret = appInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_SECRET];
    const req = new RequestDto(
      `${BASE_URL}/oauth2/token?grant_type=client_credentials`,
      HttpMethods.POST,
      dto,
      'grant_type=client_credentials',
      {
        [CommonHeaders.AUTHORIZATION]: encode(`${clientId}:${clientSecret}`),
      },
    );

    const resp = await this._sender.send(req);

    return (resp.jsonBody as ITokenResponse).access_token;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [
    'tweet.read',
    'tweet.write',
    'users.read',
  ];
}
/* eslint-disable @typescript-eslint/naming-convention */

interface ITokenResponse {
    token_type: string;
    access_token: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
