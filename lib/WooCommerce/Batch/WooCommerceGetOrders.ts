import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import WooCommerceApplication, { NAME } from '../WooCommerceApplication';

const WOOCOMMERCE_GET_ORDERS_ENDPOINT = 'wp-json/wc/v3/orders?per_page=100&page=';

export default class WooCommerceGetOrders extends ABatchNode {
  public getName = (): string => `${NAME.toLowerCase()}-get-orders`;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const pageNumber = dto.getBatchCursor('1');
    const app = this._application as WooCommerceApplication;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `${WOOCOMMERCE_GET_ORDERS_ENDPOINT}${pageNumber}`,
    );

    const res = await this._sender.send(requestDto, [200, 404]);
    const totalPages = res.headers.get('x-wp-totalpages');
    if (Number(totalPages) > Number(pageNumber)) {
      dto.setBatchCursor((Number(pageNumber) + 1).toString());
    } else {
      dto.removeBatchCursor();
    }
    dto.setItemList(res.jsonBody as IResponseJson[]);
    return dto;
  }
}

type IResponseJson = IOrdersJson

/* eslint-disable @typescript-eslint/naming-convention */
interface IOrdersJson {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string;
  date_paid_gmt: string;
  date_completed: string;
  date_completed_gmt: string;
  cart_hash: string;
  meta_data: [{
    id: number,
    key: string,
    value: string
  }];
  line_items: [{
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: [{
      id: number,
      total: string,
      subtotal: string
    }];
    meta_data: [];
    sku: string;
    price: number;
  }];
  tax_lines: [{
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    meta_data: [];
  }];
  shipping_lines: [{
    id: number;
    method_title: string;
    method_id: string;
    total: string;
    total_tax: string;
    taxes: [];
    meta_data: [];
  }];
  fee_lines: [];
  coupon_lines: [];
  refunds: [];
  _links: {
    self: [{
      href: string
    }],
    collection: [{
      href: string
    }]
  };
}

/* eslint-enable @typescript-eslint/naming-convention */
