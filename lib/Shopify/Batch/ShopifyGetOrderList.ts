import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ShopifyApplication from '../ShopifyApplication';

const LIST_PAGE_ENDPOINT = 'admin/api/2021-07/orders.json?status=any&fulfillment_status=unfulfilled&fields=id';
const GET_DETAIL_ENDPOINT = 'admin/api/2021-07/orders/{orderId}.json?status=any';

export default class ShopifyGetOrderList extends AConnector {
  public getName = (): string => 'shopify-get-order-list';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as ShopifyApplication;
    const { userName, from } = dto.jsonData as IInputJson;
    let url = dto.getBatchCursor(LIST_PAGE_ENDPOINT);
    if (from) {
      const separatorChar = url.includes('?') ? '&' : '?';
      url = `${url}${separatorChar}created_at_min=${from}`;
    }
    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

    const res = await this._sender.send(requestDto);
    const { orders } = res.jsonBody as IResponseJson;

    let lastId = '';

    const splitOrders: IOutputJson[] = [];

    orders.forEach((order) => {
      splitOrders.push({ userName, id: order.id, url: GET_DETAIL_ENDPOINT.replace('{orderId}', order.id) });
      lastId = order.id;
    });

    const data: IOutputJson[] = splitOrders;
    if (orders.length >= 250) {
      dto.setBatchCursor(`${LIST_PAGE_ENDPOINT}&since_id=${lastId}`);
    }
    dto.jsonData = data;

    return dto;
  }
}

interface IInputJson {
  userName: string,
  from: string,
}

interface IResponseJson {
  orders: [{
    id: string,
  }]
}

export interface IOutputJson {
  userName: string,
  url: string,
  id: string,
}
