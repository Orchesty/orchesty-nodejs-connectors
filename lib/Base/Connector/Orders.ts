import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'orders';

export default class Orders extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getOrders';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(dto: ProcessDto<IInput>): Promise<object> {
        const {
            orderId,
            dateConfirmedFrom,
            dateFrom,
            idFrom,
            getUnconfirmedOrders,
            includeCustomExtraFields,
            statusId,
            filterEmail,
            filterOrderSource,
            filterOrderSourceId,
            withCommission,
        } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            order_id: orderId,
            date_confirmed_from: dateConfirmedFrom,
            date_from: dateFrom,
            id_from: idFrom,
            get_unconfirmed_orders: getUnconfirmedOrders,
            include_custom_extra_fields: includeCustomExtraFields,
            status_id: statusId,
            filter_email: filterEmail,
            filter_order_source: filterOrderSource,
            filter_order_source_id: filterOrderSourceId,
            with_commission: withCommission,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

}

export interface IInput {
    orderId?: number;
    dateConfirmedFrom?: number;
    dateFrom?: number;
    idFrom?: number;
    getUnconfirmedOrders?: boolean;
    includeCustomExtraFields?: boolean;
    statusId?: number;
    filterEmail?: string;
    filterOrderSource?: string;
    filterOrderSourceId?: number;
    withCommission?: boolean;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface Order {
    order_id: number;
    shop_order_id: number;
    external_order_id: string;
    order_source: string;
    order_source_id: number;
    order_source_info: string;
    order_status_id: number;
    date_add: number;
    date_confirmed: number;
    date_in_status: number;
    user_login: string;
    phone: string;
    email: string;
    user_comments: string;
    admin_comments: string;
    currency: string;
    payment_method: string;
    payment_method_cod: string;
    payment_done: string;
    delivery_method: string;
    delivery_price: number;
    delivery_package_module: string;
    delivery_package_nr: string;
    delivery_fullname: string;
    delivery_company: string;
    delivery_address: string;
    delivery_city: string;
    delivery_state: string;
    delivery_postcode: string;
    delivery_country: string;
    delivery_country_code: string;
    delivery_point_id: string;
    delivery_point_name: string;
    delivery_point_address: string;
    delivery_point_postcode: string;
    delivery_point_city: string;
    invoice_fullname: string;
    invoice_company: string;
    invoice_nip: string;
    invoice_address: string;
    invoice_city: string;
    invoice_state: string;
    invoice_postcode: string;
    invoice_country: string;
    invoice_country_code: string;
    want_invoice: string;
    extra_field_1: string;
    extra_field_2: string;
    custom_extra_fields: Record<string, string>;
    order_page: string;
    pick_status: string;
    pack_status: string;
    commission: {
        net: number;
        gross: number;
        currency: string;
    },
    products:
    {
        storage: string;
        storage_id: number;
        order_product_id: number;
        product_id: string;
        variant_id: number;
        name: string;
        attributes: string;
        sku: string;
        ean: string;
        location: string;
        auction_id: string;
        price_brutto: number;
        tax_rate: number;
        quantity: number;
        weight: number;
        bundle_id: number;
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface IOutput {
    orders: Order[]
}
