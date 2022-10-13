import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CacheService from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'magento';
export const MAGENTO_URL = 'magentoUrl';

const AUTH_TOKEN_URL = 'https://{host}/index.php/rest/V1/integration/admin/token';

export default class Magento2Application extends ABasicApplication {

    public constructor(
        private readonly cache: CacheService,
    ) {
        super();
    }

    public getDescription(): string {
        return 'Leading high-performant & scalable e-commerce platform used for online stores';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Magento2';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFQzY3Mzc7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTUuNiwzMHY1Ni44TDUwLDkwLjNsLTUuNi0zLjRWMzAuMUwyOS45LDM5djQ4LjZMNTAsOTkuOWwyMC4zLTEyLjRWMzlMNTUuNiwzMHogTTUwLDAuMUw3LjcsMjUuN3Y0OC42bDExLDYuNQoJVjMyLjFsMzEuMy0xOWwzMS4zLDE5bDAuMSwwLjFsMCw0OC41bDEwLjktNi40VjI1LjdMNTAsMC4xeiIvPgo8L3N2Zz4K';
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
            url ?? '',
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
            const credentials = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM] ?? {};
            const headers = {
                username: credentials[USER],
                password: credentials[PASSWORD],
            };
            const requestDto = new RequestDto(
                AUTH_TOKEN_URL,
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
                    const dtoBody = dto.getBody();
                    return {
                        expire: 4 * 3600 - 30,
                        dataToStore: dtoBody,
                    };
                },
                [200],
            );
        } catch (e) {
            if (e instanceof Error) {
                logger.error(e.message || 'Unknown error in Magento application.', processDto);
            }
            throw e;
        }
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'Username', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true))
            .addField(new Field(FieldType.TEXT, MAGENTO_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[USER] && authorizationForm?.[PASSWORD] && authorizationForm?.[MAGENTO_URL];
    }

}
