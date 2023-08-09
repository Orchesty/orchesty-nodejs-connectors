import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABaseShopify, { API_VERSION } from '../ABaseShopify';

export const NAME = 'shopify-get-fulfillment-orders';

const GET_FULFILLMENT_ORDERS = `admin/api/${API_VERSION}/fulfillment_orders/{id}/fulfillments.json`;

export default class ShopifyGetFulfillmentOrders extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { id } = dto.getJsonData();
        const requestDto = this.getApplication<ABaseShopify>().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            GET_FULFILLMENT_ORDERS.replace('{id}', id),
        );

        return this.setItemList(dto, await this.getSender().send<IResponse>(requestDto));
    }

    protected setItemList(dto: BatchProcessDto, response: ResponseDto<IResponse>): BatchProcessDto {
        return dto.setItemList(response.getJsonBody().fulfillments);
    }

}

export interface IInput {
    id: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: number;
    order_id: number;
    admin_graphql_api_id: string;
    status: string;
    created_at: string;
    service: string;
    updated_at: string;
    tracking_company: string;
    shipment_status: string;
    location_id: number;
    origin_address: string;
    line_items: {
        id: number;
        admin_graphql_api_id: string;
        variant_id: number;
        title: string;
        quantity: number;
        sku: string;
        variant_title: string;
        vendor: string;
        fulfillment_service: string;
        product_id: number;
        requires_shipping: boolean;
        taxable: boolean;
        gift_card: boolean;
        name: string;
        variant_inventory_management: string;
        properties: unknown[];
        product_exists: boolean;
        fulfillable_quantity: number;
        grams: number;
        price: string;
        total_discount: string;
        fulfillment_status: string;
        price_set: {
            shop_money: {
                amount: string;
                currency_code: string;
            };
            presentment_money: {
                amount: string;
                currency_code: string;
            };
        };
        total_discount_set: {
            shop_money: {
                amount: string;
                currency_code: string;
            };
            presentment_money: {
                amount: string;
                currency_code: string;
            };
        };
        discount_allocations: unknown[];
        duties: unknown[];
        tax_lines: unknown[];
    }[];
    tracking_number: string;
    tracking_numbers: string[];
    tracking_url: string;
    tracking_urls: string[];
    receipt: {
        authorization: string;
        testcase: boolean;
    };
    name: string;
}

interface IResponse {
    fulfillments: IOutput[];
}
/* eslint-enable @typescript-eslint/naming-convention */
