import { NAME as APPLICATION_NAME } from '../FapiApplication';
import AFapiListBatch from './AFapiListBatch';

export const NAME = `${APPLICATION_NAME}-get-item-template-list-batch`;

export default class FapiGetItemTemplateListBatch extends AFapiListBatch<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getUrl(): string {
        return 'item_templates';
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    hidden: boolean;
    name: string;
    code: string;
    accounting_code: string;
    description: string;
    price_czk: number;
    price_eur: number;
    price_usd: number;
    repayment_amount_czk: number;
    repayment_amount_eur: number;
    repayment_amount_usd: number;
    vat: number;
    including_vat: boolean;
    count: number;
    sold_out: boolean;
    allow_change_count: boolean;
    enable_stock: boolean;
    stock: number;
    show_stock_information: boolean;
    type: string;
    electronically_supplied_service: boolean;
    pohoda_accounting: string;
    pohoda_centre: string;
    pohoda_store: string;
    pohoda_stock_item: string;
    mioweb_eshop: boolean;
    mioweb_eshop_url: string;
    disable_discount: boolean;
    prices: {
        type: string;
        price: number;
        currency_code: string;
        metadata: string;
        repayment_count: number;
    }[];
    triggers: string[];
    periodic: boolean;
    period: string;
    voucher_metadata: string;
    metadata: {
        weight: number;
        live_event_country: boolean;
        is_disable_repayment: boolean;
        min_count: number;
        max_count: number;
        allow_reservations: boolean;
        reservation_event_type: string;
    };
    /* eslint-enable @typescript-eslint/naming-convention */
}
