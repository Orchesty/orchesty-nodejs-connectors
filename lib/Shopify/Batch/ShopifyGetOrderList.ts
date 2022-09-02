import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-order-list';

const LIMIT = 100;
const LIST_PAGE_ENDPOINT = `admin/api/2021-07/orders.json?limit=${LIMIT}`;

const LAST_RUN_KEY = 'lastRunListOrdersChanges';

export default class ShopifyGetOrderList extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const app = this.getApplication<ShopifyApplication>();
        const {
            from,
        } = dto.getJsonData();
        let url = dto.getBatchCursor(LIST_PAGE_ENDPOINT);
        if (from) {
            const separatorChar = url.includes('?') ? '&' : '?';
            url = `${url}${separatorChar}created_at_min=${from}`;
        }
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

        const res = await this.getSender().send<IResponse>(requestDto);
        const nextPageLink = app.getNextPageFromHeaders(res.getHeaders());

        if (nextPageLink) {
            dto.setBatchCursor(nextPageLink);
        } else {
            await this.writeLastTimeRun(appInstall);
        }

        const { orders } = res.getJsonBody();

        this.setItemsListToDto(dto, orders);

        return dto;
    }

    protected setItemsListToDto(dto: BatchProcessDto, orders: IOutput[]): void {
        dto.setItemList(orders);
    }

    private async writeLastTimeRun(appInstall: ApplicationInstall): Promise<void> {
        appInstall.addNonEncryptedSettings({ [LAST_RUN_KEY]: new Date() });
        await (await this.getDbClient().getApplicationRepository()).update(appInstall);
    }

}

export interface IInput {
    from: string;
}

interface IResponse {
    orders: IOrder[];
}

export type IOutput = IOrder;

/* eslint-disable @typescript-eslint/naming-convention */
export interface IClientDetails {
    accept_language?: unknown;
    browser_height?: unknown;
    browser_ip: string;
    browser_width?: unknown;
    session_hash?: unknown;
    user_agent?: unknown;
}

export interface IPrice {
    amount: string;
    currency_code: string;
}

export interface IPriceSet {
    shop_money: IPrice;
    presentment_money: IPrice;
}

export interface ITaxLine {
    price: string;
    rate: number;
    title: string;
    price_set: IPriceSet;
}

export interface IBillingAddress {
    first_name: string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: string;
    address2: string;
    compunknown?: unknown;
    latitude: number;
    longitude: number;
    name: string;
    country_code: string;
    province_code: string;
}

export interface IDefaultAddress {
    id: number;
    customer_id: number;
    first_name?: unknown;
    last_name?: unknown;
    compunknown?: unknown;
    address1: string;
    address2: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone: string;
    name: string;
    province_code: string;
    country_code: string;
    country_name: string;
    default: boolean;
}

export interface ICustomer {
    id: number;
    email: string;
    accepts_marketing: boolean;
    created_at: Date;
    updated_at: Date;
    first_name: string;
    last_name: string;
    orders_count: number;
    state: string;
    total_spent: string;
    last_order_id: number;
    note?: unknown;
    verified_email: boolean;
    multipass_identifier?: unknown;
    tax_exempt: boolean;
    phone: string;
    tags: string;
    last_order_name: string;
    currency: string;
    accepts_marketing_updated_at: Date;
    marketing_opt_in_level?: unknown;
    tax_exemptions: unknown[];
    admin_graphql_api_id: string;
    default_address: IDefaultAddress;
}

export interface IDiscountApplication {
    target_type: string;
    type: string;
    value: string;
    value_type: string;
    allocation_method: string;
    target_selection: string;
    code: string;
}

export interface IDiscountAllocation {
    amount: string;
    amount_set: IPriceSet;
    discount_application_index: number;
}

