import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const SELLINGPARTNERID = 'selling_partner_id';
export const DEVELOPERID = 'developer_id';
export const MWSAUTHTOKEN = 'mws_auth_token';

export const BASE_URL = 'https://sellingpartnerapi-na.amazon.com';
export const NAME = 'amazon';

export default class AmazonApplication extends ABasicApplication {

    public constructor(private readonly sender: CurlSender) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Amazon';
    }

    public getDescription(): string {
        return 'The largest online retailer in the world';
    }

    public getLogo(): string {
        return 'data:image/png;base64,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';
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
            [CommonHeaders.AUTHORIZATION]: await this.getAuthorizationCode(applicationInstall, dto),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, SELLINGPARTNERID, ' Selling partner Id', undefined, true))
            .addField(new Field(FieldType.TEXT, DEVELOPERID, 'Developer Id', undefined, true))
            .addField(new Field(FieldType.TEXT, MWSAUTHTOKEN, 'MWS auth token', undefined, true));

        return new FormStack().addForm(form);
    }

    private async getAuthorizationCode(appInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        const sId = appInstall.getSettings()[AUTHORIZATION_FORM][SELLINGPARTNERID];
        const dId = appInstall.getSettings()[AUTHORIZATION_FORM][DEVELOPERID];
        const token = appInstall.getSettings()[AUTHORIZATION_FORM][MWSAUTHTOKEN];
        const req = new RequestDto(
            `${BASE_URL}/authorization/v1/authorizationCode?sellingPartnerId=${sId}&developerId=${dId}&mwsAuthToken=${token}`,
            HttpMethods.GET,
            dto,
        );

        const resp = await this.sender.send<ITokenResponse>(req);

        return resp.getJsonBody().payload.authorizationCode;
    }

}

interface ITokenResponse {
    payload: {
        authorizationCode: string;
    };
}
