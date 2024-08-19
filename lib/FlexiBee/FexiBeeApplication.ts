import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import DateTimeUtils from '@orchesty/nodejs-sdk/dist/lib/Utils/DateTimeUtils';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const CANNOT_GET_BODY = 'Cannot get body from response.';
export const TOKEN_NOT_SUCCESS = 'Token is not succeed returned';

export const FLEXIBEE_URL = 'flexibeeUrl';

const CLIENT_SETTINGS = 'client_settings';
const AUTH_SESSION_ID = 'authSessionId';
const REFRESH_TOKEN = 'refreshToken';
const CSRF_TOKEN = 'csrfToken';
const TOKEN_GET = 'token_get';

const AUTH = 'auth';
const AUTH_JSON = 'json';
const AUTH_HTTP = 'http';

const X_AUTH_SESSION_ID = 'X-authSessionId';

const TOKEN_MAX_LIFE = 60 * 30; // 30 min

const ENDPOINT_LOGIN = 'login-logout/login.json';

export const FLEXI_BEE_APPLICATION = 'flexibee';

interface IToken {
    success: boolean;
    [AUTH_SESSION_ID]: string;
    [REFRESH_TOKEN]: string;
    [CSRF_TOKEN]: string;
    [TOKEN_GET]: number;
}

export default class FlexiBeeApplication extends ABasicApplication {

    public constructor(private readonly sender: CurlSender, private readonly dbClient: DatabaseClient) {
        super();
    }

    public getName(): string {
        return FLEXI_BEE_APPLICATION;
    }

    public getDescription(): string {
        return 'Modern economic system designed for small companies';
    }

    public getPublicName(): string {
        return 'FlexiBee';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDF7ZmlsbDojNjQ2MzYzO30KPC9zdHlsZT4KPGcgaWQ9IlZyc3R2YV8yXzFfIj4KCTxnIGlkPSJMb2dhIj4KCQk8Zz4KCQkJCgkJCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjY2LjY5MjIiIHkxPSIyMC42Nzk0IiB4Mj0iNjYuNjkyMiIgeTI9Ijc4LjU2MDEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCA5OS42MTk4KSI+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRjdCMzAwIi8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjEyIiBzdHlsZT0ic3RvcC1jb2xvcjojRjZBRjAzIi8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjI1IiBzdHlsZT0ic3RvcC1jb2xvcjojRjVBMjBCIi8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjM4IiBzdHlsZT0ic3RvcC1jb2xvcjojRjI4RTFBIi8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjUxIiBzdHlsZT0ic3RvcC1jb2xvcjojRUY3MTJFIi8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjY0IiBzdHlsZT0ic3RvcC1jb2xvcjojRUE0QjQ3Ii8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjc3IiBzdHlsZT0ic3RvcC1jb2xvcjojRTUxRTY2Ii8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIwLjg1IiBzdHlsZT0ic3RvcC1jb2xvcjojRTEwMDdCIi8+CgkJCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTEwMDdCIi8+CgkJCTwvbGluZWFyR3JhZGllbnQ+CgkJCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMzMuNSwyMS4xIDY2LjksMjEuMSA5OS45LDc4LjkgNjYuNSw3OC45IAkJCSIvPgoJCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjMzLjUsMjEuMSAwLjEsNzguOSAzMy41LDc4LjkgNjYuOSwyMS4xIAkJCSIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        let headers;
        if (applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUTH] === AUTH_JSON) {
            headers = {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [X_AUTH_SESSION_ID]: await this.getApiToken(applicationInstall, dto),
            };
        } else if (applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUTH] === AUTH_HTTP) {
            headers = {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Basic 
        ${encode(`${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER]}:
        ${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD]}`)}`,
            };
        }

        return new RequestDto(url ?? '', method, dto, data, headers);
    }

    public getFormStack(): FormStack {
        const authTypeField = new Field(FieldType.SELECT_BOX, AUTH, 'Authorize type', null, true);
        authTypeField.setChoices([AUTH_HTTP, AUTH_JSON]);

        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', null, true))
            .addField(new Field(FieldType.URL, FLEXIBEE_URL, 'Flexibee URL', null, true))
            .addField(authTypeField);

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[PASSWORD] && authorizationForm?.[FLEXIBEE_URL];
    }

    public getUrl(applicationInstall: ApplicationInstall, url?: string): string {
        const host = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][FLEXIBEE_URL] ?? '';

        if (!host) {
            throw Error('There is no flexibee url');
        }

        return `${host}/${url}`;
    }

    private async getApiToken(applicationInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        let token = await this.getApiTokenFromSettings(applicationInstall);

        if (!token) {
            const res = await this.sender.send<IToken>(this.getApiTokenDto(applicationInstall, dto), [200]);

            try {
                token = res.getJsonBody();
            } catch (Throwable) {
                throw Error(CANNOT_GET_BODY);
            }

            if (!token.success) {
                throw Error(TOKEN_NOT_SUCCESS);
            }

            applicationInstall.addSettings(
                {
                    [CLIENT_SETTINGS]: {
                        [AUTH_SESSION_ID]: token[AUTH_SESSION_ID],
                        [REFRESH_TOKEN]: token[REFRESH_TOKEN],
                        [CSRF_TOKEN]: token[CSRF_TOKEN],
                        [TOKEN_GET]: DateTimeUtils.getTimestamp(DateTimeUtils.getUtcDate()),
                    },
                },
            );
            const repository = this.dbClient.getApplicationRepository();
            await repository.insert(applicationInstall);
        }

        return token[AUTH_SESSION_ID];
    }

    private async getApiTokenFromSettings(
        applicationInstall: ApplicationInstall,
    ): Promise<IToken | null> {
        const repository = this.dbClient.getApplicationRepository();
        await repository.findById(applicationInstall.getId());
        const token = applicationInstall.getSettings()[CLIENT_SETTINGS] ?? [];

        const date = DateTimeUtils.getUtcDate();
        const valid = date.setMinutes(date.getMinutes() - TOKEN_MAX_LIFE);

        if (token[AUTH_SESSION_ID] !== undefined && token[TOKEN_GET] !== undefined && token[TOKEN_GET] > valid) {
            return token;
        }
        return null;
    }

    private getApiTokenDto(applicationInstall: ApplicationInstall, dto: AProcessDto): RequestDto {
        const setting = applicationInstall.getSettings();
        if (!this.isAuthorized(applicationInstall)) {
            throw new Error('User is not authenticated');
        }

        const user = setting[CoreFormsEnum.AUTHORIZATION_FORM][USER];
        const password = setting[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD];

        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        };

        return new RequestDto(
            this.getUrl(applicationInstall, ENDPOINT_LOGIN)
                .toString(),
            HttpMethods.POST,
            dto,
            JSON.stringify({
                [USER]: user,
                [PASSWORD]: password,
            }),
            headers,
        );
    }

}
