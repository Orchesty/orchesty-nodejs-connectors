import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { defaultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { createHash } from 'crypto';
import {
    DESCRIPTION,
    getApiUrl,
    getWflowOrganization,
    IWflowApplication,
    LOGO,
    NAME,
    ORGANIZATION,
    ORGANIZATION_FORM,
    PUBLIC_NAME,
    TOKEN_URL,
} from './WflowApplication';

export function getTokenCacheKey(user: string, clientId: string, clientSecret: string): string {
    const hash = createHash('sha256').update(`${clientId}:${clientSecret}`).digest('hex').slice(0, 16);

    return `${NAME}-accessToken-${user}-${hash}`;
}

export default class WflowClientCredentialsApplication extends ABasicApplication implements IWflowApplication {

    public constructor(private readonly cacheService: CacheService) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return PUBLIC_NAME;
    }

    public getDescription(): string {
        return DESCRIPTION;
    }

    public getLogo(): string {
        return LOGO;
    }

    public getTokenUrl(): string {
        return TOKEN_URL;
    }

    public getFormStack(): FormStack {
        return new FormStack()
            .addForm(
                new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
                    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
                    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)),
            )
            .addForm(
                new Form(ORGANIZATION_FORM, 'Organization settings')
                    .addField(new Field(
                        FieldType.TEXT,
                        ORGANIZATION,
                        'Organization subdomain',
                        undefined,
                        true,
                    )),
            );
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return Boolean(authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET]);
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        path?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const headers = {
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${await this.getAccessToken(dto, applicationInstall)}`,
        };

        return new RequestDto(getApiUrl(path), method, dto, data, headers);
    }

    public getOrganization(applicationInstall: ApplicationInstall): string {
        return getWflowOrganization(applicationInstall);
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

    private async getAccessToken(dto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM] ?? {};
        const clientId = String(authorizationForm[CLIENT_ID] ?? '');
        const clientSecret = String(authorizationForm[CLIENT_SECRET] ?? '');
        const cacheKey = getTokenCacheKey(applicationInstall.getUser(), clientId, clientSecret);

        const requestDto = new RequestDto(
            this.getTokenUrl(),
            HttpMethods.POST,
            dto,
            new URLSearchParams({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                grant_type: 'client_credentials',
                [CLIENT_ID]: clientId,
                [CLIENT_SECRET]: clientSecret,
                scope: 'uccl_common_api',
            }).toString(),
            {
                [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
                [CommonHeaders.ACCEPT]: JSON_TYPE,
            },
        );

        return this.cacheService.entryWithLock<string>(
            cacheKey,
            `${cacheKey}-lock`,
            requestDto,
            (response) => {
                const body = response.getJsonBody() as ITokenResponse;

                return {
                    dataToStore: body.access_token,
                    expire: body.expires_in - 120,
                };
            },
            defaultRanges,
        );
    }

}

interface ITokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
