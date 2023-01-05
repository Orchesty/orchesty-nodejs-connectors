import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRjk5MDA7fQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTg2LjUsODIuM2MtNDEuMiwxOS42LTY2LjgsMy4yLTgzLjEtNi44Yy0xLTAuNi0yLjcsMC4xLTEuMiwxLjlDNy42LDg0LDI1LjUsOTkuOSw0OC44LDk5LjkKCQljMjMuMywwLDM3LjItMTIuNywzOS0xNUM4OS41LDgyLjgsODguMyw4MS41LDg2LjUsODIuM0w4Ni41LDgyLjN6IE05OC4xLDc1LjljLTEuMS0xLjQtNi43LTEuNy0xMC4zLTEuM2MtMy41LDAuNC04LjksMi42LTguNCwzLjkKCQljMC4yLDAuNSwwLjcsMC4zLDMuMiwwYzIuNC0wLjIsOS4zLTEuMSwxMC43LDAuOGMxLjQsMS45LTIuMiwxMC44LTIuOCwxMi4zYy0wLjYsMS40LDAuMiwxLjgsMS40LDAuOWMxLjItMSwzLjMtMy40LDQuOC03CgkJQzk4LjEsODEuOSw5OC45LDc3LDk4LjEsNzUuOUw5OC4xLDc1Ljl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTguOCw0Mi4zYzAsNS4xLDAuMSw5LjQtMi41LDE0Yy0yLjEsMy43LTUuNCw2LTkuMSw2Yy01LjEsMC04LTMuOS04LTkuNmMwLTExLjMsMTAuMS0xMy4zLDE5LjYtMTMuM1Y0Mi4zegoJCSBNNzIuMSw3NC40Yy0wLjksMC44LTIuMSwwLjgtMy4xLDAuM2MtNC40LTMuNi01LjItNS4zLTcuNi04LjhjLTcuMiw3LjQtMTIuNCw5LjYtMjEuOCw5LjZjLTExLjEsMC0xOS44LTYuOS0xOS44LTIwLjYKCQljMC0xMC43LDUuOC0xOCwxNC4xLTIxLjZjNy4yLTMuMiwxNy4yLTMuNywyNC44LTQuNnYtMS43YzAtMy4xLDAuMi02LjktMS42LTkuNmMtMS42LTIuNC00LjctMy40LTcuNC0zLjRjLTUsMC05LjUsMi42LTEwLjYsNy45CgkJYy0wLjIsMS4yLTEuMSwyLjQtMi4zLDIuNGwtMTIuOC0xLjRjLTEuMS0wLjItMi4zLTEuMS0yLTIuOGMzLTE1LjUsMTctMjAuMiwyOS41LTIwLjJjNi40LDAsMTQuOCwxLjcsMTkuOSw2LjYKCQljNi40LDYsNS44LDE0LDUuOCwyMi43VjUwYzAsNi4yLDIuNiw4LjksNSwxMi4yYzAuOSwxLjIsMSwyLjYsMCwzLjVDNzkuNiw2OCw3NC44LDcyLjEsNzIuMSw3NC40TDcyLjEsNzQuNCIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTg2LjUsODIuM2MtNDEuMiwxOS42LTY2LjgsMy4yLTgzLjEtNi44Yy0xLTAuNi0yLjcsMC4xLTEuMiwxLjlDNy42LDg0LDI1LjUsOTkuOSw0OC44LDk5LjkKCQljMjMuMywwLDM3LjItMTIuNywzOS0xNUM4OS41LDgyLjgsODguMyw4MS41LDg2LjUsODIuM0w4Ni41LDgyLjN6IE05OC4xLDc1LjljLTEuMS0xLjQtNi43LTEuNy0xMC4zLTEuM2MtMy41LDAuNC04LjksMi42LTguNCwzLjkKCQljMC4yLDAuNSwwLjcsMC4zLDMuMiwwYzIuNC0wLjIsOS4zLTEuMSwxMC43LDAuOGMxLjQsMS45LTIuMiwxMC44LTIuOCwxMi4zYy0wLjYsMS40LDAuMiwxLjgsMS40LDAuOWMxLjItMSwzLjMtMy40LDQuOC03CgkJQzk4LjEsODEuOSw5OC45LDc3LDk4LjEsNzUuOUw5OC4xLDc1Ljl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTguOCw0Mi4zYzAsNS4xLDAuMSw5LjQtMi41LDE0Yy0yLjEsMy43LTUuNCw2LTkuMSw2Yy01LjEsMC04LTMuOS04LTkuNmMwLTExLjMsMTAuMS0xMy4zLDE5LjYtMTMuM1Y0Mi4zegoJCSBNNzIuMSw3NC40Yy0wLjksMC44LTIuMSwwLjgtMy4xLDAuM2MtNC40LTMuNi01LjItNS4zLTcuNi04LjhjLTcuMiw3LjQtMTIuNCw5LjYtMjEuOCw5LjZjLTExLjEsMC0xOS44LTYuOS0xOS44LTIwLjYKCQljMC0xMC43LDUuOC0xOCwxNC4xLTIxLjZjNy4yLTMuMiwxNy4yLTMuNywyNC44LTQuNnYtMS43YzAtMy4xLDAuMi02LjktMS42LTkuNmMtMS42LTIuNC00LjctMy40LTcuNC0zLjRjLTUsMC05LjUsMi42LTEwLjYsNy45CgkJYy0wLjIsMS4yLTEuMSwyLjQtMi4zLDIuNGwtMTIuOC0xLjRjLTEuMS0wLjItMi4zLTEuMS0yLTIuOGMzLTE1LjUsMTctMjAuMiwyOS41LTIwLjJjNi40LDAsMTQuOCwxLjcsMTkuOSw2LjYKCQljNi40LDYsNS44LDE0LDUuOCwyMi43VjUwYzAsNi4yLDIuNiw4LjksNSwxMi4yYzAuOSwxLjIsMSwyLjYsMCwzLjVDNzkuNiw2OCw3NC44LDcyLjEsNzIuMSw3NC40TDcyLjEsNzQuNCIvPgo8L2c+Cjwvc3ZnPgo=';
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
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, SELLINGPARTNERID, ' Selling partner Id', undefined, true))
            .addField(new Field(FieldType.TEXT, DEVELOPERID, 'Developer Id', undefined, true))
            .addField(new Field(FieldType.TEXT, MWSAUTHTOKEN, 'MWS auth token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[SELLINGPARTNERID]
          && authorizationForm?.[DEVELOPERID]
          && authorizationForm?.[MWSAUTHTOKEN];
    }

    private async getAuthorizationCode(appInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        const sId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SELLINGPARTNERID];
        const dId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][DEVELOPERID];
        const token = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][MWSAUTHTOKEN];
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
