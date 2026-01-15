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
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'katana';
export const API_KEY = 'api_key';

export default class KatanaApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Katana';
    }

    public getDescription(): string {
        return 'Manufacturing ERP that gives you a live look at your business. Features include live inventory and manufacturing management, batch tracking for end-to-end traceability';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwOTIzMzI7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi42LDQ0LjloLTUuN2wtNi43LDYuN3YtNi43SDAuMXYxNS4zaDQuMXYtM2wzLTIuOWw0LjMsNS45aDUuMWwtNi40LTguOUwxNi42LDQ0Ljl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjguNiw0Ny4yYy0xLTEuNC0yLjctMi4zLTUuNi0yLjNjLTYuNCwwLTcuMSw1LjQtNy4xLDcuN2MwLDIsMC43LDcuNiw3LjEsNy42YzIuOSwwLDQuNi0wLjgsNS42LTIuMWgwLjF2Mi4xCgkJaDQuMVY0NC45aC00LjF2Mi4zSDI4LjZ6IE0yNC4yLDU2LjdjLTMuOSwwLTQuNC0zLTQuNC00LjFjMC0xLjIsMC40LTQuMSw0LjQtNC4xYzMuNSwwLDQuMywyLDQuMyw0LjEKCQlDMjguNSw1NC45LDI3LjgsNTYuNywyNC4yLDU2LjdMMjQuMiw1Ni43eiBNNDAuNiw0OC41aDQuOVY0NUgzNC40djMuNWgydjYuMWMwLDIuMiwwLDUuNiw0LjEsNS42YzQuMSwwLDQuOS0wLjMsNC45LTAuM3YtNAoJCWMtNCwwLjItNC45LDAuNS00LjktMS43VjQ4LjV6IE01OSw0Ny4yYy0xLTEuNC0yLjctMi4zLTUuNi0yLjNjLTYuNCwwLTcuMSw1LjQtNy4xLDcuN2MwLDIsMC43LDcuNiw3LjEsNy42YzIuOSwwLDQuNi0wLjgsNS42LTIuMQoJCWgwLjF2Mi4xaDQuMVY0NC45aC00LjF2Mi4zSDU5eiBNNTQuNiw1Ni43Yy0zLjksMC00LjQtMy00LjQtNC4xYzAtMS4yLDAuNC00LjEsNC40LTQuMWMzLjUsMCw0LjMsMiw0LjMsNC4xCgkJQzU4LjksNTQuOSw1OC4yLDU2LjcsNTQuNiw1Ni43TDU0LjYsNTYuN3ogTTc0LjcsNDQuOWMtMi43LDAtNC4xLDAuOS01LjEsMi4zaC0wLjJ2LTIuM2gtNC4xdjE1LjNoNC4xdi03LjRjMC0yLjEsMC41LTQuNCw0LjEtNC40CgkJYzMuOSwwLDMuNywyLjksMy43LDQuMXY3LjZoNC4xdi03LjZDODEuMyw1MC4zLDgxLjEsNDQuOSw3NC43LDQ0LjlMNzQuNyw0NC45eiBNOTUuNiw0Ny4yYy0xLTEuNC0yLjctMi4zLTUuNi0yLjMKCQljLTYuNCwwLTcuMSw1LjQtNy4xLDcuN2MwLDIsMC43LDcuNiw3LjEsNy42YzIuOSwwLDQuNi0wLjgsNS42LTIuMWgwLjF2Mi4xaDQuMVY0NC45aC00LjF2Mi4zQzk1LjgsNDcuMiw5NS42LDQ3LjIsOTUuNiw0Ny4yegoJCSBNOTEuMiw1Ni43Yy0zLjksMC00LjQtMy00LjQtNC4xYzAtMS4yLDAuNC00LjEsNC40LTQuMWMzLjUsMCw0LjMsMiw0LjMsNC4xQzk1LjUsNTQuOSw5NC43LDU2LjcsOTEuMiw1Ni43TDkxLjIsNTYuN3oiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNi40LDM5Ljh2NS4zYzAsMCwxLjctMC41LDMtMi4xYzEuMy0xLjYsMS4yLTMuMiwxLjItMy4ySDM2LjRMMzYuNCwzOS44eiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const key = settings[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY];
        const url = `https://api.katanamrp.com/v1/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${key}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
