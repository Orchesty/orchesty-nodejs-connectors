import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';

export const NAME = 'marketo';
export const MARKETO_URL = 'https://284-RPR-133.mktorest.com';

export default class MarketoApplication extends ABasicApplication {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public constructor(private readonly _sender: CurlSender) {
    super();
  }

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Marketo';

  public getDescription = (): string => 'Marketo description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true))
      .addField(new Field(FieldType.TEXT, MARKETO_URL, 'marketo url', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = async (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): Promise<RequestDto> => {
    const settings = applicationInstall.getSettings();
    const id = settings[AUTHORIZATION_FORM][CLIENT_ID];
    const secret = settings[AUTHORIZATION_FORM][CLIENT_SECRET];
    const baseUrl = settings[AUTHORIZATION_FORM][MARKETO_URL];
    const logInRequest = new RequestDto(
      `${baseUrl}/identity/oauth/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`,
      HttpMethods.GET,
      dto,
    );
    const loginResponseDto = await this._sender.send(logInRequest, [200]);
    const logInResponse = loginResponseDto.jsonBody as LoginResponse;
    const url = `${baseUrl}/rest${_url}`;
    const request = new RequestDto(url, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${logInResponse.access_token}`,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };
}

/* eslint-disable @typescript-eslint/naming-convention */
interface LoginResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string
}

/* eslint-enable @typescript-eslint/naming-convention */
