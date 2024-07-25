import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'james-and-james-update-asn';

export default class JamesAndJamesUpdateASN extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { asnId, ...data } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PATCH,
            `asn/${asnId}`,
            data,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    asnId: string;
    asn: {
        reference: string;
        warehouse_id: number;
        supplier_id: number;
        date_delivery_due: string;
        callback_url: string;
        date_placed?: string;
        carrier?: string;
        tracking_number?: string;
        expected_pallets?: number;
        expected_boxes?: number;
        items: [
            {
                product_id: number;
                quantity: number;
                price: number;
            },
        ]
    }
}

export interface IOutput {
    data: {
        id: number;
        reference: string;
        status: string;
        supplier_id: number;
        warehouse_id: number;
        is_return: boolean;
        date_placed: string;
        date_delivery_due: string;
        callback_url: string;
        carrier: string;
        tracking_number: string;
        expected_pallets: number;
        expected_boxes: number;
        items: [
            {
                id: number;
                product_id: number;
                quantity: number;
                price: number;
            },
        ]
    }
}

/* eslint-enable @typescript-eslint/naming-convention */
