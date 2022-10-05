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

export const NAME = 'wix';

export default class WixApplication extends AOAuth2Application {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [];
    }

    public getName(): string {
        return NAME;
    }

    public getAuthUrl(): string {
        return 'https://www.wix.com/installer/install';
    }

    public getTokenUrl(): string {
        return 'https://www.wixapis.com/oauth/access';
    }

    public getPublicName(): string {
        return 'Wix';
    }

    public getDescription(): string {
        return 'Simple cloud-based platform for web development';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBkPSJNNjEuNSwzMC43YzAsMiwwLjMsNS4xLTQuNSw2LjhjLTEuNSwwLjUtMi41LDEuNS0yLjUsMS41YzAtNC44LDAuNy02LjYsMi43LTcuNkM1OC43LDMwLjYsNjEuNSwzMC43LDYxLjUsMzAuN3ogTTQzLjQsMzYuMgoJbC01LjMsMjAuN0wzMy42LDQwYy0xLjItNS0zLjItNy42LTcuNS03LjZjLTQuMywwLTYuMywyLjUtNy41LDcuNmwtNC40LDE2LjlMOC43LDM2LjJjLTAuOS00LjItNC45LTYtOC42LTUuNWwxMC4yLDM4LjYKCWMwLDAsMy40LDAuMiw1LjEtMC42YzIuMi0xLjEsMy4zLTIsNC42LTcuM2MxLjItNC43LDQuNS0xOC41LDQuOS0xOS40YzAuNy0yLjMsMS43LTIuMiwyLjQsMGMwLjMsMSwzLjcsMTQuOCw0LjksMTkuNAoJYzEuMyw1LjMsMi40LDYuMSw0LjYsNy4zYzEuNywwLjksNS4xLDAuNiw1LjEsMC42TDUyLDMwLjdDNDguMiwzMC4yLDQ0LjMsMzIuMSw0My40LDM2LjJMNDMuNCwzNi4yeiBNNjEuNCwzN2MwLDAtMC42LDEtMi4xLDEuOAoJYy0wLjksMC41LTEuOCwwLjktMi44LDEuM2MtMi40LDEuMS0yLjEsMi4yLTIuMSw1LjV2MjMuN2MwLDAsMi42LDAuMyw0LjMtMC41YzIuMi0xLjEsMi43LTIuMiwyLjctN1YzOC40bDAsMEw2MS40LDM3TDYxLjQsMzd6CgkgTTg2LjksNTAuMWwxMy0xOS4zYzAsMC01LjUtMC45LTguMiwxLjVjLTIuMSwxLjktMy44LDQuNi04LjQsMTEuM2MtMC4xLDAuMS0xLDEuNi0yLDBjLTQuNi02LjYtNi40LTkuNC04LjQtMTEuMwoJYy0yLjctMi41LTguMi0xLjUtOC4yLTEuNWwxMywxOS4zTDY0LjYsNjkuNGMwLDAsNS43LDAuNyw4LjQtMS43YzEuOC0xLjYsMi43LTMuMiw4LjItMTFjMS4xLTEuNiwyLTAuMSwyLDBjNC42LDYuNiw2LjEsOSw4LjMsMTEKCWMyLjcsMi41LDguMywxLjcsOC4zLDEuN0w4Ni45LDUwLjFMODYuOSw1MC4xeiIvPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://www.wixapis.com/stores/${_url}`, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: this.getAccessToken(applicationInstall),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

}
