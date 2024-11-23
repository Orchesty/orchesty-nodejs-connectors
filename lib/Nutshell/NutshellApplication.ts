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
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'nutshell';

export default class NutshellApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Affordable, easy-to-use CRM that helps small-business sales teams win more deals';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Nutshell';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRTU4MDA7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wLjEsMC4xaDk5Ljd2OTkuN0gwLjFWMC4xeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTU1LjUsMjkuMmMtMS4xLDAtMi0xLTEuOS0yLjFjMC0wLjEsMC0wLjIsMC0wLjNsMS40LTcuM2MwLTAuMSwwLTAuMiwwLTAuM2MwLTEuNS0yLjItMS43LTUtMS43cy01LDAuMi01LDEuNwoJCWMwLDAuMSwwLDAuMiwwLDAuM2wxLjQsNy4zYzAuMiwxLjEtMC41LDIuMi0xLjYsMi40Yy0wLjEsMC0wLjIsMC0wLjMsMGMtMTMuNCwwLjUtMjIuOSw0LjktMjIuOSwxMi45djMuMWMwLDAuOCwwLjcsMS41LDEuNSwxLjUKCQljMCwwLDAsMCwwLDBoMjQuNGMxLDAsMS41LDAuNywxLjUsMS41YzAsMC43LTAuNSwxLjMtMS4yLDEuNEwyOS43LDUzYy0wLjcsMC4xLTEuMiwwLjctMS4yLDEuNHY2LjJjMCwxMS45LDkuMywyMS45LDIxLjUsMjEuOQoJCWMxMS45LDAsMjEuNS05LjcsMjEuNS0yMS41di0xM2MwLTAuOCwwLjctMS40LDEuNC0xLjRjMCwwLDAsMCwwLDBoMy45YzAuOCwwLDEuNS0wLjcsMS41LTEuNWMwLDAsMCwwLDAsMHYtMy4xCgkJQzc4LjQsMzQsNjguOSwzMCw1NS41LDI5LjJMNTUuNSwyOS4yeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const request = new RequestDto('https://app.nutshell.com/api/v1/json', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${this.getToken(applicationInstall)}`,
        });
        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, USER, 'Username', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'API Key', undefined, true));

        return new FormStack().addForm(form);
    }

    private getToken(applicationInstall: ApplicationInstall): string {
        return encode(

            `${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER]}:${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD]}`,
        );
    }

}
