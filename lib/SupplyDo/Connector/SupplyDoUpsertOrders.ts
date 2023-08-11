import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-upsert-orders';

export default class SupplyDoUpsertOrders extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'hanaboso/items/selling_order',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

interface IResponse {
    data: IInput[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    ecommerce: number;
    external_id: string;
    customer: {
        address: number;
        id: number;
        name: string;
        ecommerce: number;
        email?: string;
        phone?: string;
    };
    payment_type: string;
    transport?: {
        id: number;
        tracking_number: string;
        ecommerce: number;
        carrier?: number;
    };
    history?: {
        date: string;
        type: string;
    }[];
    products?: {
        price: {
            amount: number;
            currency: string;
        };
        quantity: number;
        product: number;
        product_batch?: number;
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention */
