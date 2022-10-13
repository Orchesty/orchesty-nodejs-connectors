import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'box';
export default class BoxApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Box';
    }

    public getDescription(): string {
        return 'Keep all your businesses files in one place for simple online collaboration';
    }

    public getAuthUrl(): string {
        return 'https://account.box.com/api/oauth2/authorize';
    }

    public getTokenUrl(): string {
        return 'https://api.box.com/oauth2/token';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDcxRjc7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTksNzAuOWMxLjIsMS43LDEsNC0wLjUsNS4yYy0xLjcsMS4yLTQuMiwxLTUuNS0wLjVsLTguNy0xMS4ybC04LjUsMTFjLTEuMiwxLjctMy43LDEuNy01LjUsMC41CglzLTItMy41LTAuNy01LjJsMTAtMTIuOWwtMTAtMTIuOWMtMS4yLTEuNy0wLjctNC4yLDAuNy01LjVjMS43LTEuMiw0LjItMC43LDUuNSwwLjdsOC41LDExLjJMOTMsNDAuNWMxLjItMS43LDMuNS0yLDUuNS0wLjcKCWMxLjcsMS4yLDEuNywzLjcsMC41LDUuNWwtOS43LDEyLjdMOTksNzAuOXogTTUzLjcsNjkuNGMtNi41LDAtMTEuNy01LTExLjctMTEuNWMwLTYuMiw1LjItMTEuNSwxMS43LTExLjVzMTEuNyw1LjIsMTEuNywxMS41CglDNjUuMSw2NC40LDU5LjksNjkuNCw1My43LDY5LjR6IE0xOS4zLDY5LjRjLTYuNSwwLTExLjctNS0xMS43LTExLjVjMC02LjIsNS4yLTExLjUsMTEuNy0xMS41UzMxLDUxLjcsMzEsNTcuOQoJQzMxLDY0LjQsMjUuOCw2OS40LDE5LjMsNjkuNHogTTUzLjcsMzljLTcuMiwwLTEzLjcsNC0xNi45LDEwYy0zLjItNi05LjctMTAtMTcuMi0xMGMtNC41LDAtOC41LDEuNS0xMS43LDMuN1YyNi44CgljMC0yLTEuNy0zLjctMy43LTMuN2MtMi4yLDAtNCwxLjctNCwzLjd2MzEuNGMwLjIsMTAuNSw4LjcsMTguNywxOS4yLDE4LjdjNy41LDAsMTMuOS00LjIsMTcuMi0xMC4yYzMuMiw2LDkuNywxMC4yLDE2LjksMTAuMgoJYzEwLjcsMCwxOS40LTguNSwxOS40LTE5LjJDNzMuMSw0Ny41LDY0LjQsMzksNTMuNywzOXoiLz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.box.com/2.0/${_url}`;
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [];
    }

}
