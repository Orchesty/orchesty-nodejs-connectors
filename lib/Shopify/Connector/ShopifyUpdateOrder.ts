import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import { IOrder } from '../Batch/ShopifyGetOrderList';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-update-order';

const UPDATE_ORDER_ENDPOINT = `admin/api/${API_VERSION}/orders/{id}.json`;

export default class ShopifyUpdateOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...data } = dto.getJsonData();
        const requestDto = await this.getApplication<ShopifyApplication>().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            UPDATE_ORDER_ENDPOINT.replace('{id}', id.toString()),
            data,
        );

        const { order } = (await this.getSender().send<IResponse>(requestDto, [200])).getJsonBody();

        return dto.setNewJsonData({ ...order });
    }

}

export type IInput = Partial<IOrder> & Pick<IOrder, 'id'>;

export type IOutput = IOrder;

interface IResponse {
    order: IOrder;
}
