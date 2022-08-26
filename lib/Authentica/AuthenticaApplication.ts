import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BodyInit } from 'node-fetch';

export const NAME = 'authentica';
export const BASE_URL = 'https://app.authentica.cz/api';
const AUTHENTICA_SHOP_ID = 'authentica-shop-id';
const CACHE_KEY = 'authentica_cache_key';
const LOCK_KEY = 'authentica_lock_key';

export default class AuthenticaApplication extends ABasicApplication {

    public constructor(private readonly cacheService: CacheService) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Authentica Application';
    }

    public getDescription(): string {
        return 'Authentica Application description';
    }

    public getFormStack(): FormStack {
        const settingsForm = new Form(AUTHORIZATION_FORM, 'Settings');
        const clientId = new Field(FieldType.TEXT, CLIENT_ID, 'Client id');
        const clientSecret = new Field(FieldType.PASSWORD, CLIENT_SECRET, 'Client secret');

        settingsForm.addField(clientId).addField(clientSecret);
        return new FormStack().addForm(settingsForm);
    }

    public isAuthorized(): boolean {
        return true;
    }

    public async getRequestDto(
        dto: ProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> {
        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [AUTHENTICA_SHOP_ID]: applicationInstall.getUser(),
            [CommonHeaders.AUTHORIZATION]: await this.getAccessToken(dto, applicationInstall),
        };

        return new RequestDto(`${BASE_URL}/applinth/${_url}`, method, dto, data, headers);
    }

    protected async getAccessToken(processDto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
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

        const storedAccessToken = await this.cacheService.entryWithLock<IAccessToken>(
            CACHE_KEY,
            LOCK_KEY,
            request,
            this.accessCallBack.bind(this),
        );

        return `Bearer ${storedAccessToken.access_token}`;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async accessCallBack(res: ResponseDto): Promise<ICacheCallback<IAccessToken>> {
        const token = res.getJsonBody() as IAccessToken;
        return {
            dataToStore: token,
            expire: token.refresh_token_expiration,
        };
    }

}

interface IAccessToken {
    expiration: number;
    /* eslint-disable @typescript-eslint/naming-convention */
    access_token: string;
    refresh_token: string;
    refresh_token_expiration: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
