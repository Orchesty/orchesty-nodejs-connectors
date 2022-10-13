import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'authentica';
export const BASE_URL = 'https://app.authentica.cz/api';
const AUTHENTICA_SHOP_ID = 'authentica-shop-id';
const CACHE_KEY = 'authentica_cache_key';
const LOCK_KEY = 'authentica_lock_key';

export default class AuthenticaApplication extends ABasicApplication {

    public constructor(private readonly cacheService: CacheService) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Fulfillment by Authentica';
    }

    public getDescription(): string {
        return 'Simple solution for outsourcing logistics. In a few simple steps, connect your current e-commerce or accounting solution for automated order processing';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxRDFEMUI7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02LjQsMzguNkw3LDM3SDB2MTEuNWgxLjl2LTQuN2gyLjhsMC42LTEuN0gxLjl2LTMuNUg2LjR6IE0xNi44LDQzLjh2LTYuOGgtMS45djYuOGMwLDIuMi0wLjgsMy4xLTIuNCwzLjEKCQlzLTIuNC0wLjktMi40LTMuMXYtNi44SDguM3Y2LjhjMCwzLjQsMS43LDQuOCw0LjMsNC44UzE2LjgsNDcuMSwxNi44LDQzLjggTTE5LjQsNDguNEgyNnYtMS43aC00Ljd2LTkuOGgtMS45TDE5LjQsNDguNHogTTM0LDM4LjYKCQlsMC42LTEuN2gtN3YxMS41aDEuOXYtNC43aDIuOGwwLjYtMS43aC0zLjR2LTMuNUgzNHogTTM2LjIsNDguNGgxLjlWMzYuOWgtMS45VjQ4LjR6IE00MS4zLDQ4LjRINDh2LTEuN2gtNC43di05LjhoLTEuOVY0OC40egoJCSBNNDkuNiw0OC40aDYuNnYtMS43aC00Ljd2LTkuOGgtMS45VjQ4LjR6IE02Ni4zLDQ4LjRoMS45VjM2LjloLTEuOGwtMy4zLDYuNmwtMy4zLTYuNmgtMS44djExLjVoMS45di03LjZsMi42LDUuNGgxLjRsMi42LTUuNQoJCUw2Ni4zLDQ4LjR6IE03MS4yLDQ4LjRoN3YtMS43aC01LjF2LTMuNWg0LjZ2LTEuN2gtNC42di0zaDUuMVYzN2gtN1Y0OC40eiBNODcuOCw0OC40aDEuN1YzNi45aC0xLjl2Ny45bC00LjctNy45aC0xLjd2MTEuNWgxLjkKCQl2LTcuOEw4Ny44LDQ4LjR6IE0xMDAsMzguNlYzN2gtOC41djEuN2gzLjN2OS44aDEuOXYtOS44SDEwMHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ny45LDU1LjlsMC40LDEuM2gtMC45TDY3LjksNTUuOXogTTY3LjEsNTguNGwwLjItMC43aDEuMmwwLjIsMC43aDAuNmwtMS4xLTMuMmgtMC41bC0xLjEsMy4ySDY3LjF6CgkJIE02NS45LDU2LjJjMC0wLjYtMC42LTEuMS0xLjItMWMtMC43LDAtMS4yLDAuNC0xLjIsMS40VjU3YzAsMSwwLjUsMS40LDEuMiwxLjRjMC42LDAsMS4xLTAuNCwxLjItMWMwLDAsMCwwLDAtMC4xaC0wLjUKCQljMCwwLjMtMC4zLDAuNi0wLjYsMC42Yy0wLjQsMC0wLjctMC4zLTAuNy0xdi0wLjRjMC0wLjcsMC4yLTEsMC43LTFjMC4zLDAsMC42LDAuMiwwLjYsMC42TDY1LjksNTYuMnogTTYyLjQsNTUuMmgtMC42djMuMmgwLjYKCQlWNTUuMnogTTU4LjYsNTUuMnYwLjVoMC45djIuN2gwLjZ2LTIuN0g2MXYtMC41TDU4LjYsNTUuMnogTTU3LjIsNTUuMnYyLjJsLTEuMy0yLjJoLTAuNXYzLjJINTZ2LTIuMmwxLjMsMi4yaDAuNXYtMy4yTDU3LjIsNTUuMnoKCQkgTTUyLjUsNTUuMnYzLjJoMnYtMC41SDUzdi0xaDEuM3YtMC41SDUzdi0wLjhoMS40di0wLjVMNTIuNSw1NS4yeiBNNDkuNiw1NS4ySDQ5djMuMmgwLjZ2LTEuNGgxLjJ2MS40aDAuNnYtMy4yaC0wLjZ2MS4zaC0xLjIKCQlWNTUuMnogTTQ1LjgsNTUuMnYwLjVoMC45djIuN2gwLjZ2LTIuN2gwLjl2LTAuNUw0NS44LDU1LjJ6IE00NC40LDU1LjJ2MS45YzAsMC42LTAuMiwwLjktMC43LDAuOWMtMC40LDAtMC43LTAuMy0wLjctMC45di0xLjkKCQloLTAuNnYxLjljMCwwLjksMC41LDEuMywxLjIsMS4zYzAuNywwLDEuMi0wLjQsMS4yLTEuM3YtMS45TDQ0LjQsNTUuMnogTTQwLjMsNTUuOWwwLjQsMS4zaC0wLjlMNDAuMyw1NS45eiBNMzkuNiw1OC40bDAuMi0wLjcKCQloMS4ybDAuMiwwLjdoMC42bC0xLjEtMy4yaC0wLjVMMzksNTguNEgzOS42eiBNMzMuOCw1NS4ybDEsMS45djEuM2gwLjZWNTdsMS0xLjloLTAuNkwzNSw1Ni41bC0wLjYtMS4zSDMzLjh6IE0zMS4zLDU1LjZoMC41CgkJYzAuNSwwLDAuNiwwLjEsMC42LDAuNHMtMC4yLDAuNC0wLjYsMC40aC0wLjZMMzEuMyw1NS42eiBNMzEuMyw1Ni45aDAuNWMwLjUsMCwwLjcsMC4xLDAuNywwLjVjMCwwLjMtMC4yLDAuNS0wLjYsMC41aC0wLjYKCQlMMzEuMyw1Ni45eiBNMzAuOCw1NS4ydjMuMmgxLjFjMC44LDAsMS4xLTAuNCwxLjEtMC45YzAtMC40LTAuMi0wLjctMC42LTAuOGMwLjMtMC4xLDAuNS0wLjQsMC41LTAuN2MwLTAuNi0wLjQtMC44LTEuMS0wLjgKCQlMMzAuOCw1NS4yeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const settingsForm = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Settings');
        const clientId = new Field(FieldType.TEXT, CLIENT_ID, 'Client id');
        const clientSecret = new Field(FieldType.PASSWORD, CLIENT_SECRET, 'Client secret');

        settingsForm.addField(clientId).addField(clientSecret);
        return new FormStack().addForm(settingsForm);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    public async getRequestDto(
        dto: ProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [AUTHENTICA_SHOP_ID]: applicationInstall.getUser(),
            [CommonHeaders.AUTHORIZATION]: await this.getAccessToken(dto, applicationInstall),
        };

        const req = new RequestDto(`${BASE_URL}/applinth/${url}`, method, dto);
        req.setHeaders(headers);

        if (data) {
            req.setJsonBody(data);
        }

        return req;
    }

    protected async getAccessToken(processDto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
        const url = `${BASE_URL}/token`;

        const clientId = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_ID];
        const clientSecret = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_SECRET];

        const request = new RequestDto(
            url,
            HttpMethods.POST,
            processDto,
            `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scopes=default applinth`,
            {
                [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
            },
        );

        const storedAccessToken = await this.cacheService.entryWithLock<IAccessToken>(
            CACHE_KEY,
            LOCK_KEY,
            request,
            this.accessCallBack.bind(this),
        );

        return `Bearer ${storedAccessToken.access_token}`;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async accessCallBack(res: ResponseDto): Promise<ICacheCallback<IAccessToken>> {
        const token = res.getJsonBody() as IAccessToken;
        return {
            dataToStore: token,
            expire: token.expires_in,
        };
    }

}

interface IAccessToken {
    expires_in: number;
    access_token: string;
}
