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
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';

export const SELLINGPARTNERID = 'selling_partner_id';
export const DEVELOPERID = 'developer_id';
export const MWSAUTHTOKEN = 'mws_auth_token';

export const BASE_URL = 'https://sellingpartnerapi-na.amazon.com';

export const NAME = 'amazon';
export default class AmazonApplication extends ABasicApplication {
  constructor(private _sender: CurlSender) {
    super();
  }

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Amazon';

  public getDescription = (): string => 'Amazon description';

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
      [CommonHeaders.AUTHORIZATION]: await this._getAuthorizationCode(applicationInstall, dto),
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  };

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, SELLINGPARTNERID, ' Selling partner Id', undefined, true))
      .addField(new Field(FieldType.TEXT, DEVELOPERID, 'Developer Id', undefined, true))
      .addField(new Field(FieldType.TEXT, MWSAUTHTOKEN, 'MWS auth token', undefined, true));

    return new FormStack().addForm(form);
  };

  private _getAuthorizationCode = async (appInstall: ApplicationInstall, dto: AProcessDto): Promise<string> => {
    const sId = appInstall.getSettings()[AUTHORIZATION_FORM][SELLINGPARTNERID];
    const dId = appInstall.getSettings()[AUTHORIZATION_FORM][DEVELOPERID];
    const token = appInstall.getSettings()[AUTHORIZATION_FORM][MWSAUTHTOKEN];
    const req = new RequestDto(
      `${BASE_URL}/authorization/v1/authorizationCode?sellingPartnerId=${sId}&developerId=${dId}&mwsAuthToken=${token}`,
      HttpMethods.GET,
      dto,
    );

    const resp = await this._sender.send(req);

    return (resp.jsonBody as ITokenResponse).payload.authorizationCode;
  };
}

interface ITokenResponse{
  payload: {
    authorizationCode: string
  }
}
