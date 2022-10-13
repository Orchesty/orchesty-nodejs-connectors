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

export const NAME = 'one-drive';
export const TOKEN = 'token';

export default class OneDriveApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'OneDrive';
    }

    public getDescription(): string {
        return 'Microsoft cloud service that connects you to all your files. It lets you store and protect your files, share them with others, and get to them from anywhere on all your devices';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMzY0Qjg7fQoJLnN0MXtmaWxsOiMwMDc4RDQ7fQoJLnN0MntmaWxsOiMxNDkwREY7fQoJLnN0M3tmaWxsOiMyOEE4RUE7fQo8L3N0eWxlPgo8ZyBpZD0iU1RZTEVfQ09MT1IiPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM4LjIsMzUuOEwzOC4yLDM1LjhsMjAuOSwxMi41bDEyLjUtNS4ybDAsMGMyLjUtMS4xLDUuMy0xLjcsOC0xLjdjMC41LDAsMC45LDAsMS40LDAuMQoJCWMtNC4zLTE2LjYtMjEuMi0yNi43LTM3LjktMjIuNGMtNy41LDEuOS0xNCw2LjYtMTguMywxM2MwLjEsMCwwLjIsMCwwLjMsMEMyOS43LDMyLjEsMzQuMywzMy40LDM4LjIsMzUuOHoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zOC4yLDM1LjhMMzguMiwzNS44Yy0zLjktMi40LTguNS0zLjctMTMuMS0zLjdjLTAuMSwwLTAuMiwwLTAuMywwQzExLjEsMzIuMywwLjEsNDMuNiwwLjIsNTcuMwoJCWMwLjEsNSwxLjYsOS44LDQuNSwxMy45bDE4LjQtNy44bDguMi0zLjRsMTguMi03LjdsOS41LTRMMzguMiwzNS44eiIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTgwLjksNDEuNWMtMC41LDAtMC45LTAuMS0xLjQtMC4xYy0yLjgsMC01LjUsMC42LTgsMS43bDAsMGwtMTIuNSw1LjJsMy42LDIuMmwxMS44LDcuMWw1LjIsMy4xbDE3LjcsMTAuNgoJCWM1LjMtOS44LDEuNi0yMi4xLTguMi0yNy40Qzg2LjYsNDIuNSw4My44LDQxLjcsODAuOSw0MS41eiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTc5LjcsNjAuN2wtNS4yLTMuMWwtMTEuOC03LjFsLTMuNi0yLjJsLTkuNSw0TDMxLjMsNjBsLTguMiwzLjRMNC43LDcxLjJDOS4zLDc3LjksMTcsODEuOSwyNS4xLDgxLjloNTQuNAoJCWM3LjQsMCwxNC4zLTQuMSwxNy44LTEwLjZMNzkuNyw2MC43eiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client secret', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const token = settings[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN];
        const url = `https://graph.microsoft.com/v1.0/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getAuthUrl(): string {
        return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['Files.ReadWrite'];
    }

    public getTokenUrl(): string {
        return 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    }

}
