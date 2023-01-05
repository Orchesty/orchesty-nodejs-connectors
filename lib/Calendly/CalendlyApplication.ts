import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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

export const NAME = 'calendly';
export default class CalendlyApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Calendly';
    }

    public getDescription(): string {
        return 'Simple scheduling tool for businesses that eliminates email back and forth. It helps save time and increase sales.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImxvZ29zYW5kdHlwZXNfY29tIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiCgkgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOm5vbmU7fQoJLnN0MXtmaWxsOiMwMDZCRkY7fQoJLnN0MntmaWxsOiMwQUU4RjA7fQo8L3N0eWxlPgo8Zz4KCTxnIGlkPSJMYXllcl8zIj4KCQk8cGF0aCBpZD0iTGF5ZXJfMy0yIiBjbGFzcz0ic3QwIiBkPSJNLTUuNC01LjRoMTEwLjd2MTEwLjdILTUuNFYtNS40eiIvPgoJPC9nPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTk2LjgsNTguNmMtMi4xLTEuNS02LjMtMy40LTkuOS00LjZjMC40LTIuMywwLjUtNS4yLTAuMS04LjZoMHYtMC4xaDB2MC4xYzMuNi0wLjYsNy0yLjEsOS45LTQuMwoJCWMyLjgtMi4xLDIuMy00LjUsMS45LTUuOWMtMy41LTExLjMtMTEtMjEuMS0yMS0yNy40Yy0xMC02LjMtMjItOC44LTMzLjgtNy4xQzMyLjIsMi42LDIxLjUsOC41LDEzLjcsMTcuNWMtNy43LDktMTIsMjAuNS0xMiwzMi4zCgkJczQuMywyMy40LDEyLDMyLjNjNy43LDksMTguNSwxNC45LDMwLjIsMTYuN2MxMS43LDEuOCwyMy43LTAuNywzMy44LTcuMWMxMC02LjMsMTcuNS0xNiwyMS0yNy40Qzk5LjEsNjMuMSw5OS43LDYwLjcsOTYuOCw1OC42egoJCSBNOTMuNyw2Mi45QzkwLjUsNzMsODMuOSw4MS43LDc0LjksODcuM2MtOSw1LjYtMTkuNyw3LjktMzAuMSw2LjNjLTEwLjUtMS42LTIwLTYuOS0yNi45LTE0LjlDMTEsNzAuNyw3LjIsNjAuNCw3LjIsNDkuOQoJCVMxMSwyOSwxNy45LDIxYzYuOS04LDE2LjUtMTMuMywyNi45LTE0LjlDNTUuMyw0LjUsNjYsNi44LDc0LjksMTIuNGM5LDUuNiwxNS42LDE0LjMsMTguNywyNC40YzAsMCwwLDAuMSwwLDAuMQoJCWMtMS41LDEuMS01LjEsMi40LTguMiwzLjRsMC0wLjFjLTAuNS0xLjEtMS0yLjItMS42LTMuMmwtNS04LjdjLTIuMy0zLjktNS41LTcuMi05LjQtOS40cy04LjQtMy41LTEyLjktMy41SDQ2LjQKCQljLTQuNSwwLTksMS4yLTEyLjksMy41Yy0zLjksMi4zLTcuMiw1LjUtOS40LDkuNGwtNSw4LjdjLTIuMywzLjktMy41LDguNC0zLjUsMTIuOXMxLjIsOSwzLjUsMTIuOWw1LDguN2MyLjMsMy45LDUuNSw3LjIsOS40LDkuNAoJCWMzLjksMi4zLDguNCwzLjUsMTIuOSwzLjVoMTAuMWM0LjUsMCw5LTEuMiwxMi45LTMuNXM3LjItNS41LDkuNC05LjRsNS04LjdjMC42LTEsMS4xLTIuMSwxLjYtMy4ybDAtMC4xYzAsMCwwLDAsMCwwaDAKCQlDODguNCw1OS45LDkxLjMsNjEuMSw5My43LDYyLjlDOTMuNyw2Mi45LDkzLjcsNjIuOSw5My43LDYyLjl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODUuNSw0MC4zYy0xLjEsMC4yLTIuMywwLjMtMy40LDAuM2MtNy41LDAtMTAuMy0yLjUtMTMuNi01LjRjLTMuMi0yLjgtNy4xLTYuMy0xNC4yLTYuM0g1MAoJCWMtNS4yLDAtOS45LDEuOS0xMy4yLDUuM2MtMy4zLDMuMy01LjEsNy45LTUuMSwxMi44djUuOGMwLDQuOSwxLjgsOS41LDUuMSwxMi44YzMuNCwzLjQsOCw1LjMsMTMuMiw1LjNoNC4zCgkJYzcuMSwwLDExLjEtMy41LDE0LjItNi4zYzMuMy0yLjksNi4xLTUuNCwxMy42LTUuNGMxLjEsMCwyLjMsMC4xLDMuNCwwLjNjMC42LTEuNiwxLjYtNS44LDEuNS01LjVjLTEuNy0wLjItMy4zLTAuMS01LTAuMQoJCWMtMTcuMywwLTE2LjQsMTEuNy0yNy44LDExLjdoLTQuM2MtNy45LDAtMTMtNS42LTEzLTEyLjh2LTUuOGMwLTcuMiw1LjItMTIuOCwxMy0xMi44aDQuM2MxMS40LDAsMTAuNSwxMS43LDI3LjgsMTEuNwoJCWMxLjYsMCwzLjMtMC4xLDQuOS0wLjR2LTAuMUM4Ni42LDQzLjYsODYuMSw0MS45LDg1LjUsNDAuM0w4NS41LDQwLjN6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getAuthUrl(): string {
        return 'https://auth.calendly.com/oauth/authorize';
    }

    public getTokenUrl(): string {
        return 'https://auth.calendly.com/oauth/token';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.calendly.com/${_url}`;
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
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [];
    }

}
