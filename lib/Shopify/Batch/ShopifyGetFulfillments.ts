import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { API_VERSION } from '../ABaseShopify';

export const NAME = 'shopify-get-fulfillments';

export default class ShopifyGetFulfillments extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { id } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            `admin/api/${API_VERSION}/orders/${id}/fulfillment_orders.json`,
        );
        const resp = await this.getSender().send<IOutput>(req);

        return this.setItemList(dto, resp);
    }

    protected setItemList(dto: BatchProcessDto, resp: ResponseDto<IOutput>): BatchProcessDto {
        return dto.setItemList(resp.getJsonBody().fulfillment_orders);
    }

}

export interface IInput {
    id: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    fulfillment_orders: {
        id: number;
        shop_id: number;
        order_id: number;
        assigned_location_id: number;
        request_status: string;
        status: string;
        supported_actions: string[];
        destination: {
            id: number;
            address1: string;
            address2: string;
            city: string;
            company?: unknown;
            country: string;
            email: string;
            first_name: string;
            last_name: string;
            phone: string;
            province: string;
            zip: string;
        };
        line_items: {
            id: number;
            shop_id: number;
            fulfillment_order_id: number;
            quantity: number;
            line_item_id: number;
            inventory_item_id: number;
            fulfillable_quantity: number;
            variant_id: number;
        }[];
        fulfillment_service_handle: string;
        assigned_location: {
            address1?: unknown;
            address2?: unknown;
            city?: unknown;
            country_code: string;
            location_id: number;
            name: string;
            phone?: unknown;
            province?: unknown;
            zip?: unknown;
        };
        merchant_requests: unknown[];
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
