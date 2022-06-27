import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import UpgatesApplication from '../UpgatesApplication';

const UPDATE_STOCK_ENDPOINT = 'api/v2/products';

export const NAME = 'upgates-update-stock';

export default class UpgatesUpdateStock extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as UpgatesApplication;
    const {
      userName,
      data,
    } = dto.jsonData as IInputJson;

    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      UPDATE_STOCK_ENDPOINT,
      JSON.stringify(data),
    );

    const { products } = (await this._sender.send(requestDto)).jsonBody as IResponseJson;

    dto.jsonData = products;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IInputJson {
  userName: string;
  data: IUpdateStock;
}

interface IUpdateStock {
  products: [{
    code: string,
    stock: number
  }];
}

interface IResponseJson {
  products: [{
    code: string,
    updated_yn: boolean
  }];
}
