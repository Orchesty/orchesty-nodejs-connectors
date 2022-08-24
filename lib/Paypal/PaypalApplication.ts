import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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
        return 'Paypal description';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
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
        const clientId = appInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_ID];
        const clientSecret = appInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_SECRET];
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
