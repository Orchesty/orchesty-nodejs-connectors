import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { STORE_HASH } from '../BigcommerceApplication';

export const NAME = 'big-commerce-create-order';

export default class BigcommerceCreateOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const storeHash = appInstall.getSettings()[AUTHORIZATION_FORM][STORE_HASH];
    const url = `${storeHash}/v2/orders`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);

    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    billing_address: {
        first_name: string,
        last_name: string,
        street_1: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        country_iso2: string,
        email: string,
    }
    products: [{ name: string, quantity: number, price_inc_tax: number, price_ex_tax: number }]

}
export interface IOutput {

    'id': number,
    'customer_id': number,
    'date_created': string,
    'date_modified': string,
    'status_id': number,
    'status': string,
    'subtotal_ex_tax': string,
    'subtotal_inc_tax': string,
    'subtotal_tax': string,
    'base_shipping_cost': string,
    'shipping_cost_ex_tax': string,
    'shipping_cost_inc_tax': string,
    'shipping_cost_tax': string,
    'shipping_cost_tax_class_id': number,
    'handling_cost_tax_class_id': number,
    'wrapping_cost_tax_class_id': number,
    'total_ex_tax': string,
    'total_inc_tax': string,
    'total_tax': string,
    'items_total': number,
    'items_shipped': number,
    'payment_method': string,
    'payment_status': string,
    'order_is_digital': boolean,
    'currency_id': number,
    'currency_code': string,
    'currency_exchange_rate': string,
    'default_currency_id': number,
    'default_currency_code': string,
    'discount_amount': string,
    'coupon_discount': string,
    'shipping_address_count': number,
    'is_deleted': boolean,
    'ebay_order_id': string,
    'cart_id': string,
    'billing_address': {
        'first_name': string,
        'last_name': string,
        'company': string,
        'street_1': string,
        'street_2': string,
        'city': string,
        'state': string,
        'zip': number,
        'country': string,
        'country_iso2': string,
        'phone': number,
        'email': string,
        'form_fields': [
            {
                'name': string,
                'value': string
            }
        ]
    },
    'is_email_opt_in': boolean,
    'order_source': string,
    'channel_id': number,
    'products': {
        'url': string,
        'resource': string
    },
    'shipping_addresses': {
        'url': string,
        'resource': string
    },
    'coupons': {
        'url': string,
        'resource': string
    },
    'tax_provider_id': string,
    'store_default_to_transactional_exchange_rate': string,
    'custom_status': string,
    'customer_locale': string
}

/* eslint-enable @typescript-eslint/naming-convention */
