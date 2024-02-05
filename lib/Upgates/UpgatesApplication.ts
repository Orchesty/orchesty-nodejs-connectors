import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'upgates';

export const UPGATES_URL = 'upgatesUrl';

export default class UpgatesApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Customizable e-shop solution that you can tailor to your needs and ideas';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Upgates';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGOUEwM0I7fQoJLnN0MXtmaWxsOiNGOUEwM0I7fQo8L3N0eWxlPgo8ZyBpZD0iU3ltYm9sIj4KCTxwYXRoIGlkPSJQYXRoIiBjbGFzcz0ic3QwIiBkPSJNNDEuNCw1OC4zaDE2LjZ2MTIuNGMwLDE2LjEtMTMsMjkuMS0yOS4xLDI5LjFjLTE2LjEsMC0yOS4xLTEzLTI5LjEtMjkuMXYtNTRoMTYuNnY1NAoJCWMwLDYuOSw1LjYsMTIuNCwxMi40LDEyLjRjNi45LDAsMTIuNC01LjYsMTIuNC0xMi40VjU4LjN6Ii8+Cgk8cGF0aCBpZD0iUGF0aC0yIiBjbGFzcz0ic3QwIiBkPSJNNTguMSw1OC4zVjQxLjdoMTIuNGM2LjksMC4xLDEyLjUtNS41LDEyLjYtMTIuNGMwLjEtNi45LTUuNS0xMi41LTEyLjQtMTIuNkgxNi41VjAuMkg3MQoJCWMxNi4xLDAsMjkuMSwxMywyOS4xLDI5LjFjMCwxNi4xLTEzLDI5LjEtMjkuMSwyOS4xYzAsMCwwLDAsMCwwSDU4LjF6Ii8+Cgk8cGF0aCBpZD0iVE0iIGNsYXNzPSJzdDEiIGQ9Ik04OC4xLDk0Ljl2LTUuMmgydi0xLjRoLTUuNXYxLjRoMnY1LjJIODguMXogTTkyLjIsOTQuOXYtNC40bDEuOCw0LjRoMS4ybDEuOC00LjR2NC40aDEuNXYtNi43aC0yCgkJbC0xLjgsNC41bC0xLjgtNC41aC0xLjl2Ni43SDkyLjJ6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: string,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const base64 = encode(
            `${settings[CoreFormsEnum.AUTHORIZATION_FORM][USER]?.trim()}:${settings[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD]?.trim()}`,
        );
        const headers = {
            [CommonHeaders.AUTHORIZATION]: `Basic ${base64}`,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        };

        let urlx = url ?? '';
        if (!urlx.startsWith('http')) {
            urlx = `${this.getDecoratedUrl(applicationInstall)}/${urlx}`;
        }

        return new RequestDto(urlx, parseHttpMethod(method), dto, data, headers);
    }

    public getDecoratedUrl(app: ApplicationInstall): string {
        const url = app.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[UPGATES_URL] ?? '';

        return url.replace('api/v2', '');
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, USER, 'Login', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'Klíč API', undefined, true))
            .addField(new Field(FieldType.URL, UPGATES_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[USER] && authorizationForm?.[PASSWORD] && authorizationForm?.[UPGATES_URL];
    }

    public getIsoDateFromDate(date?: string): string {
        return date ? new Date(date).toISOString().split('.')[0] : '';
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

}
