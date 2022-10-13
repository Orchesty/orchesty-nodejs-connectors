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
import { Headers } from 'node-fetch';

const BASE_URL = 'https://api.bigcommerce.com/stores';
export const STORE_HASH = 'store_hash';
export const NAME = 'bigcommerce';

export default class BigcommerceApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'BigCommerce';
    }

    public getDescription(): string {
        return 'E-commerce platform that provides an all-encompassing solution for a business online store';
    }

    public getAuthUrl(): string {
        return 'https://login.bigcommerce.com/oauth2/authorize';
    }

    public getTokenUrl(): string {
        return 'https://login.bigcommerce.com/oauth2/token';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxhYWdfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDEwMCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMzQzMTNGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTIuNyw1Ni45aDEyLjZjMy42LDAsNS44LTIsNS44LTUuMWMwLTMtMi4zLTUuMS01LjgtNS4xSDUyLjdjLTAuNCwwLTAuOCwwLjQtMC44LDAuN3Y4LjgKCQlDNTIsNTYuNiw1Mi4zLDU2LjksNTIuNyw1Ni45eiBNNTIuNyw3Ny4zaDEzYzQsMCw2LjQtMiw2LjQtNS42YzAtMy4xLTIuMy01LjYtNi40LTUuNmgtMTNjLTAuNCwwLTAuOCwwLjQtMC44LDAuN3Y5LjcKCQlDNTIsNzcsNTIuMyw3Ny4zLDUyLjcsNzcuM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05OC44LDAuM0w2MS41LDM3LjVoNi4xYzkuNSwwLDE1LjEsNiwxNS4xLDEyLjVjMCw1LjEtMy41LDguOS03LjIsMTAuNmMtMC42LDAuMi0wLjYsMS4xLDAuMSwxLjMKCQljNC4zLDEuNyw3LjMsNi4xLDcuMywxMS40YzAsNy40LTUsMTMuMy0xNC42LDEzLjNINDJjLTAuNCwwLTAuOC0wLjQtMC44LTAuN1Y1Ny43TDAuMyw5OC40Yy0wLjUsMC41LTAuMiwxLjUsMC42LDEuNWg5OC4zCgkJYzAuNCwwLDAuNy0wLjMsMC43LTAuN1YwLjlDMTAwLjEsMC4yLDk5LjItMC4yLDk4LjgsMC4zeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const url = `${BASE_URL}/${_url}`;
        const req = new RequestDto(url, method, dto);
        req.setHeaders(new Headers({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `OAuth ${this.getAccessToken(applicationInstall)}`,
        }));

        if (data) {
            req.setJsonBody(data);
        }
        return req;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true))
            .addField(new Field(FieldType.TEXT, STORE_HASH, 'Store hash', null, true));

        return new FormStack()
            .addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET] && authorizationForm?.[STORE_HASH];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['store_v2_products'];
    }

}
