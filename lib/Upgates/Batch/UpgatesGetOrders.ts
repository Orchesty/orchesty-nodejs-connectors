import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import UpgatesApplication from '../UpgatesApplication';

const LIST_PAGE_ENDPOINT = 'api/v2/orders';

export default class UpgatesGetOrders extends ABatchNode {
  public getName = (): string => 'upgates-get-orders';

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const app = this._application as UpgatesApplication;
    const {
      userName,
      from,
      to,
    } = dto.jsonData as IInputJson;
    const pageNumber = dto.getBatchCursor('0');
    let url = `${LIST_PAGE_ENDPOINT}?page${pageNumber}`;
    if (from) {
      url = `${url}&creation_time_from=${from}`;
    }
    if (to) {
      url = `${url}&creation_time_to=${to}`;
    }
    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = await app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

    const res = await this._sender.send(requestDto);

    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      number_of_pages,
      orders,
    } = res.jsonBody as IResponseJson;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    if (Number(pageNumber) < number_of_pages) {
      dto.setBatchCursor((Number(pageNumber) + 1).toString());
    }

    dto.jsonData = orders;

    return dto;
  }
}

interface IInputJson {
  userName: string,
  from: string,
  to: string
}

interface IResponseJson extends IOrderJson {
  /* eslint-disable @typescript-eslint/naming-convention */
  number_of_pages: number,
}

interface IOrderJson {
  orders: [{
    order_number: string
    external_order_number: string
    language_id: string
    prices_with_vat_yn: string
    status_id: string
    status: string
    paid_date: string
    tracking_code: string
    resolved_yn: string
    internal_note: string
    last_update_time: string
    creation_time: string
    variable_symbol: string
    total_weight: string
    order_total: string
    order_total_before_round: string
    order_total_rest: string
    invoice_number: string
    origin: string
    customer: {
      email: string
      phone: string
      firstname_invoice: string
      surname_invoice: string
      street_invoice: string
      city_invoice: string
      state_invoice: string
      zip_invoice: string
      country_id_invoice: string
      postal_yn: string
      firstname_postal: string
      surname_postal: string
      street_postal: string
      city_postal: string
      state_postal: string
      zip_postal: string
      country_id_postal: string
      company_postal: string
      company_yn: string
      company: string
      ico: string
      dic: string
      vat_payer_yn: string
      customer_note: string
      agreements: [{
        name: string
        valid_to: string
        status: string
      }]
    }
    products: [{
      product_id: string
      option_set_id: string
      code: string
      code_supplier: string
      ean: string
      title: string
      unit: string
      quantity: string
      price_per_unit: string
      price: string
      price_with_vat: string
      price_without_vat: string
      vat: string
      buy_price: string
      weight: string
      invoice_info: string
      parameters: [{
        name: string
        value: string
      }]
      configurations: [{
        name: string
        values: [{
          value: string
          operation: string
          price: string
        }]
      }]
    }]
    discount_voucher: {
      code: string
      type: string
      amount: string
      discounts: [{
        vat: string
        price: string
      }]
    }
    quantity_discount: {
      type: string
      amount: string
      discounts: [{
        vat: string
        price: string
      }]
    }
    loyalty_points: {
      one_point_for: string
      amount: string
      discounts: [{
        vat: string
        price: string
      }]
    }
    shipment: {
      name: string
      price: string
      vat: string
      affiliate_id: string
    }
    payment: {
      name: string
      price: string
      vat: string
      eet_yn: string
    }
    metas: [{
      key: string
      type: string
      value: string
      values: {
        cs: {
          language: string
          value: string
          /* eslint-enable @typescript-eslint/naming-convention */
        }
      }
    }]
  }];
}
