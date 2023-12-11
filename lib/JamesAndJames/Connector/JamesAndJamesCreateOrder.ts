import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'james-and-james-create-order';

export default class JamesAndJamesCreateOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'order',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    order: {
        channel_account_id: number;
        reference: string;
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
        hold?: boolean;
        callback_url?: string;
        warehouse_id?: number;
        shipping_contact: {
            name: string;
            company?: string;
            email?: string;
            phone: string;
            address_line_1: string;
            address_line_2?: string;
            city: string;
            county?: string;
            country: string;
            postcode: string;
        };
        billing_contact: {
            name: string;
            company?: string;
            email?: string;
            phone: string;
            address_line_1: string;
            address_line_2?: string;
            city: string;
            county?: string;
            country: string;
            postcode: string;
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
    allow_preorder?: boolean;
}

export interface IOutput {
    data: {
        id: number;
        type: string;
        status: string;
        fulfilment_status: string;
        incoterm: string;
        reference: string;
        date_placed: string;
        postage_speed: number;
        allow_saturday: boolean;
        signed_for: boolean;
        no_signature: boolean;
        tracked: boolean;
        postage_cost: number;
        currency_code: string;
        tissue_wrap: boolean;
        days_before_bbe: number;
        callback_url: string;
        warehouse_id: number;
        shipping_contact: {
            name: string;
            company: string;
            email: string;
            phone: string;
            address_line_1: string;
            address_line_2: string;
            city: string;
            county: string;
            country: string;
            postcode: string;
        };
        billing_contact: {
            name: string;
            company: string;
            email: string;
            phone: string;
            address_line_1: string;
            address_line_2: string;
            city: string;
            county: string;
            country: string;
            postcode: string;
        };
        total_value: number;
        date_labelled: string;
        date_despatched: string;
        shipping_info: {
            carrier_name: string;
            service_name: string;
            tracking_numbers: string[];
            tracking_links?: unknown;
            branded_tracking_link: string;
            tracking_events: {
                title: string;
                date_created: string;
                status: string;
                domain: string;
            }[];
            tracking_events_updated_at: string;
        };
        items: {
            id: number;
            product_id: number;
            quantity: number;
            price: number;
            line_reference: string;
            days_before_bbe: number;
            customisation_data: string;
            batch_id: number;
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
