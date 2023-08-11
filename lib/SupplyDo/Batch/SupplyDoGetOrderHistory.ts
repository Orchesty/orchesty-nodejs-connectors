import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'supply-do-get-order-history';
export const LAST_RUN_KEY = 'lastRunListOrders';

export default class SupplyDoGetOrderHistory extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = await appInstall.getNonEncryptedSettings()[LAST_RUN_KEY] ?? new Date(0).toISOString();
        const ecommerce = dto.getUser();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `items/selling_order_history?fields[]=*&fields[]=*.*&fields[]=selling_order.transport.*&filter[ecommerce][_eq]=${ecommerce}&filter[date][_gte]=${lastRun}&sort=-date`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setItemList(resp.getJsonBody().data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    date: string;
    id: number;
    type: string;
    selling_order: {
        customer: number;
        id: string;
        payment_type: string;
        external_id: string;
        ecommerce: number;
        history: number[];
        products: number[];
        transport: {
            carrier: number;
            id: number;
            tracking_number: string;
            ecommerce: number;
        };
    };
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface IResponse {
    data: IOutput[];
}
