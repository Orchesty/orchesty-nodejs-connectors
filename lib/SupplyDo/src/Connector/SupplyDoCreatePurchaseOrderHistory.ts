import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-create-purchase-order-history';

export default class SupplyDoCreatePurchaseOrderHistory extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'items/purchase_order_history',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    data: IInput[];
}

export type IInput = IPurchaseOrderHistory | IPurchaseOrderHistory[];

export interface IPurchaseOrderHistory {
    date: string;
    purchase_order: string;
    type: string;
    purchase_order_product: {
        id: number;
        price?: number;
        purchase_order_history?: number;
        quantity: number;
        product_batch?: number;
        sales_14d: number;
        stock_status: number;
    }[];
    id?: number;
}

/* eslint-enable @typescript-eslint/naming-convention */
