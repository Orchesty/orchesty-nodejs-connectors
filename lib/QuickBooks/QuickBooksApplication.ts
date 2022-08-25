import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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
        return 'Popular business accounting software that can be accessed at any time from a web browser.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGNpcmNsZSBmaWxsPSIjMzFBMjM5IiBjeD0iNzUiIGN5PSI3NSIgcj0iNzUiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNzIuMDMsNDguNzg2YzAsMjQuOTQyLDAsNDkuODgzLDAsNzQuNzUxYy04LjExLDAuNzUyLTExLjkyNi0yLjU5My0xMi4wMTktMTAuNTI3DQoJCWMtMC4xODItMTUuNTA5LTAuMDU2LTMxLjAyMi0wLjA1Ny00Ni41MzNjMC0yLjgzMywwLTUuNjY3LDAtOC40MTRjLTE3LjMyMy0xLjgwMS0yNi40MzQsMy4zMjItMjcuNjg4LDE1LjE1DQoJCWMtMS4yNiwxMS44ODMsNS43ODgsMTguNjg0LDIyLjA0NCwyMC45MzRjMCwzLjAxMSwwLDYuMDg2LDAsOS4yYy0xMS43NDYsNC43MDUtMjguODIyLTQuNzM1LTMyLjg5LTE5LjY5Mw0KCQljLTQuMjEyLTE1LjQ4OCw0LjUxOS0zMy4wNDMsMjAuMzQ2LTM2LjI5OGM5LjMyOS0xLjkxOSwxOS4yODUtMC43ODYsMjkuNDc3LTAuMjExQzcxLjg1LDQ4LjIzMiw3MS45NCw0OC41MDksNzIuMDMsNDguNzg2eiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik05MS4xMzYsOTEuODUzYzUuMzczLDUuMzczLDE1Ljg2MiwyLjE4OCwyMS42NDEtMy45NDhjNC44MTktNS4xMTcsNy43MjEtMTEuNjgsNC4yNjYtMTkuMzM2DQoJCWMtMy42MjYtOC4wMzQtMTAuOTk1LTExLjk1Ni0yMC43NDUtMTAuMjU4YzAtMy45NTgsMC03Ljg2MiwwLTExLjcwMmMxNi4xNDEtMi4yNTMsMzAuMzY2LDgsMzIuODg4LDIzLjMxNg0KCQljMi42OTksMTYuMzkzLTcuMDE5LDMxLjE5Ni0yMi42ODIsMzQuMDIyYy02Ljk3NiwxLjI1OS0xNC4wODUsMS43NzQtMjEuMTMyLDIuNjQ0Yy00LjMyOCwwLjUzNC02LjM1OC0xLjE5LTYuMzQ1LTUuNzEyDQoJCWMwLjA3Ni0yNC42NzQsMC4wMzYtNDkuMzQ5LDAuMDM2LTc0LjUxOWM4LjkwMywwLjQ4LDExLjUxOSw1LjY4MSwxMS41NDUsMTMuMDcxYzAuMDU3LDE2LjM2NSwwLjA1NywzMi43MywwLjE0NCw1MC4zMjkNCgkJQzkwLjk2NCw5MS4zNTcsOTEuMTM2LDkxLjg1Myw5MS4xMzYsOTEuODUzeiIvPg0KCTxwYXRoIGZpbGw9IiMxRjlEMjkiIGQ9Ik05MS40MjQsOTEuNjgzYy0wLjM5NS0wLjExNy0wLjUwMS0wLjQwNC0wLjQ5LTEuMTM0QzkxLjI3Miw5MC41NzUsOTEuNDkyLDkxLjA0NSw5MS40MjQsOTEuNjgzeiIvPg0KCTxwYXRoIGZpbGw9IiMxRjlEMjkiIGQ9Ik03Mi4zMjksNDguNjJjLTAuMzktMC4xMTEtMC40OC0wLjM4Ny0wLjQ5NC0xLjA5NEM3Mi4xNSw0Ny41NDksNzIuMzg5LDQ4LjAwMSw3Mi4zMjksNDguNjJ6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==';
    }

    public getAuthUrl(): string {
        return 'https://appcenter.intuit.com/connect/oauth2';
    }

    public getTokenUrl(): string {
        return 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
    }

    public getFormStack(): FormStack {
        return new FormStack().addForm(
            new Form(AUTHORIZATION_FORM, 'Authorization settings')
                .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
                .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true)),
        );
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const request = new RequestDto(
            `https://quickbooks.api.intuit.com/v3/company/${applicationInstall.getSettings()[AUTHORIZATION_FORM][REALM_ID]}${url}`,
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
