import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import AShoptetList, { IPaging } from './AShoptetList';

export const NAME = 'shoptet-get-orders-list';

export default class ShoptetGetOrdersList extends AShoptetList {
  public getName = (): string => 'shoptet-get-orders-list';

  endpoint = 'api/orders';

  lastRunKey = 'lastRunListOrders';

  protected _processResult = (responseDto: ResponseDto, batchProcessDto: BatchProcessDto): IPaging => {
    const body = (responseDto.jsonBody as IResponseJson).data;
    batchProcessDto.setItemList(body.orders);
    return body.paginator;
  };
}

interface IResponseJson {
  data: {
    orders: IOutputJson[],
    paginator: IPaging
  }
}

export interface IOutputJson {
  code: string,
}
