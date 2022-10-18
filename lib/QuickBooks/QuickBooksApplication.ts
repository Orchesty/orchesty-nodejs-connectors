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
import { BodyInit } from 'node-fetch';

export const NAME = 'quickbooks';
export const REALM_ID = 'realm_id';

export default class QuickBooksApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'QuickBooks';
    }

    public getDescription(): string {
        return 'Popular business accounting software that can be accessed at any time from a web browser';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMyQ0EwMUM7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTkuNyw1MC4xYzAsMjcuNC0yMi4zLDQ5LjctNDkuNyw0OS43Yy0yNy40LDAtNDkuNy0yMi4zLTQ5LjctNDkuN0MwLjMsMjIuNywyMi42LDAuNCw1MCwwLjQKCUM3Ny40LDAuNCw5OS43LDIyLjcsOTkuNyw1MC4xeiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDcuOCw3OS41aC03VjM3LjNoLTYuMmMtNy4xLDAtMTIuOCw1LjgtMTIuOCwxMi44YzAsNy4xLDUuOCwxMi44LDEyLjgsMTIuOGgxLjh2N2gtMS44CgljLTEwLjksMC0xOS44LTguOS0xOS44LTE5LjhjMC0xMC45LDguOS0xOS44LDE5LjgtMTkuOGgxMy4yVjc5LjVMNDcuOCw3OS41eiBNNjUuNCw2OS45SDUyLjJWMjAuN2g3VjYzaDYuMgoJYzcuMSwwLDEyLjgtNS44LDEyLjgtMTIuOGMwLTcuMS01LjgtMTIuOC0xMi44LTEyLjhoLTEuOHYtN2gxLjhjMTAuOSwwLDE5LjgsOC45LDE5LjgsMTkuOEM4NS4yLDYxLDc2LjMsNjkuOSw2NS40LDY5LjkiLz4KPC9zdmc+Cg==';
    }

    public getAuthUrl(): string {
        return 'https://appcenter.intuit.com/connect/oauth2';
    }

    public getTokenUrl(): string {
        return 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
    }

    public getFormStack(): FormStack {
        return new FormStack().addForm(
            new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
                .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
                .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)),
        );
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const request = new RequestDto(
            `https://quickbooks.api.intuit.com/v3/company/${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][REALM_ID]}${url}`,
            method,
            dto,
            undefined,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
            },
        );

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['com.intuit.quickbooks.accounting'];
    }

    public async setAuthorizationToken(
        applicationInstall: ApplicationInstall,
        token: Record<string, string>,
    ): Promise<void> {
        await super.setAuthorizationToken(
            applicationInstall.addSettings({ [REALM_ID]: token.realmId }),
            token,
        );
    }

}
