import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import Magento2Application, { MAGENTO_URL } from '../Magento2Application';

export const GET_ORDERS_ENDPOINT = 'index.php/rest/default/V1/orders/';

export default class Magento2GetOrder extends AConnector {
  public getName = (): string => 'shoptet-get-order-pages';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as Magento2Application;
    const {
      userName,
      orderNumber,
    } = dto.jsonData as { userName: string, orderNumber: string };
    const appInstall = await this._getApplicationInstall(userName);
    const host = appInstall.getSettings()[AUTHORIZATION_FORM][MAGENTO_URL];
    const url = `${host}/${GET_ORDERS_ENDPOINT}${orderNumber}`;

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );

    const res = await this._sender.send(requestDto, [200, 404]);
    const order = res.jsonBody as IResponseJson;

    dto.jsonData = order as IOutputJson;

    return dto;
  }
}

type IResponseJson = IOrderJson;

type IOutputJson = IOrderJson;

export interface IOrderJson {
  /* eslint-disable @typescript-eslint/naming-convention */
  base_currency_code: string
  base_discount_amount: number
  base_grand_total: number
  base_discount_tax_compensation_amount: number
  base_shipping_amount: number
  base_shipping_discount_amount: number
  base_shipping_discount_tax_compensation_amnt: number
  base_shipping_incl_tax: number
  base_shipping_tax_amount: number
  base_subtotal: number
  base_subtotal_incl_tax: number
  base_tax_amount: number
  base_total_due: number
  base_to_global_rate: number
  base_to_order_rate: number
  billing_address_id: number
  created_at: string
  customer_email: string
  customer_firstname: string
  customer_group_id: number
  customer_id: number
  customer_is_guest: number
  customer_lastname: string
  customer_middlename: string
  customer_note_notify: number
  customer_suffix: string
  discount_amount: number
  entity_id: number
  global_currency_code: string
  grand_total: number
  discount_tax_compensation_amount: number
  increment_id: string
  is_virtual: number
  order_currency_code: string
  protect_code: string
  quote_id: number
  shipping_amount: number
  shipping_description: string
  shipping_discount_amount: number
  shipping_discount_tax_compensation_amount: number
  shipping_incl_tax: number
  shipping_tax_amount: number
  state: string
  status: string
  store_currency_code: string
  store_id: number
  store_name: string
  store_to_base_rate: number
  store_to_order_rate: number
  subtotal: number
  subtotal_incl_tax: number
  tax_amount: number
  total_due: number
  total_item_count: number
  total_qty_ordered: number
  updated_at: string
  weight: number
  items: [{
    amount_refunded: number
    base_amount_refunded: number
    base_discount_amount: number
    base_discount_invoiced: number
    base_discount_tax_compensation_amount: number
    base_original_price: number
    base_price: number
    base_price_incl_tax: number
    base_row_invoiced: number
    base_row_total: number
    base_row_total_incl_tax: number
    base_tax_amount: number
    base_tax_invoiced: number
    created_at: string
    discount_amount: number
    discount_invoiced: number
    discount_percent: number
    free_shipping: number
    discount_tax_compensation_amount: number
    is_qty_decimal: number
    is_virtual: number
    item_id: number
    name: string
    no_discount: number
    order_id: number
    original_price: number
    price: number
    price_incl_tax: number
    product_id: number
    product_type: string
    qty_canceled: number
    qty_invoiced: number
    qty_ordered: number
    qty_refunded: number
    qty_shipped: number
    quote_item_id: number
    row_invoiced: number
    row_total: number
    row_total_incl_tax: number
    row_weight: number
    sku: string
    store_id: number
    tax_amount: number
    tax_invoiced: number
    tax_percent: number
    updated_at: string
  }]
  billing_address: {
    address_type: string
    city: string
    comp: string
    country_id: string
    email: string
    entity_id: number
    fax: string
    firstname: string
    lastname: string
    middlename: string
    parent_id: number
    postcode: string
    region: string
    region_code: string
    region_id: number
    street: [string]
    suffix: string
    telephone: string
    vat_id: string
  }
  payment: {
    account_status: null
    additional_information: string[]
    amount_ordered: number
    base_amount_ordered: number
    base_shipping_amount: number
    cc_exp_year: string
    cc_last4: null
    cc_ss_start_month: string
    cc_ss_start_year: string
    entity_id: number
    method: string
    parent_id: number
    shipping_amount: number
  }
  status_histories: [{
    comment: string
    created_at: string
    entity_id: number
    entity_name: string
    is_customer_notified: number
    is_visible_on_front: number
    parent_id: number
    status: string
  }]
  extension_attributes: {
    shipping_assignments: [{
      shipping: {
        address: {
          address_type: string
          city: string
          comp: string
          country_id: string
          customer_address_id: number
          email: string
          entity_id: number
          fax: string
          firstname: string
          lastname: string
          middlename: string
          parent_id: number
          postcode: string
          region: string
          region_code: string
          region_id: number
          street: [string]
          suffix: string
          telephone: string
          vat_id: string
        }
        method: string
        total: {
          base_shipping_amount: number
          base_shipping_discount_amount: number
          base_shipping_discount_tax_compensation_amnt: number
          base_shipping_incl_tax: number
          base_shipping_tax_amount: number
          shipping_amount: number
          shipping_discount_amount: number
          shipping_discount_tax_compensation_amount: number
          shipping_incl_tax: number
          shipping_tax_amount: number
        }
      }
      items: [{
        amount_refunded: number
        base_amount_refunded: number
        base_discount_amount: number
        base_discount_invoiced: number
        base_discount_tax_compensation_amount: number
        base_original_price: number
        base_price: number
        base_price_incl_tax: number
        base_row_invoiced: number
        base_row_total: number
        base_row_total_incl_tax: number
        base_tax_amount: number
        base_tax_invoiced: number
        created_at: string
        discount_amount: number
        discount_invoiced: number
        discount_percent: number
        free_shipping: number
        discount_tax_compensation_amount: number
        is_qty_decimal: number
        is_virtual: number
        item_id: number
        name: string
        no_discount: number
        order_id: number
        original_price: number
        price: number
        price_incl_tax: number
        product_id: number
        product_type: string
        qty_canceled: number
        qty_invoiced: number
        qty_ordered: number
        qty_refunded: number
        qty_shipped: number
        quote_item_id: number
        row_invoiced: number
        row_total: number
        row_total_incl_tax: number
        row_weight: number
        sku: string
        store_id: number
        tax_amount: number
        tax_invoiced: number
        tax_percent: number
        updated_at: string
      }]
    }]
    payment_additional_info: [{
      key: string
      value: string
    }]
    applied_taxes: []
    item_applied_taxes: []
  }
  /* eslint-enable @typescript-eslint/naming-convention */
}
