import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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
import { defaultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'authentica';
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
        return 'Authentica Fulfillment';
    }

    public getDescription(): string {
        return 'Simple solution for outsourcing logistics. In a few simple steps, connect your current e-commerce or accounting solution for automated order processing';
    }

    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

    public getFormStack(): FormStack {
        const settingsForm = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM));
        const clientId = new Field(FieldType.TEXT, CLIENT_ID, 'Client id');
        const clientSecret = new Field(FieldType.PASSWORD, CLIENT_SECRET, 'Client secret');

        settingsForm.addField(clientId).addField(clientSecret);
        return new FormStack().addForm(settingsForm);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    public async getRequestDto(
        dto: ProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [AUTHENTICA_SHOP_ID]: applicationInstall.getUser(),
            [CommonHeaders.AUTHORIZATION]: await this.getAccessToken(dto, applicationInstall),
        };

        const req = new RequestDto(`${this.getBaseUrl()}/applinth/${url}`, method, dto);
        req.setHeaders(headers);

        if (data) {
            req.setJsonBody(data);
        }

        return req;
    }

    protected getBaseUrl(): string {
        return 'https://app.authentica.cz/api';
    }

    protected async getAccessToken(processDto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
        const url = `${this.getBaseUrl()}/token`;

        const clientId = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_ID];
        const clientSecret = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_SECRET];

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
            defaultRanges,
        );

        return `Bearer ${storedAccessToken.access_token}`;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async accessCallBack(res: ResponseDto): Promise<ICacheCallback<IAccessToken>> {
        const token = res.getJsonBody() as IAccessToken;
        return {
            dataToStore: token,
            expire: token.expires_in - 300,
        };
    }

}

interface IAccessToken {
    expires_in: number;
    access_token: string;
}
