import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://api.zoom.us/';

export default class ZoomApplication extends AOAuth2Application {

    public getAuthUrl(): string {
        return 'https://zoom.us/oauth/authorize';
    }

    public getTokenUrl(): string {
        return 'https://zoom.us/oauth/token';
    }

    public getName(): string {
        return 'zoom';
    }

    public getPublicName(): string {
        return 'Zoom';
    }

    public getDescription(): string {
        return 'Video-first unified communications platform provides video meetings, voice and webinars';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM0QThDRkY7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjUwIiBjeT0iNTAiIHI9IjQ5LjgiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOCwzNC40djIzLjRjMCw1LjMsNC4zLDkuNiw5LjYsOS41aDM0LjFjMSwwLDEuNy0wLjgsMS44LTEuN1Y0Mi4yYzAtNS4zLTQuMy05LjYtOS42LTkuNUgxOS44CgkJQzE4LjgsMzIuNywxOC4xLDMzLjQsMTgsMzQuNEMxOCwzNC40LDE4LDM0LjQsMTgsMzQuNEwxOCwzNC40eiBNNjUuNyw0My41bDE0LjEtMTAuM2MxLjItMSwyLjItMC44LDIuMiwxLjF2MzEuNAoJCWMwLDIuMS0xLjIsMS44LTIuMiwxLjFMNjUuNyw1Ni41TDY1LjcsNDMuNXoiLz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        if (!this.isAuthorized(applicationInstall)) {
            throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
        }

        const token = applicationInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[TOKEN];
        return new RequestDto(
            `${BASE_URL}${url}`,
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${token.accessToken}`,
            },
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['chat_message:write:admin'];
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

}
