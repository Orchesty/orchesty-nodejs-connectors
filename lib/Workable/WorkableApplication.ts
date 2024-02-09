import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'workable';
export const SUBDOMAIN = 'subdomain';

export default class WorkableApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Workable';
    }

    public getDescription(): string {
        return 'World’s leading hiring platform. Companies of all sizes and across all industries use our software to manage their in-house recruitment and hire the best talent';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOm5vbmU7fQoJLnN0MXtmaWxsOiMwMTAyMEY7fQo8L3N0eWxlPgo8Zz4KCTxyZWN0IHg9IjAuMSIgeT0iMjMuMiIgY2xhc3M9InN0MCIgd2lkdGg9IjY4LjMiIGhlaWdodD0iNTMuNyIvPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYzLjQsNTIuNWMyLjktNC41LDQuNS05LjYsNC45LTE0LjljMC4xLTQuMi0xLjctOC4yLTQuOS0xMC45Yy04LjYtNy4yLTI1LjUtMy40LTI1LjMsMTEuMQoJCQljMC4xLDUuNSwyLjcsMTIuNSw5LjYsMjEuMWMyLTEuOCwzLjYtNCw0LjctNi41Yy0xOC4zLTI0LjksMjAuMi0yNi4zLDEsMS40Yy0xLjQsMi4yLTMuMSw0LjItNSw2Yy02LDUuNi0xMS40LDcuNC0xNi4xLDYuNgoJCQljLTE2LjQtMi43LTE5LTI3LjEtMjAuMi00MS42aC0xMmMwLDAuMiwwLDAuMywwLDAuNXYyLjdjMC42LDI4LjgsMjEsNjguOSw1My42LDM3LjRjMS44LTEuOCwzLjUtMy44LDUuMS01LjgKCQkJQzYwLjUsNTcuMiw2Miw1NC45LDYzLjQsNTIuNSIvPgoJPC9nPgoJPHBhdGggZD0iTTkxLjEsMzkuOWMtMi4yLDE2LjktMTIsMzEuMi0yNi44LDIzLjRjLTAuMywwLjQtMC42LDAuOC0wLjksMS4yYy0xLjQsMS43LTMsMy4yLTQuNyw0LjVjMCwwLTAuMSwwLTAuMS0wLjEKCQljMS41LDEsMy4yLDEuOCw0LjksMi41QzgxLjYsNzguNCw5OC4zLDYxLDk5LjksMzkuMWwtOC42LTAuNEM5MS4yLDM5LjEsOTEuMSwzOS41LDkxLjEsMzkuOSIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, ACCESS_TOKEN, 'Access Token', undefined, true))
            .addField(new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', 'www', true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[ACCESS_TOKEN] && authorizationForm?.[SUBDOMAIN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://${uri}`, method, dto);
        const accessToken = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ACCESS_TOKEN];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${accessToken}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
