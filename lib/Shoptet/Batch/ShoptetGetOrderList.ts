import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { IOutputJson as IInputJson } from './ShoptetGetOrderPages';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default class ShoptetGetOrderList extends AConnector {
  public getName = (): string => 'shoptet-get-order-list';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as ShoptetPremiumApplication;
    const {
      userName,
      url,
    } = dto.jsonData as IInputJson;

    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const res = await this._sender.send(requestDto, [200, 404]);
    const { orders } = (res.jsonBody as IResponseJson).data;
    dto.jsonData = orders.map((item) => ({
      code: item.code,
      userName,
    })) as IOutputJson[];

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
  userName: string;
}