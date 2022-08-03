import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import AShoptetList, { IPaging } from './AShoptetList';

export const NAME = 'shoptet-get-products-list';

export default class ShoptetGetProductsList extends AShoptetList {
  public getName = (): string => NAME;

  endpoint = 'api/products';

  lastRunKey = 'lastRunListProducts';

  protected _processResult = (responseDto: ResponseDto, batchProcessDto: BatchProcessDto): IPaging => {
    const body = (responseDto.jsonBody as IResponseJson).data;
    batchProcessDto.setItemList(body.products);
    return body.paginator;
  };
}

interface IResponseJson {
  data: {
    products: IOutputJson[],
    paginator: IPaging
  }
}

export interface IOutputJson {
  guid: string
}
