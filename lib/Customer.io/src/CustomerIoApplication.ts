import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'customer-io';
export const SITE_ID = 'site_id';
export const API_KEY = 'api_key';

export default class CustomerIoApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Customer.io';
    }

    public getDescription(): string {
        return 'Automated messaging platform for tech-savvy marketers - send data-driven emails, push notifications, in-app messages, and SMS';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkNEMDA7fQoJLnN0MXtmaWxsOiMwMEVDQkI7fQoJLnN0MntmaWxsOiNBRjY0RkY7fQoJLnN0M3tmaWxsOiM3MTMxRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OS45LDU1YzgsMCwxNS4zLTQuOCwxOC40LTEyLjNjMy4xLTcuNCwxLjQtMTYtNC4zLTIxLjdjLTUuNy01LjctMTQuMy03LjQtMjEuNy00LjNTMzAsMjcsMzAsMzUuMQoJCWMwLDUuMywyLjEsMTAuMyw1LjgsMTQuMUMzOS42LDUyLjksNDQuNyw1NSw0OS45LDU1TDQ5LjksNTV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTAuMSw2NC45TDUwLjEsNjQuOWMtMTMuNywwLTI1LjYtOS4zLTI5LTIyLjVjLTEtNC00LjItNy4zLTguMy03LjNIMC4zYzAsMjcuNSwyMi4zLDQ5LjcsNDkuNyw0OS43aDAuMVY2NC45CgkJeiIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQ5LjksNjQuOUw0OS45LDY0LjljMTMuNywwLDI1LjYtOS4zLDI5LTIyLjVjMS00LDQuMi03LjMsOC4zLTcuM2gxMi41YzAsMjcuNS0yMi4zLDQ5LjctNDkuNyw0OS43aC0wLjFWNjQuOQoJCXoiLz4KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik04NS4yLDcwLjNjLTkuMyw5LjMtMjIsMTQuNi0zNS4yLDE0LjZzLTI1LjgtNS4yLTM1LjItMTQuNmwxNC4xLTE0LjFjMTEuNywxMS43LDMwLjYsMTEuNyw0Mi4yLDBMODUuMiw3MC4zeiIKCQkvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, SITE_ID, 'site id', undefined, true))
            .addField(new Field(FieldType.TEXT, API_KEY, 'api key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[SITE_ID] && authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://track.customer.io/api/v1/${url}`, method, dto);
        const siteId = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SITE_ID];
        const apiKey = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${siteId}:${apiKey}`)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
