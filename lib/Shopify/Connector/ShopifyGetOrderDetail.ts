import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { IOutputJson as IInputJson } from '../Batch/ShopifyGetOrderList';
import ShopifyApplication from '../ShopifyApplication';

export default class ShopifyGetOrderDetail extends AConnector {
  public getName = (): string => 'shopify-get-order-detail';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as ShopifyApplication;
    const {
      url,
    } = dto.jsonData as IInputJson;

    const order: IResponseJson = await this._doRequest(app, url, dto);

    dto.jsonData = {
      ...order,
    };

    return dto;
  }

  private async _doRequest(
    app: ShopifyApplication,
    url: string,
    dto: ProcessDto,
  ): Promise<IResponseJson> {
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);
    const res = await this._sender.send(requestDto, [200, 404]);

    return res.jsonBody as IResponseJson;
  }
}

interface IOrderJson {
  order: {
    id: string;
    /* eslint-disable @typescript-eslint/naming-convention */
    created_at: string;
    shipping_address: {
      first_name: string;
      address1: string;
      phone: string;
      city: string;
      zip: string;
      province: string;
      country: string;
      last_name: string;
      address2: string;
      company: string | null;
      latitude: number;
      longitude: number;
      name: string;
      country_code: string;
      province_code: string;
    };
    billing_address: {
      first_name: string;
      address1: string;
      phone: string;
      city: string;
      zip: string;
      province: string;
      country: string;
      last_name: string;
      address2: string;
      company: string | null;
      latitude: number;
      longitude: number;
      name: string;
      country_code: string;
      province_code: string;
    };
    customer: {
      name: string;
      city: string;
      country_code: string;
      province_code: string;
      zip: string;
      phone: string;
      company: string | null;
      address1: string;
      address2: string;
      default_address: {
        first_name: string;
        address1: string;
        phone: string;
        city: string;
        zip: string;
        province: string;
        country: string;
        last_name: string;
        address2: string;
        company: string | null;
        latitude: number;
        longitude: number;
        name: string;
        country_code: string;
        province_code: string;
      };
    };
    total_price: string;
    total_shipping_price_set: {
      shop_money: {
        amount: string;
        currency_code: string;
      };
    };
    order_number: number;
    note_attributes: [
      {
        name: string;
        value: string;
      }
    ];
    line_items: [
      {
        sku: string;
        quantity: number;
        price: number;
        variant_id: number;
      }
    ];
    cancelled_at: string;
    currency: string;
    shipping_lines: [
      {
        title: string;
      }
    ];
    payment_gateway_names: string[];
    gateway: string;
    financial_status: string;
    contact_email: string;
    email: string;
    refunds: [
      {
        refund_line_items: [
          {
            quantity: number;
            line_item: {
              variant_id: number;
            };
          }
        ];
      }
    ];
    source_name: string;
    /* eslint-enable @typescript-eslint/naming-convention */
  };
}

type IResponseJson = IOrderJson;
