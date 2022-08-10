import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';

export const NAME = 'personio';

export default class PersonioApplication extends ABasicApplication {
  constructor(private _sender: CurlSender) {
    super();
  }

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Personio';

  public getDescription = (): string => 'Personio description';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, ' client id', undefined, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'client secret', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = async (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: unknown,
  ): Promise<RequestDto> => {
    const request = new RequestDto(`https://api.personio.de/v1/company/${_url}`, method, dto);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: await this._getAuthorizationCode(applicationInstall, dto),
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
      `https://api.personio.de/v1/auth?client_id=${clientId}&client_secret=${clientSecret}`,
      HttpMethods.GET,
      dto,
    );

    const resp = await this._sender.send(req);

    return (resp.jsonBody as ITokenResponse).data.token;
  };
}

interface ITokenResponse{
  success: boolean,
  data: {
    token: string
  }
}
