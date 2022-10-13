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

export const NAME = 'intercom';
export default class IntercomApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Intercom';
    }

    public getDescription(): string {
        return 'Customer Communications Platform that shows you who is using your product or website and makes it easy to personally communicate with them';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxRjhERUQ7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODYuNiw1NWMwLDEuOC0xLjUsMy4zLTMuNCwzLjNjLTEuOCwwLTMuMy0xLjUtMy4zLTMuM1YyNS4xYzAtMS44LDEuNS0zLjMsMy40LTMuM2MxLjgsMCwzLjMsMS41LDMuMywzLjNWNTV6CgkgTTg1LjQsNzUuOEM4NC45LDc2LjIsNzIuNiw4Ni41LDUwLDg2LjVjLTIyLjYsMC0zNC45LTEwLjMtMzUuNC0xMC44Yy0xLjQtMS4yLTEuNi0zLjMtMC40LTQuN2MxLjItMS40LDMuMy0xLjYsNC43LTAuNAoJYzAuMiwwLjIsMTEuMiw5LjIsMzEuMSw5LjJjMjAuMSwwLDMxLTkuMSwzMS4xLTkuMmMxLjQtMS4yLDMuNS0xLDQuNywwLjRDODcsNzIuNSw4Ni44LDc0LjYsODUuNCw3NS44eiBNMTMuNCwyNS4xCgljMC0xLjgsMS41LTMuMywzLjQtMy4zYzEuOCwwLDMuMywxLjUsMy4zLDMuM1Y1NWMwLDEuOC0xLjUsMy4zLTMuNCwzLjNjLTEuOCwwLTMuMy0xLjUtMy4zLTMuM0wxMy40LDI1LjFMMTMuNCwyNS4xeiBNMzAuMSwxOC40CgljMC0xLjgsMS41LTMuMywzLjQtMy4zYzEuOCwwLDMuMiwxLjUsMy4zLDMuM3Y0NC40YzAsMS44LTEuNSwzLjMtMy40LDMuM2MtMS44LDAtMy4yLTEuNS0zLjMtMy4zVjE4LjRMMzAuMSwxOC40eiBNNDYuNywxNi43CgljMC0xLjgsMS41LTMuMywzLjMtMy4zYzAsMCwwLDAsMCwwYzEuOCwwLDMuMywxLjUsMy4zLDMuM2MwLDAsMCwwLDAsMHY0OC4yYzAsMS44LTEuNSwzLjMtMy40LDMuM2MtMS44LDAtMy4zLTEuNS0zLjMtMy4zVjE2LjcKCUw0Ni43LDE2Ljd6IE02My4zLDE4LjRjMC0xLjgsMS41LTMuMywzLjQtMy4zYzEuOCwwLDMuMiwxLjUsMy4zLDMuM3Y0NC40YzAsMS44LTEuNSwzLjMtMy40LDMuM2MtMS44LDAtMy4yLTEuNS0zLjMtMy4zVjE4LjQKCUw2My4zLDE4LjR6IE04Ny40LDAuMUgxMi42QzUuNywwLjEsMC4xLDUuNywwLjEsMTIuNnY3NC44YzAsNi45LDUuNiwxMi41LDEyLjUsMTIuNWg3NC44YzYuOSwwLDEyLjUtNS42LDEyLjUtMTIuNVYxMi42CglDOTkuOSw1LjcsOTQuMywwLjEsODcuNCwwLjF6Ii8+Cjwvc3ZnPgo=';
    }

    public getAuthUrl(): string {
        return 'https://app.intercom.com/oauth';
    }

    public getTokenUrl(): string {
        return 'https://api.intercom.io/auth/eagle/token';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.intercom.io/${_url}`;
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

        return new FormStack()
            .addForm(form);
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
