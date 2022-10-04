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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0iVnJzdHZhXzEiIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzdGNTRCMzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkuMywyMC4zaDgxLjNjNS4xLDAsOS4zLDQuMiw5LjMsOS4zdjMxYzAsNS4xLTQuMiw5LjMtOS4zLDkuM0g2MS40bDQsOS44bC0xNy42LTkuOEg5LjQKCQljLTUuMSwwLTkuMy00LjItOS4zLTkuM3YtMzFDMCwyNC41LDQuMiwyMC4zLDkuMywyMC4zTDkuMywyMC4zeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTUuNywyOC44YzAuNi0wLjgsMS40LTEuMiwyLjYtMS4zYzIuMS0wLjIsMy4yLDAuOCwzLjUsMi45YzEuMyw4LjUsMi42LDE1LjcsNC4xLDIxLjZsOC45LTE2LjkKCQljMC44LTEuNSwxLjgtMi40LDMtMi40YzEuOC0wLjEsMi45LDEsMy4zLDMuNGMxLDUuNCwyLjMsMTAsMy45LDEzLjljMS4xLTEwLjMsMi44LTE3LjcsNS40LTIyLjNjMC42LTEuMSwxLjUtMS43LDIuNy0xLjgKCQljMC45LTAuMSwxLjgsMC4yLDIuNiwwLjhjMC44LDAuNiwxLjIsMS40LDEuMywyLjNjMCwwLjctMC4xLDEuMy0wLjQsMS45Yy0xLjYsMi45LTIuOSw3LjgtMy45LDE0LjdjLTEsNi42LTEuNCwxMS44LTEuMSwxNS41CgkJYzAuMSwxLTAuMSwxLjktMC41LDIuN2MtMC41LDAuOS0xLjIsMS40LTIuMiwxLjVjLTEuMSwwLjEtMi4yLTAuNC0zLjItMS41Yy0zLjgtMy45LTYuOC05LjYtOS0xNy4zQzI0LDUxLjUsMjIsNTUuNCwyMC43LDU4CgkJYy0yLjQsNC42LTQuNCw2LjktNi4xLDcuMWMtMS4xLDAuMS0yLTAuOS0yLjgtMi44QzkuNyw1Nyw3LjUsNDYuNyw1LjEsMzEuNUM0LjksMzAuNCw1LjIsMjkuNSw1LjcsMjguOEw1LjcsMjguOHogTTkzLDM1LjEKCQljLTEuNS0yLjYtMy42LTQuMS02LjUtNC43Yy0wLjgtMC4yLTEuNS0wLjItMi4yLTAuMmMtMy45LDAtNy4xLDItOS41LDYuMWMtMi4xLDMuNC0zLjIsNy4zLTMuMiwxMS40YzAsMy4xLDAuNiw1LjgsMS45LDgKCQljMS41LDIuNiwzLjYsNC4xLDYuNSw0LjdjMC44LDAuMiwxLjUsMC4yLDIuMiwwLjJjMy45LDAsNy4xLTIsOS41LTYuMWMyLjEtMy41LDMuMi03LjMsMy4yLTExLjVDOTQuOSw0MCw5NC4zLDM3LjMsOTMsMzUuMXoKCQkgTTg3LjgsNDYuNGMtMC42LDIuNy0xLjYsNC43LTMuMSw2Yy0xLjIsMS4xLTIuMywxLjUtMy4zLDEuM2MtMS0wLjItMS44LTEuMS0yLjQtMi42Yy0wLjUtMS4zLTAuNy0yLjUtMC43LTMuN2MwLTEsMC4xLTIsMC4zLTMKCQljMC40LTEuNywxLjEtMy4zLDIuMi00LjhjMS4zLTIsMi44LTIuOCw0LjItMi41YzEsMC4yLDEuOCwxLjEsMi40LDIuNmMwLjUsMS4zLDAuNywyLjUsMC43LDMuN0M4OC4xLDQ0LjQsODgsNDUuNCw4Ny44LDQ2LjQKCQlMODcuOCw0Ni40eiBNNjcuNSwzNS4xYy0xLjUtMi42LTMuNy00LjEtNi41LTQuN2MtMC44LTAuMi0xLjUtMC4yLTIuMi0wLjJjLTMuOSwwLTcuMSwyLTkuNSw2LjFjLTIuMSwzLjQtMy4yLDcuMy0zLjIsMTEuNAoJCWMwLDMuMSwwLjYsNS44LDEuOSw4YzEuNSwyLjYsMy42LDQuMSw2LjUsNC43YzAuOCwwLjIsMS41LDAuMiwyLjIsMC4yYzMuOSwwLDcuMS0yLDkuNS02LjFjMi4xLTMuNSwzLjItNy4zLDMuMi0xMS41CgkJQzY5LjUsNDAsNjguOCwzNy4zLDY3LjUsMzUuMXogTTYyLjQsNDYuNGMtMC42LDIuNy0xLjYsNC43LTMuMSw2Yy0xLjIsMS4xLTIuMywxLjUtMy4zLDEuM2MtMS0wLjItMS44LTEuMS0yLjQtMi42CgkJYy0wLjUtMS4zLTAuNy0yLjUtMC43LTMuN2MwLTEsMC4xLTIsMC4zLTNjMC40LTEuNywxLjEtMy4zLDIuMi00LjhjMS4zLTIsMi44LTIuOCw0LjItMi41YzEsMC4yLDEuOCwxLjEsMi40LDIuNgoJCWMwLjUsMS4zLDAuNywyLjUsMC43LDMuN0M2Mi43LDQ0LjQsNjIuNiw0NS40LDYyLjQsNDYuNEw2Mi40LDQ2LjR6Ii8+CjwvZz4KPC9zdmc+Cg==';
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
