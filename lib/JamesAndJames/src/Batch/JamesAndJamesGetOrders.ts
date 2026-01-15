import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'james-and-james-get-orders';

export default class JamesAndJamesGetOrders extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto<IOutput[]>> {
        const { status } = dto.getJsonData();
        const url = status ? `?statuses[]=${status}` : '';

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `order${url}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setItemList(resp.getJsonBody().data) as BatchProcessDto<IOutput[]>;
    }

}

export interface IInput {
    status?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: number;
    brand_id: number;
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
    callback_url:string;
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
    },
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
    },
    total_value: number;
    date_labelled: string;
    date_despatched: string;
    shipping_info: {
        carrier_name: string;
        service_name: string;
        tracking_numbers: string[];
        tracking_links: null,
        branded_tracking_link: string;
        tracking_events:
        {
            title: string;
            date_created: string;
            status: string;
            domain: string;
        }[];
        tracking_events_updated_at: string;
    },
    items:
    {
        id: number;
        product_id: number;
        quantity: number;
        price: number;
        line_reference: string,
        days_before_bbe: number;
        customisation_data: string,
        batch_id: number;
    }[];
}

export interface IResponse {
    data: IOutput[];
}

/* eslint-enable @typescript-eslint/naming-convention */
