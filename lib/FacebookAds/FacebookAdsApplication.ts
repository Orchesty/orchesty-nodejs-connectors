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
import { BodyInit, Headers } from 'node-fetch';

const BASE_URL = 'https://graph.facebook.com/';

export default class FacebookAdsApplication extends AOAuth2Application {

    public getName(): string {
        return 'facebook-ads';
    }

    public getPublicName(): string {
        return 'Facebook Ads';
    }

    public getDescription(): string {
        return 'Facebook lead ads make signing up for business information easy for people and more valuable for businesses. The Facebook lead ad app is useful for marketers who want to automate actions on their leads.';
    }

    public getAuthUrl(): string {
        return 'https://www.facebook.com/v12.0/dialog/oauth';
    }

    public getTokenUrl(): string {
        return 'https://graph.facebook.com/v12.0/oauth/access_token';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMTg3N0YyO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE1MCw3NS41YzAtNDEuNC0zMy42LTc1LTc1LTc1QzMzLjYsMC41LDAsMzQsMCw3NS41YzAsMzcuNCwyNy40LDY4LjUsNjMuMyw3NC4xVjk3LjFoLTE5Vjc1LjVoMTlWNTguOQoJYzAtMTguOCwxMS4yLTI5LjIsMjguMy0yOS4yYzguMiwwLDE2LjgsMS41LDE2LjgsMS41djE4LjVoLTkuNWMtOS4zLDAtMTIuMiw1LjgtMTIuMiwxMS43djE0LjFoMjAuOGwtMy4zLDIxLjdIODYuN3Y1Mi40CglDMTIyLjYsMTQzLjksMTUwLDExMi45LDE1MCw3NS41Ii8+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const headers = new Headers({
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        });
        return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['email', 'ads_management', 'ads_read'];
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
    }

}
