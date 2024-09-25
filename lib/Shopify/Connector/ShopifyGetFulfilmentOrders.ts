import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import { IOutput as IInput } from '../Batch/ShopifyGetOrderList';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-fulfilment-orders';

const FULFILLMENT_ORDER_ENDPOINT = `admin/api/${API_VERSION}/orders/{id}/fulfillment_orders.json`;

export default class ShopifyGetFulfilmentOrders extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication<ShopifyApplication>();
        const { id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            FULFILLMENT_ORDER_ENDPOINT.replace('{id}', id.toString()),
        );
        const res = await this.getSender().send<IResponse>(requestDto, [200, 404]);

        return this.setDtoData(dto, res.getJsonBody());
    }

    protected setDtoData(dto: ProcessDto<IInput>, res: IResponse): ProcessDto {
        return dto.setNewJsonData(res);
    }

}

export interface IResponse {
    /* eslint-disable @typescript-eslint/naming-convention */
    fulfillment_orders: [
        {
            id: number;
            created_at: string;
            updated_at: string;
            shop_id: number;
            order_id: number;
            assigned_location_id: number;
            request_status: string;
            status: string;
            fulfill_at: string;
        },
    ]
    /* eslint-enable @typescript-eslint/naming-convention */
}