export interface ILineItem {
    id: number;
    admin_graphql_api_id: string;
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status?: unknown;
    gift_card: boolean;
    grams: number;
    name: string;
    price: string;
    price_set: IPriceSet;
    product_exists: boolean;
    product_id: number;
    properties: {
        name: string;
        value: string;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: IPriceSet;
    variant_id: number;
    variant_inventory_management: string;
    variant_title: string;
    vendor?: unknown;
    tax_lines: ITaxLine[];
    discount_allocations: IDiscountAllocation[];
}

export interface IFulfillment {
    id: number;
    admin_graphql_api_id: string;
    created_at: Date;
    location_id: number;
    name: string;
    order_id: number;
    receipt: {
        testcase: boolean;
        authorization: string;
    };
    service: string;
    shipment_status?: unknown;
    status: string;
    tracking_compunknown: string;
    tracking_number: string;
    tracking_numbers: string[];
    tracking_url: string;
    tracking_urls: string[];
    updated_at: Date;
    line_items: ILineItem[];
}

export interface IPaymentDetails {
    credit_card_bin?: unknown;
    avs_result_code?: unknown;
    cvv_result_code?: unknown;
    credit_card_number: string;
    credit_card_compunknown: string;
}

export interface ITransaction {
    id: number;
    admin_graphql_api_id: string;
    amount: string;
    authorization: string;
    created_at: Date;
    currency: string;
    device_id?: unknown;
    error_code?: unknown;
    gateway: string;
    kind: string;
    location_id?: unknown;
    message?: unknown;
    order_id: number;
    parent_id: number;
    processed_at: Date;
    receipt: unknown;
    source_name: string;
    status: string;
    test: boolean;
    user_id?: unknown;
}

export interface IRefundLineItem {
    id: number;
    line_item_id: number;
    location_id: number;
    quantity: number;
    restock_type: string;
    subtotal: number;
    subtotal_set: IPriceSet;
    total_tax: number;
    total_tax_set: IPriceSet;
    line_item: ILineItem;
}

export interface IShippingAddress {
    first_name: string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: string;
    address2: string;
    compunknown?: unknown;
    latitude: number;
    longitude: number;
    name: string;
    country_code: string;
    province_code: string;
}

export interface IShippingLine {
    id: number;
    carrier_identifier?: unknown;
    code: string;
    delivery_category?: unknown;
    discounted_price: string;
    discounted_price_set: IPriceSet;
    phone?: unknown;
    price: string;
    price_set: IPriceSet;
    requested_fulfillment_service_id?: unknown;
    source: string;
    title: string;
    tax_lines: unknown[];
    discount_allocations: unknown[];
}

export interface IOrder {
    id: number;
    admin_graphql_api_id: string;
    app_id?: unknown;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason?: unknown;
    cancelled_at?: unknown;
    cart_token: string;
    checkout_id: number;
    checkout_token: string;
    client_details: IClientDetails;
    closed_at?: unknown;
    confirmed: boolean;
    contact_email: string;
    created_at: Date;
    currency: string;
    customer_locale?: unknown;
    device_id?: unknown;
    discount_codes: {
        code: string;
        amount: string;
        type: string;
    }[];
    email: string;
    financial_status: string;
    fulfillment_status?: unknown;
    gateway: string;
    landing_site: string;
    landing_site_ref: string;
    location_id?: unknown;
    name: string;
    note?: unknown;
    note_attributes: {
        name: string;
        value: string;
    }[];
    number: number;
    order_number: number;
    order_status_url: string;
    payment_gateway_names: string[];
    phone: string;
    presentment_currency: string;
    processed_at: Date;
    processing_method: string;
    reference: string;
    referring_site: string;
    source_identifier: string;
    source_name: string;
    source_url?: unknown;
    subtotal_price: string;
    subtotal_price_set: IPriceSet;
    tags: string;
    tax_lines: ITaxLine[];
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: IPriceSet;
    total_line_items_price: string;
    total_line_items_price_set: IPriceSet;
    total_price: string;
    total_price_set: IPriceSet;
    total_price_usd: string;
    total_shipping_price_set: IPriceSet;
    total_tax: string;
    total_tax_set: IPriceSet;
    total_tip_received: string;
    total_weight: number;
    updated_at: Date;
    user_id?: unknown;
    billing_address: IBillingAddress;
    customer: ICustomer;
    discount_applications: IDiscountApplication[];
    fulfillments: IFulfillment[];
    line_items: ILineItem[];
    payment_details: IPaymentDetails;
    refunds: {
        id: number;
        admin_graphql_api_id: string;
        created_at: Date;
        note: string;
        order_id: number;
        processed_at: Date;
        restock: boolean;
        user_id: number;
        order_adjustments: unknown[];
        transactions: ITransaction[];
        refund_line_items: IRefundLineItem[];
    }[];
    shipping_address: IShippingAddress;
    shipping_lines: IShippingLine[];
}
