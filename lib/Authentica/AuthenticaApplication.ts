import { BodyInit } from 'node-fetch';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';

export const NAME = 'authentica';
export const BASE_URL = 'https://app.authentica.cz/api';
const AUTHENTICA_SHOP_ID = 'authentica-shop-id';
const CACHE_KEY = 'authentica_cache_key';
const LOCK_KEY = 'authentica_lock_key';

export default class AuthenticaApplication extends ABasicApplication {
  constructor(private _cacheService: CacheService) {
    super();
  }

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Authentica Application';

  public getDescription = (): string => 'Authentica Application description';

  public getFormStack = (): FormStack => {
    const settingsForm = new Form(AUTHORIZATION_FORM, 'Settings');
    const clientId = new Field(FieldType.TEXT, CLIENT_ID, 'Client id');
    const clientSecret = new Field(FieldType.PASSWORD, CLIENT_SECRET, 'Client secret');

    settingsForm.addField(clientId).addField(clientSecret);
    return new FormStack().addForm(settingsForm);
  };

  public isAuthorized = (): boolean => true;

  public getRequestDto = async (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    _url?: string,
    data?: BodyInit,
  ): Promise<RequestDto> => {
    const headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [AUTHENTICA_SHOP_ID]: applicationInstall.getUser(),
      [CommonHeaders.AUTHORIZATION]: await this._getAccessToken(dto, applicationInstall),
    };

    let url: string;
    url = `${BASE_URL}/applinth/${_url}`;
    if (_url?.substring(0, 4) === 'http') {
      url = _url;
    }

    return new RequestDto(url, method, dto, data, headers);
  };

  private async _getAccessToken(processDto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
    const url = `${BASE_URL}/token`;

    const clientId = applicationInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_ID];
    const clientSecret = applicationInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_SECRET];

    const request = new RequestDto(
      url,
      HttpMethods.POST,
      processDto,
      `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scopes=default applinth`,
      {
        [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
      },
    );

    const storedAccessToken = await this._cacheService.entryWithLock<IAccessToken>(
      CACHE_KEY,
      LOCK_KEY,
      request,
      this._accessCallBack,
    );

    return `Bearer ${storedAccessToken.access_token}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private _accessCallBack = async (res: ResponseDto): Promise<ICacheCallback<IAccessToken>> => {
    const token = res.jsonBody as IAccessToken;
    return {
      dataToStore: token,
      expire: token.refresh_token_expiration,
    };
  };
}

interface IAccessToken {
  expiration: number,
  /* eslint-disable @typescript-eslint/naming-convention */
  access_token: string,
  refresh_token: string,
  refresh_token_expiration: number,
  /* eslint-enable @typescript-eslint/naming-convention */
}
