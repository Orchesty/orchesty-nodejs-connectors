import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mall-get-order-detail-connector';

export default class MallGetOrderDetailConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { orderId } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `orders/${orderId}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;
    dto.jsonData = response.data;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse{
  'result': {
    'code': number,
    'status': string
  },
  'data': IOutput[]
}

export interface IInput{
  orderId: string
}

export interface IOutput{
  'id': number,
  'purchase_id': number,
  'cod': number,
  'ship_date': string,
  'delivered_at': string,
  'status': string,
  'confirmed': boolean,
  'test': boolean,
  'mdp': boolean,
  'mdp_classic': boolean,
  'mdp_spectrum': boolean,
  'shipped': string,
  'shipping': string,
  'open': string,
  'blocked': string,
  'lost': string,
  'returned': string,
  'cancelled': string,
  'delivered': string,
  'external_order_id': number,
  'currency': string,
  'delivery_price': number,
  'cod_price': number,
  'discount': number,
  'delivery_method': string,
  'delivery_method_id': number,
  'branch_id': number,
  'branches': {
    'branch_id': number,
    'secondary_branch_id': number,
    'overridden': boolean,
    'last_change': string
  },
  'tracking_number': string,
  'ready_to_return': boolean,
  'address': {
    'name': string,
    'company': string,
    'phone': number,
    'email': string,
    'street': string,
    'city': string,
    'zip': number,
    'country': string,
    'customer_id': number
  },
  'items': [
    {
      'id': string,
      'article_id': number,
      'title': string,
      'quantity': number,
      'price': number,
      'purchase_price': number,
      'vat': number,
      'commission': number,
      'serial_numbers': string[]
    }
  ],
  'ulozenka_status_history': [
    {
      'id': number,
      'name': string,
      'date': string
    }
  ],
  'consignment_status_history': [
    {
      'code': string,
      'date': string,
      'flags': string[],
      'tracking_number': string
    }
  ]
}

/* eslint-enable @typescript-eslint/naming-convention */
