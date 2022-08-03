import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShopifyApplication from '../ShopifyApplication';

const LIST_PAGE_ENDPOINT = 'admin/api/2021-07/orders.json?status=any&fulfillment_status=unfulfilled&fields=id';
const GET_DETAIL_ENDPOINT = 'admin/api/2021-07/orders/{orderId}.json?status=any';

export default class ShopifyGetOrderList extends ABatchNode {
  public getName = (): string => 'shopify-get-order-list';

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const app = this._application as ShopifyApplication;
    const {
      from,
    } = dto.jsonData as IInputJson;
    let url = dto.getBatchCursor(LIST_PAGE_ENDPOINT);
    if (from) {
      const separatorChar = url.includes('?') ? '&' : '?';
      url = `${url}${separatorChar}created_at_min=${from}`;
    }
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

    const res = await this._sender.send(requestDto);
    const { orders } = res.jsonBody as IResponseJson;

    let lastId = '';

    const splitOrders: IOutputJson[] = [];

    orders.forEach((order) => {
      splitOrders.push({
        id: order.id,
        url: GET_DETAIL_ENDPOINT.replace('{orderId}', order.id),
      });
      lastId = order.id;
    });

    const data: IOutputJson[] = splitOrders;
    if (orders.length >= 250) {
      dto.setBatchCursor(`${LIST_PAGE_ENDPOINT}&since_id=${lastId}`);
    }
    dto.setItemList(data);

    return dto;
  }
}

interface IInputJson {
  from: string,
}

interface IResponseJson {
  orders: {
    id: string,
  }[];
}

export interface IOutputJson {
  url: string,
  id: string,
}
