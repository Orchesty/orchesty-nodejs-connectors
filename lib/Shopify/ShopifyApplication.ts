import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import { Mixin } from 'ts-mixer';
import ABaseShopify, { SHOPIFY_URL } from './ABaseShopify';

const PREMIUM_PLAN = 'premium';

export default class ShopifyApplication extends Mixin(AOAuth2Application, ABaseShopify) {

    public constructor(protected readonly curlSender: CurlSender, provider: OAuth2Provider) {
        super(provider);
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return super.isAuthorized(applicationInstall)
      && authorizationForm?.[CLIENT_ID]
      && authorizationForm?.[CLIENT_SECRET]
      && authorizationForm?.[SHOPIFY_URL]
      && authorizationForm?.[PREMIUM_PLAN] !== undefined;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true))
            .addField(new Field(FieldType.TEXT, SHOPIFY_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    // This URL is dynamically replaced in getProviderCustomOptions method
    public getAuthUrl(): string {
        return 'https://xyz.myshopify.com/admin/oauth/authorize';
    }

    // This URL is dynamically replaced in getProviderCustomOptions method
    public getTokenUrl(): string {
        return 'https://xyz.myshopify.com/admin/oauth/access_token';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'read_assigned_fulfillment_orders',
            'read_assigned_fulfillment_orders',
            'read_fulfillments',
            'read_locations',
            'read_merchant_managed_fulfillment_orders',
            'read_orders',
            'read_products',
            'read_shipping',
            'read_third_party_fulfillment_orders',
            'write_assigned_fulfillment_orders',
            'write_assigned_fulfillment_orders',
            'write_fulfillments',
            'write_merchant_managed_fulfillment_orders',
            'write_orders',
            'write_products',
            'write_shipping',
            'write_third_party_fulfillment_orders',
        ];
    }

    public async setAuthorizationToken(
        applicationInstall: ApplicationInstall,
        token: Record<string, string>,
    ): Promise<void> {
        await super.setAuthorizationToken(applicationInstall, token);
        await this.checkShopPlan(applicationInstall);
    }

    protected getProviderCustomOptions(applicationInstall: ApplicationInstall): Record<string, unknown> {
        const url = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SHOPIFY_URL];
        const authorizeUrl = new URL(`${url}/admin/oauth/authorize`);
        const tokenUrl = new URL(`${url}/admin/oauth/access_token`);

        return {
            auth: {
                authorizeHost: authorizeUrl.origin,
                authorizePath: authorizeUrl.pathname,
                tokenHost: tokenUrl.origin,
                tokenPath: tokenUrl.pathname,
            },
            options: {
                authorizationMethod: 'body',
            },
        };
    }

}
