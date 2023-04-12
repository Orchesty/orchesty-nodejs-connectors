import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { defaultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import FormData from 'form-data';

export const MONEYS_URL = 'moneys5Url';

export default abstract class MoneyS45BaseApplication extends ABasicApplication {

    public constructor(
        private readonly cache: CacheService,
    ) {
        super();
    }

    public getDescription(): string {
        return 'Enterprise ERP system for companies that need solution with data stored in SQL Server';
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: string,
    ): Promise<RequestDto> {
        const headers = {
            [CommonHeaders.AUTHORIZATION]: await this.getApiToken(applicationInstall, dto),
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        };

        return new RequestDto(
            `${this.getDecoratedUrl(applicationInstall)}/${url}`,
            parseHttpMethod(method),
            dto,
            data,
            headers,
        );
    }

    public async getApiToken(
        applicationInstall: ApplicationInstall,
        processDto: AProcessDto,
    ): Promise<string> {
        try {
            const cacheKey = `${
                this.getName()
            }ApiKey_${applicationInstall.getUser()}`;
            const headers = {
                [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
                [CommonHeaders.ACCEPT]: JSON_TYPE,
            };

            const form = new FormData();
            form.append('grant_type', 'client_credentials');
            form.append('client_id', applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_ID]);
            form.append('client_secret', applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_SECRET]);

            const requestDto = new RequestDto(
                `${this.getDecoratedUrl(applicationInstall)}'/connect/token'}`,
                HttpMethods.GET,
                processDto,
                form,
                headers,
            );
            return await this.cache.entry(
                cacheKey,
                requestDto,
                // eslint-disable-next-line @typescript-eslint/require-await
                async (dto) => {
                    const dtoBody = dto.getJsonBody() as IResponseJson;
                    return {
                        expire: Number(dtoBody.expires_in) - 120,
                        dataToStore: dtoBody.access_token,
                    };
                },
                defaultRanges,
            );
        } catch (e) {
            if (e instanceof Error) {
                logger.error(e.message || 'Unknown error in Money S5 application.', processDto);
            }
            throw e;
        }
    }

    public getDecoratedUrl(app: ApplicationInstall): string {
        return app.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[MONEYS_URL] ?? '';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client ID', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, MONEYS_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET] && authorizationForm?.[MONEYS_URL];
    }

}

interface IResponseJson {
    access_token: string;
    expires_in: string;
    token_type: string;
}
