import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-create-order-history';

export default class SupplyDoCreateOrderHistory extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'items/selling_order_history',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    data: IOutput[];
}

export type IInput = ISellingOrderHistory | ISellingOrderHistory[];

export interface ISellingOrderHistory {
    date: string;
    selling_order: string;
    type: OrderStatus;
    id?: number;
}

export interface IOutput {
    date: string;
    id: number;
    selling_order: string;
    type: string;
}
/* eslint-enable @typescript-eslint/naming-convention */

export enum OrderStatus {
    NEW = 'new',
    PROCESSING = 'processing',
    DISPATCHED = 'dispatched',
    DELIVERED = 'delivered',
    NOT_PAID = 'not_paid',
    WRONG_ADDRESS = 'wrong_address',
    WRONG_PHONE_NUMBER = 'wrong_phone_number',
    PACKAGE_LOST = 'package_lost',
}
