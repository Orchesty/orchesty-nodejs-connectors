import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-create-fulfillment-event';

const CREATE_FULFILLMENT_EVENT = `admin/api/${API_VERSION}/orders/{orderId}/fulfillments/{id}/events.json`;

export default class ShopifyCreateFulfillmentEvent extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, orderId, ...data } = dto.getJsonData();
        const requestDto = await this.getApplication<ShopifyApplication>().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            CREATE_FULFILLMENT_EVENT.replace('{id}', id.toString()).replace('{orderId}', orderId.toString()),
            { event: data },
        );

        const response = await this.getSender().send<IResponse>(requestDto, [200]);

        return this.setDtoData(dto, response.getJsonBody()) as ProcessDto<IOutput>;
    }

    protected setDtoData(dto: ProcessDto<IInput>, response: IResponse): ProcessDto {
        return dto.setNewJsonData(response.fulfillment_event);
    }

}

export interface IInput {
    id: number;
    orderId: number;
    status: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: number;
    order_id: number;
    fulfillment_id: number;
    admin_graphql_api_id: string;
    status: string;
    message: string;
    happened_at: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    address1: string;
    latitude: string;
    longitude: string;
    shop_id: number;
    created_at: string;
    updated_at: string;
    estimated_delivery_at: string;
}

export interface IResponse {
    fulfillment_event: IOutput;
}
/* eslint-enable @typescript-eslint/naming-convention */
