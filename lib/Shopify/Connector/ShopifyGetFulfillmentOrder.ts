import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import { IOutput } from '../Batch/ShopifyGetFulfillmentOrders';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-fulfilment-order';

const FULFILLMENT_ORDER_ENDPOINT = `admin/api/${API_VERSION}/fulfillment_orders/{id}.json`;

export default class ShopifyGetFulfillmentOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
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

        return this.setDtoData(dto, res.getJsonBody()) as ProcessDto<IOutput>;
    }

    protected setDtoData(dto: ProcessDto<IInput>, res: IResponse): ProcessDto {
        return dto.setNewJsonData(res.fulfillment_order);
    }

}

export interface IInput {
    id: number;
}

export interface IResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fulfillment_order: IOutput
}
