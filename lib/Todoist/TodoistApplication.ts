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

export const NAME = 'todoist';
export default class TodoistApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Todoist';
    }

    public getDescription(): string {
        return 'A to-do list and task manager for professionals and small businesses. Combining tasks, projects, comments, attachments, notifications, and more';
    }

    public getAuthUrl(): string {
        return 'https://todoist.com/oauth/authorize';
    }

    public getTokenUrl(): string {
        return 'https://todoist.com/oauth/access_token';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFNDQzMzI7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04Ny40LDAuMkgxMi42QzUuOCwwLjMsMC4yLDUuOCwwLjIsMTIuN3Y3NC42YzAsNi44LDUuNiwxMi40LDEyLjUsMTIuNGg3NC43YzYuOSwwLDEyLjUtNS42LDEyLjUtMTIuNFYxMi43CgkJQzk5LjgsNS44LDk0LjIsMC4yLDg3LjQsMC4yIi8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjEuMyw0Ny40YzEuNy0xLDM5LjItMjIuOCw0MC0yMy4zYzAuOS0wLjUsMC45LTItMC4xLTIuNmMtMS0wLjYtMi44LTEuNi0zLjUtMmMtMS0wLjUtMi4xLTAuNS0zLjEsMAoJCUM1NC4yLDE5LjksMjIuMywzOC40LDIxLjIsMzljLTEuMywwLjctMi45LDAuNy00LjEsMEwwLjIsMjkuMXY4LjRDNC4zLDQwLDE0LjUsNDYsMTcsNDcuNEMxOC41LDQ4LjIsMTkuOSw0OC4yLDIxLjMsNDcuNCIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIxLjMsNjMuM2MxLjctMSwzOS4yLTIyLjgsNDAtMjMuM2MwLjktMC41LDAuOS0yLTAuMS0yLjZjLTEtMC42LTIuOC0xLjYtMy41LTJjLTEtMC41LTIuMS0wLjUtMy4xLDAKCQlDNTQuMiwzNS44LDIyLjMsNTQuMywyMS4yLDU1Yy0xLjMsMC43LTIuOSwwLjctNC4xLDBMMC4yLDQ1djguNGM0LjEsMi40LDE0LjMsOC40LDE2LjgsOS44QzE4LjUsNjQuMiwxOS45LDY0LjEsMjEuMyw2My4zIi8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjEuMyw4MC4yYzEuNy0xLDM5LjItMjIuOCw0MC0yMy4zYzAuOS0wLjUsMC45LTItMC4xLTIuNmMtMS0wLjYtMi44LTEuNi0zLjUtMmMtMS0wLjUtMi4xLTAuNS0zLjEsMAoJCWMtMC41LDAuMy0zMi40LDE4LjgtMzMuNSwxOS41Yy0xLjMsMC43LTIuOSwwLjctNC4xLDBMMC4yLDYydjguNGM0LjEsMi40LDE0LjMsOC40LDE2LjgsOS44QzE4LjUsODEuMSwxOS45LDgxLjEsMjEuMyw4MC4yIi8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.todoist.com/rest/v1/${uri}`;
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
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack()
            .addForm(form);
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
