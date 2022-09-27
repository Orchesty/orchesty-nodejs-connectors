import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ILimitedApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/ILimitedApplication';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { Headers } from 'node-fetch';

export const NAME = 'shopify';
export const API_VERSION = '2022-07';

const API_KEY_HEADER = 'X-Shopify-Access-Token';
const PREMIUM_PLAN = 'premium';
const SHOPIFY_URL = 'shopifyUrl';
const SHOP_INFO_URL = `admin/api/${API_VERSION}/shop.json`;

export default class ShopifyApplication extends ABasicApplication implements ILimitedApplication {

    public constructor(private readonly curlSender: CurlSender) {
        super();
    }

    public injectLimit(dto: AProcessDto, appInstall: ApplicationInstall): AProcessDto {
        const premium = appInstall.getSettings()[PREMIUM_PLAN];
        let amount = 2;
        if (premium) {
            amount = 4;
        }
        dto.setLimiter(
            appInstall.getName(),
            1,
            amount,
        );
        return dto;
    }

    public getDescription(): string {
        return 'Allows users to leverage Shoptet’s core and infrastructure while building a customized frontend solution and customizing add-ons';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Shopify';
    }

    public getLogo(): string | null {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDkuNSAxMjQuNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTA5LjUgMTI0LjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojOTVCRjQ3O30KCS5zdDF7ZmlsbDojNUU4RTNFO30KCS5zdDJ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTUuOSwyMy45Yy0wLjEtMC42LTAuNi0xLTEuMS0xYy0wLjUsMC05LjMtMC4yLTkuMy0wLjJzLTcuNC03LjItOC4xLTcuOWMtMC43LTAuNy0yLjItMC41LTIuNy0wLjMKCQljMCwwLTEuNCwwLjQtMy43LDEuMWMtMC40LTEuMy0xLTIuOC0xLjgtNC40Yy0yLjYtNS02LjUtNy43LTExLjEtNy43YzAsMCwwLDAsMCwwYy0wLjMsMC0wLjYsMC0xLDAuMWMtMC4xLTAuMi0wLjMtMC4zLTAuNC0wLjUKCQljLTItMi4yLTQuNi0zLjItNy43LTMuMWMtNiwwLjItMTIsNC41LTE2LjgsMTIuMmMtMy40LDUuNC02LDEyLjItNi44LDE3LjVjLTYuOSwyLjEtMTEuNywzLjYtMTEuOCwzLjdjLTMuNSwxLjEtMy42LDEuMi00LDQuNQoJCWMtMC4zLDIuNS05LjUsNzMtOS41LDczbDc2LjQsMTMuMmwzMy4xLTguMkMxMDkuNSwxMTUuOCw5NiwyNC41LDk1LjksMjMuOXogTTY3LjIsMTYuOGMtMS44LDAuNS0zLjgsMS4yLTUuOSwxLjgKCQljMC0zLTAuNC03LjMtMS44LTEwLjlDNjQsOC42LDY2LjIsMTMuNyw2Ny4yLDE2Ljh6IE01Ny4yLDE5LjljLTQsMS4yLTguNCwyLjYtMTIuOCwzLjljMS4yLTQuNywzLjYtOS40LDYuNC0xMi41CgkJYzEuMS0xLjEsMi42LTIuNCw0LjMtMy4yQzU2LjksMTEuNiw1Ny4zLDE2LjUsNTcuMiwxOS45eiBNNDkuMSw0YzEuNCwwLDIuNiwwLjMsMy42LDAuOUM1MS4xLDUuOCw0OS41LDcsNDgsOC42CgkJYy0zLjgsNC4xLTYuNywxMC41LTcuOSwxNi42Yy0zLjYsMS4xLTcuMiwyLjItMTAuNSwzLjJDMzEuNywxOC44LDM5LjgsNC4zLDQ5LjEsNHoiLz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05NC44LDIyLjljLTAuNSwwLTkuMy0wLjItOS4zLTAuMnMtNy40LTcuMi04LjEtNy45Yy0wLjMtMC4zLTAuNi0wLjQtMS0wLjVsMCwxMDkuN2wzMy4xLTguMgoJCQljMCwwLTEzLjUtOTEuMy0xMy42LTkyQzk1LjgsMjMuMyw5NS4zLDIyLjksOTQuOCwyMi45eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01OCwzOS45bC0zLjgsMTQuNGMwLDAtNC4zLTItOS40LTEuNmMtNy41LDAuNS03LjUsNS4yLTcuNSw2LjRjMC40LDYuNCwxNy4zLDcuOCwxOC4zLDIyLjkKCQkJYzAuNywxMS45LTYuMywyMC0xNi40LDIwLjZjLTEyLjIsMC44LTE4LjktNi40LTE4LjktNi40bDIuNi0xMWMwLDAsNi43LDUuMSwxMi4xLDQuN2MzLjUtMC4yLDQuOC0zLjEsNC43LTUuMQoJCQljLTAuNS04LjQtMTQuMy03LjktMTUuMi0yMS43Yy0wLjctMTEuNiw2LjktMjMuNCwyMy43LTI0LjRDNTQuNywzOC4yLDU4LDM5LjksNTgsMzkuOXoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: string,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const headers = {
            [API_KEY_HEADER]: settings[AUTHORIZATION_FORM][TOKEN],
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        };

        let urlx = url ?? '';
        if (!urlx.startsWith('http')) {
            urlx = `${this.getDecoratedUrl(applicationInstall)}/${urlx}`;
        }
        return new RequestDto(urlx, parseHttpMethod(method), dto, data, headers);
    }

    public async saveApplicationForms(applicationInstall: ApplicationInstall, settings: IApplicationSettings):
    Promise<ApplicationInstall> {
        const appInstall = await super.saveApplicationForms(applicationInstall, settings);
        await this.checkShopPlan(applicationInstall);
        return appInstall;
    }

    public getDecoratedUrl(app: ApplicationInstall): string {
        return app
            .getSettings()?.[AUTHORIZATION_FORM]?.[SHOPIFY_URL] ?? '';
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const settings = applicationInstall.getSettings();
        return !!(settings?.[AUTHORIZATION_FORM]
          && settings?.[AUTHORIZATION_FORM]?.[TOKEN]
          && settings?.[AUTHORIZATION_FORM]?.[SHOPIFY_URL]);
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Admin API access token', undefined, true))
            .addField(new Field(FieldType.TEXT, SHOPIFY_URL, 'Url', undefined, true));

        return new FormStack().addForm(form);
    }

    public getNextPageFromHeaders(headers: Headers): string | undefined {
        const linkHeaders = headers.get('Link');

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

    private async checkShopPlan(applicationInstall: ApplicationInstall): Promise<void> {
        const requestDto = this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.GET, SHOP_INFO_URL);

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const res = await this.curlSender.send<{ shop: { plan_name: string } }>(requestDto, [200, 404]);

        const { shop } = res.getJsonBody();
        let premium = false;
        if (shop.plan_name !== 'basic') {
            premium = true;
        }

        this.setPremium(applicationInstall, premium);
    }

    private setPremium(applicationInstall: ApplicationInstall, premium: boolean): ApplicationInstall {
        const settings = applicationInstall.getSettings();
        settings[PREMIUM_PLAN] = premium;

        return applicationInstall.addSettings(settings);
    }

}
