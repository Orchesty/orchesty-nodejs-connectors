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
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'shopify';
export const API_VERSION = '2023-01';

const API_KEY_HEADER = 'X-Shopify-Access-Token';
const PREMIUM_PLAN = 'premium';
const SHOP_INFO_URL = `admin/api/${API_VERSION}/shop.json`;
export const SHOPIFY_URL = 'shopifyUrl';

export default class ShopifyApplication extends AOAuth2Application {

    public constructor(protected readonly curlSender: CurlSender, provider: OAuth2Provider) {
        super(provider);
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

    public getDescription(): string {
        return 'Simple way to create an online store to list products, collect credit card payments, and ship your goods';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Shopify';
    }

    public getLogo(): string | null {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM5NUJGNDY7fQoJLnN0MXtmaWxsOiM1RThFM0U7fQoJLnN0MntmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04Mi45LDE5LjZjLTAuMS0wLjUtMC41LTAuOC0wLjktMC44Yy0wLjQsMC04LTAuNi04LTAuNnMtNS4zLTUuMy01LjktNS45Yy0wLjYtMC42LTEuNy0wLjQtMi4yLTAuMwoJCWMtMC4xLDAtMS4yLDAuNC0zLDAuOWMtMS44LTUuMS00LjktOS44LTEwLjQtOS44Yy0wLjIsMC0wLjMsMC0wLjUsMGMtMS42LTIuMS0zLjUtMy01LjItM2MtMTIuOCwwLTE5LDE2LTIwLjksMjQuMgoJCWMtNSwxLjUtOC41LDIuNi05LDIuOGMtMi44LDAuOS0yLjksMS0zLjIsMy42Yy0wLjMsMi03LjYsNTguMy03LjYsNTguM0w2Myw5OS44bDMwLjgtNi43QzkzLjgsOTMuMSw4MywyMC4xLDgyLjksMTkuNkw4Mi45LDE5LjZ6CgkJIE01OS44LDE0TDU1LDE1LjRjMC0wLjMsMC0wLjcsMC0xYzAtMy4yLTAuNC01LjctMS4xLTcuOEM1Ni43LDcsNTguNiwxMC4yLDU5LjgsMTR6IE01MC40LDcuM2MwLjgsMiwxLjMsNC44LDEuMyw4LjYKCQljMCwwLjIsMCwwLjQsMCwwLjZjLTMuMSwxLTYuNSwyLTkuOSwzLjFDNDMuNywxMi4yLDQ3LjIsOC42LDUwLjQsNy4zTDUwLjQsNy4zeiBNNDYuNiwzLjdjMC42LDAsMS4xLDAuMiwxLjYsMC42CgkJYy00LjEsMS45LTguNSw2LjgtMTAuNCwxNi42TDMwLDIzLjJDMzIuMiwxNS44LDM3LjMsMy43LDQ2LjYsMy43TDQ2LjYsMy43eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTgyLDE4LjhjLTAuNCwwLTgtMC42LTgtMC42cy01LjMtNS4zLTUuOS01LjljLTAuMi0wLjItMC41LTAuMy0wLjgtMC40TDYzLDk5LjhsMzAuOC02LjcKCQljMCwwLTEwLjgtNzMtMTAuOS03My41QzgyLjgsMTkuMSw4Mi40LDE4LjgsODIsMTguOCIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTUyLjYsMzUuOGwtMy44LDExLjNjMCwwLTMuMy0xLjgtNy40LTEuOGMtNiwwLTYuMywzLjctNi4zLDQuN2MwLDUuMiwxMy40LDcuMSwxMy40LDE5LjIKCQljMCw5LjUtNiwxNS42LTE0LjEsMTUuNmMtOS43LDAtMTQuNy02LjEtMTQuNy02LjFsMi42LTguNmMwLDAsNS4xLDQuNCw5LjQsNC40YzIuOCwwLDQtMi4yLDQtMy44YzAtNi43LTExLTctMTEtMTguMQoJCWMwLTkuMyw2LjctMTguMywyMC4xLTE4LjNDNTAsMzQuMyw1Mi42LDM1LjgsNTIuNiwzNS44Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const headers = {
            [API_KEY_HEADER]: this.getAccessToken(applicationInstall),
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
        return app
            .getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[SHOPIFY_URL] ?? '';
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

    public getNextPageFromHeaders(headers: Record<string, unknown>): string | undefined {
        const linkHeaders = headers.Link as string;

        if (linkHeaders) {
            const nextLinkHeader = linkHeaders.split(',').find((link) => link.includes('rel=next'));
            // eslint-disable-next-line prefer-named-capture-group
            const nextLink = (/<(.+)>/).exec(nextLinkHeader ?? '');
            if (nextLink) {
                return nextLink[1];
            }
            return undefined;
        }
        return undefined;
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
            'read_orders',
            'write_orders',
            'read_shipping',
            'write_shipping',
            'read_fulfillments',
            'write_fulfillments',
            'read_assigned_fulfillment_orders',
            'write_assigned_fulfillment_orders',
            'read_merchant_managed_fulfillment_orders',
            'write_merchant_managed_fulfillment_orders',
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

    private async checkShopPlan(applicationInstall: ApplicationInstall): Promise<void> {
        const requestDto = this.getRequestDto(
            ProcessDto.createForFormRequest(NAME, applicationInstall.getUser(), crypto.randomUUID()),
            applicationInstall,
            HttpMethods.GET,
            SHOP_INFO_URL,
        );

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const res = await this.curlSender.send<{ shop: { plan_name: string } }>(requestDto, [200, 404]);

        const { shop } = res.getJsonBody();
        let premium = false;
        if (shop.plan_name !== 'basic') {
            premium = true;
        }

        applicationInstall.addSettings({ [CoreFormsEnum.AUTHORIZATION_FORM]: { [PREMIUM_PLAN]: premium } });
    }

}
