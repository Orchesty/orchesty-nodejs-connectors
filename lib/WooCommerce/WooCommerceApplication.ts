import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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
import { BodyInit } from 'node-fetch';

export const WOOCOMMERCE_URL = 'woocommerceUrl';

export const NAME = 'woocommerce';

export default class WooCommerceApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Open-source e-commerce plugin for WordPress, designed for small to large-sized online merchants';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'WooCommerce';
    }

    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: BodyInit,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const base64 = encode(
            `${settings[AUTHORIZATION_FORM][USER]}:${settings[AUTHORIZATION_FORM][PASSWORD]}`,
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

    public getIsoDateFromDate(date?: string): string {
        return date ? new Date(date).toISOString() : '';
    }

    public getDecoratedUrl(app: ApplicationInstall): string {
        return app
            .getSettings()?.[AUTHORIZATION_FORM]?.[WOOCOMMERCE_URL] ?? '';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true))
            .addField(new Field(FieldType.URL, WOOCOMMERCE_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[USER] && authorizationForm?.[PASSWORD] && authorizationForm?.[WOOCOMMERCE_URL];
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

}
