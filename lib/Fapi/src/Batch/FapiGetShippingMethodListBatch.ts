import { NAME as APPLICATION_NAME } from '../FapiApplication';
import AFapiListBatch from './AFapiListBatch';

export const NAME = `${APPLICATION_NAME}-get-shipping-method-list-batch`;

export default class FapiGetShippingMethodListBatch extends AFapiListBatch<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getUrl(): string {
        return 'shipping-methods';
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    user_id: number;
    name: string;
    type: string;
    subtype: string;
    description: string;
    address_prices: {
        address: {
            country_code: string;
        };
        prices: {
            currency_code: string;
            price: number;
        }[];
    }[];
    free_of_charges: {
        price: number;
        currency_code: string;
    }[];
    meta_data: {
        carrier_id?: number;
        is_disable_repayment: boolean;
        accounting_code: string;
        pohoda_accounting: string;
        pohoda_centre: string;
        pohoda_store: string;
        pohoda_stock_item: string;
    };
    including_vat: boolean;
    deleted: boolean;
    /* eslint-enable @typescript-eslint/naming-convention */
}
