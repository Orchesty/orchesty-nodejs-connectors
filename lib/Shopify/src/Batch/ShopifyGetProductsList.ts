import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABaseShopify, { API_VERSION } from '../ABaseShopify';

export const NAME = 'shopify-get-products-list';

const LIMIT = 100;
const LIST_PRODUCTS_ENDPOINT = `admin/api/${API_VERSION}/products.json?limit=${LIMIT}`;

const LAST_RUN_KEY = 'lastRunListProductsChanges';

export default class ShopifyGetProductsList extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInputJson>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const creationTimeFrom = from || appInstall.getNonEncryptedSettings()[LAST_RUN_KEY];

        let url = dto.getBatchCursor(LIST_PRODUCTS_ENDPOINT);

        if (creationTimeFrom) {
            const separatorChar = url.includes('?') ? '&' : '?';
            url = `${url}${separatorChar}created_at_min=${creationTimeFrom}`;
        }

        const app = this.getApplication<ABaseShopify>();
        const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

        const res = await this.getSender().send<IResponseJson>(requestDto);
        const nextPageLink = app.getNextPageFromHeaders(res.getHeaders());

        if (nextPageLink) {
            dto.setBatchCursor(nextPageLink);
        } else {
            await this.writeLastTimeRun(appInstall);
        }

        const { products } = res.getJsonBody();

        dto.setItemList(products);

        return dto;
    }

    private async writeLastTimeRun(appInstall: ApplicationInstall): Promise<void> {
        appInstall.addNonEncryptedSettings({ [LAST_RUN_KEY]: new Date() });
        await this.getDbClient().getApplicationRepository().update(appInstall);
    }

}

interface IInputJson {
    from: string;
}

interface IResponseJson {
    products: {
        id: string;
    }[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: number;
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    created_at: string;
    handle: string;
    updated_at: string;
    published_at: string;
    published_scope: string;
    tags: string;
    admin_graphql_api_id: string;
    variants: {
        id: number;
        product_id: number;
        title: string;
        price: string;
        sku: string;
        position: number;
        inventory_policy: string;
        compare_at_price?: unknown;
        fulfillment_service: string;
        inventory_management: string;
        option1: string;
        option2?: unknown;
        option3?: unknown;
        created_at: string;
        updated_at: string;
        taxable: boolean;
        barcode: string;
        grams: number;
        image_id: number;
        weight: number;
        weight_unit: string;
        inventory_item_id: number;
        inventory_quantity: number;
        old_inventory_quantity: number;
        presentment_prices: {
            price: {
                amount: string;
                currency_code: string;
            };
            compare_at_price?: unknown;
        }[];
        requires_shipping: boolean;
        admin_graphql_api_id: string;
    }[];
    options: {
        id: number;
        product_id: number;
        name: string;
        position: number;
        values: string[];
    }[];
    images: {
        id: number;
        product_id: number;
        position: number;
        created_at: string;
        updated_at: string;
        alt?: unknown;
        width: number;
        height: number;
        src: string;
        variant_ids: unknown[];
        admin_graphql_api_id: string;
    }[];
    image: {
        id: number;
        product_id: number;
        position: number;
        created_at: string;
        updated_at: string;
        alt?: unknown;
        width: number;
        height: number;
        src: string;
        variant_ids: unknown[];
        admin_graphql_api_id: string;
    };
    template_suffix?: unknown;
}

/* eslint-enable @typescript-eslint/naming-convention */
