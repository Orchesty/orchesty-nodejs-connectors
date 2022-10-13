import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'bulk-gate';
export const APPLICATION_ID = 'application_id';
export const APPLICATION_TOKEN = 'application_token';

export default class BulkGateApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'BulkGate';
    }

    public getDescription(): string {
        return 'Messaging platform that enables companies and individuals to spread their message with personalized bulk SMS';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9InN2ZzQwNTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwODBGRjt9Cjwvc3R5bGU+CjxnIGlkPSJsYXllcjEiPgoJPGcgaWQ9ImczNDE4Ij4KCQk8cGF0aCBpZD0icGF0aDM0MjAiIGNsYXNzPSJzdDAiIGQ9Ik00OS44LDMwYzE2LjMsMTEuMSwyNy43LDI1LjQsMzIuMyw1OC4zaDE3LjVjLTEuNy0zMi43LTIxLjQtNjEtNDkuOC03Ni41CgkJCUMyMS40LDI3LjMsMS44LDU1LjUsMCw4OC4zaDE3LjVjMCwwLDMwLjksMS4yLDUxLjQtMzFjMCwwLTIwLjUsMTAuOS0zMi42LDYuNGMtMTEuNC00LjMtNS45LTE0LjItNS4zLTE1LjMKCQkJQzM2LDQxLjEsNDIuNCwzNC44LDQ5LjgsMzAiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, APPLICATION_ID, 'Application Id', undefined, true))
            .addField(new Field(FieldType.TEXT, APPLICATION_TOKEN, 'Application token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[APPLICATION_ID] && authorizationForm?.[APPLICATION_TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        appInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://portal.bulkgate.com/api/1.0/simple/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        });

        if (data) {
            const newBody = {
                [APPLICATION_ID]: appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][APPLICATION_ID],
                [APPLICATION_TOKEN]: appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][APPLICATION_TOKEN],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...data as any,
            };
            request.setJsonBody(newBody);
        }

        return request;
    }

}
