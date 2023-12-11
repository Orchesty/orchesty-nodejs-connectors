import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IOutput } from './JamesAndJamesCreateOrder';

export const NAME = 'james-and-james-update-order';

export default class JamesAndJamesUpdateOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { orderId, ...data } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PATCH,
            `order/${orderId}`,
            data,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    orderId: string;
    order: {
        reference?: string;
        date_placed?: string;
        postage_speed?: number;
        allow_saturday?: boolean;
        signed_for?: boolean;
        no_signature?: boolean;
        tracked?: boolean;
        postage_cost?: number;
        total_value?: number;
        currency_code?: string;
        tissue_wrap?: boolean;
        days_before_bbe?: number;
        callback_url?: string;
        warehouse_id?: number;
        shipping_contact: {
            name?: string;
            company?: string;
            email?: string;
            phone?: string;
            address_line_1?: string;
            address_line_2?: string;
            city?: string;
            county?: string;
            country?: string;
            postcode?: string;
        };
        billing_contact: {
            name?: string;
            company?: string;
            email?: string;
            phone?: string;
            address_line_1?: string;
            address_line_2?: string;
            city?: string;
            county?: string;
            country?: string;
            postcode?: string;
        };
        items: {
            product_id: number;
            quantity: number;
            price: number;
            line_reference?: string;
            days_before_bbe?: number;
            customisation_data?: string;
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
