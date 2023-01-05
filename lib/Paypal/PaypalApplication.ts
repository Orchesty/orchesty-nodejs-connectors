import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const BASE_URL = 'https://api-m.paypal.com';

export const NAME = 'paypal';
export default class PaypalApplication extends ABasicApplication {

    public constructor(private readonly sender: CurlSender) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Paypal';
    }

    public getDescription(): string {
        return 'One of the most used payment methods for secure online payments and also a wallet';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDJDOEE7fQoJLnN0MXtmaWxsOiMwMDlCRTE7fQoJLnN0MntmaWxsOiMwMDFGNkI7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04MywzMC43TDI5LjQsODkuMkg5LjhjLTEuNCwwLTIuNS0xLjQtMi4yLTIuN2wxMy4xLTgzYzAuMy0xLjksMS45LTMuMywzLjgtMy4zaDMzLjMKCQlDODAuOCwxLDg3LjEsMTIuNyw4MywzMC43TDgzLDMwLjd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNODMuOSwyNS4zYzguMiw0LjQsMTAuMSwxMi42LDcuNCwyMy41Qzg3LjcsNjQuOSw3Ny4xLDcxLjcsNjEuNSw3MmwtNC40LDAuM2MtMS42LDAtMi43LDEuMS0zLDIuN2wtMy42LDIxLjYKCQljLTAuMywxLjktMS45LDMuMy0zLjgsMy4zSDMwLjRjLTEuNCwwLTIuNS0xLjQtMi4yLTIuN2w2LTM5LjFDMzQuNSw1Ni43LDgzLjksMjUuMyw4My45LDI1LjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzMuOSw2MGw1LjUtMzQuN2MwLjQtMS43LDEuOC0yLjksMy42LTNoMjYuMmM2LjMsMCwxMC45LDEuMSwxNC43LDNjLTEuNCwxMi03LjEsMzEuNC0zNSwzMmgtMTIKCQlDMzUuNSw1Ny4yLDM0LjIsNTguMywzMy45LDYweiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const url = `${BASE_URL}/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${await this.getAuthorizationCode(applicationInstall, dto)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    private async getAuthorizationCode(appInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        const clientId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_ID];
        const clientSecret = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_SECRET];
        const req = new RequestDto(
            `${BASE_URL}/v1/oauth2/token`,
            HttpMethods.POST,
            dto,
            'grant_type=client_credentials',
            {
                [CommonHeaders.AUTHORIZATION]: encode(`${clientId}:${clientSecret}`),
                [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
            },
        );

        const resp = await this.sender.send<ITokenResponse>(req);

        return resp.getJsonBody().access_token;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface ITokenResponse {
    scope: string;
    access_token: string;
    token_type: string;
    app_id: string;
    expires_in: number;
    nonce: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
