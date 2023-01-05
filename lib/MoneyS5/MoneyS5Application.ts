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
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

const NAME = 'moneys5';
const BASE_URL = 'https://{host}/';
const AUTH_TOKEN_URL = 'connect/token';
const MONEYS5_URL = 'moneys5Url';

export default class MoneyS5Application extends ABasicApplication {

    public constructor(
        private readonly cache: CacheService,
    ) {
        super();
    }

    public getDescription(): string {
        return 'Enterprise ERP system for companies that need solution with data stored in SQL Server';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'MoneyS5';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGQzRDMDI7fQo8L3N0eWxlPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNTguMywzOC42IDc5LjIsMjEuMSA2MS42LDAuMiA0MC43LDE3LjcgMTkuOCwzNS4zIDM3LjQsNTYuMiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjYyLjYsNDMuOCA0MS43LDYxLjQgMjAuOCw3OC45IDM4LjQsOTkuOCA1OS4zLDgyLjMgODAuMiw2NC43IAkiLz4KPC9nPgo8L3N2Zz4K';
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

        let urlx = url ?? '';
        if (!urlx.startsWith('http')) {
            urlx = `${this.getDecoratedUrl(applicationInstall)}/${urlx}`;
        }

        return new RequestDto(
            urlx,
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
                NAME
            }ApiKey_${applicationInstall.getUser()}`;
            const headers = {
                [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
                [CommonHeaders.ACCEPT]: JSON_TYPE,
            };
            const requestDto = new RequestDto(
                `${BASE_URL}${AUTH_TOKEN_URL}`,
                HttpMethods.GET,
                processDto,
                undefined,
                headers,
            );
            return await this.cache.entry(
                cacheKey,
                requestDto,
                // eslint-disable-next-line @typescript-eslint/require-await
                async (dto) => {
                    const dtoBody = dto.getJsonBody() as IResponseJson;
                    return {
                        expire: Number(dtoBody.expires_in),
                        dataToStore: dtoBody.access_token,
                    };
                },
                [200],
            );
        } catch (e) {
            if (e instanceof Error) {
                logger.error(e.message || 'Unknown error in Money S5 application.', processDto);
            }
            throw e;
        }
    }

    public getDecoratedUrl(app: ApplicationInstall): string {
        return app.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[MONEYS5_URL] ?? '';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client ID', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secter', undefined, true))
            .addField(new Field(FieldType.TEXT, MONEYS5_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET] && authorizationForm?.[MONEYS5_URL];
    }

}

interface IResponseJson {
    access_token: string;
    expires_in: string;
    token_type: string;
}
