import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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

export const NAME = 'monday';
export const API_KEY = 'api_key';
export default class MondayApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Monday';
    }

    public getDescription(): string {
        return 'Customizable work management platform, designed to help teams and organizations with operational efficiency by tracking projects and workflows, visualizing data, and team collaboration';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkNCMDA7fQoJLnN0MXtmaWxsOiNGRjNENTc7fQoJLnN0MntmaWxsOiMwMEQ2NDc7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OS44LDc5LjZjLTQuNC0wLjEtOC0yLTEwLjMtNi4xYy0yLjQtNC4yLTIuMy04LjUsMC4zLTEyLjVjNi05LjcsMTIuMS0xOS40LDE4LjItMjljMS4yLTIsMi41LTQsMy43LTUuOQoJCWMzLjYtNS41LDEwLjktNy4yLDE2LjUtMy44YzUuNywzLjUsNy42LDEwLjgsNC4xLDE2LjZDNzUsNTAuNiw2Ny42LDYyLjQsNjAuMiw3NC4xQzU3LjksNzcuNyw1NC40LDc5LjUsNDkuOCw3OS42eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEyLjEsNzkuNmMtNC40LTAuMS04LTIuMS0xMC4zLTYuMmMtMi4zLTQuMi0yLjItOC41LDAuMy0xMi41YzYuNS0xMC40LDEzLTIwLjgsMTkuNS0zMS4xCgkJYzAuOC0xLjMsMS43LTIuNywyLjUtNGMzLjgtNS41LDExLjQtNi45LDE2LjktMy4xYzUuMywzLjYsNi44LDEwLjgsMy41LDE2LjNjLTcuMiwxMS43LTE0LjYsMjMuMy0yMS45LDM1CgkJQzIwLjMsNzcuNiwxNi44LDc5LjUsMTIuMSw3OS42TDEyLjEsNzkuNnoiLz4KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik04Ny44LDU1LjljNi43LDAsMTIuMSw1LjMsMTIuMSwxMS45YzAsNi42LTUuNiwxMS45LTEyLjMsMTEuOWMtNi43LTAuMS0xMi4xLTUuMy0xMi0xMS45CgkJQzc1LjUsNjEuMSw4MSw1NS44LDg3LjgsNTUuOUw4Ny44LDU1Ljl6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const key = settings[AUTHORIZATION_FORM][API_KEY];
        const url = 'https://api.monday.com/v2';
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: key,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'boards:write',
            'boards:read',
        ];
    }

}
