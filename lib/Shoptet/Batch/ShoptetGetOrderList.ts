import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { IOutputJson as IInputJson } from './ShoptetGetOrderPages';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default class ShoptetGetOrderList extends ABatchNode {
  public getName = (): string => 'shoptet-get-order-list';

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const app = this._application as ShoptetPremiumApplication;
    const {
      url,
    } = dto.jsonData as IInputJson;

    const appInstall = await this._getApplicationInstall(dto.user);
    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const res = await this._sender.send(requestDto, [200, 404]);
    const { orders } = (res.jsonBody as IResponseJson).data;
    dto.setItemList(orders.map((item) => ({
      code: item.code,
    })) as IOutputJson[]);

    return dto;
  }
}

interface IShoptetOrderJson {
  code: string;
}

interface IResponseJson {
  data: {
    orders: IShoptetOrderJson[];
  };
}

export interface IOutputJson {
  code: string;
}
