import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'allegro-get-available-products-batch';
const LIMIT = 99;

export default class AllegroGetAvailableProductsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('0'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `fulfillment/available-products?offset=${offset}&limit=${LIMIT}`;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.products ?? []);
    if (response.count === LIMIT + 1) {
      dto.setBatchCursor((offset + LIMIT).toString());
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    products: IOutput[];
    count: number;
    totalCount: number;
}

export interface IOutput {
    products: [{
        id: string;
        name: string;
        gtins: string[];
        image: string;
    }];
}

/* eslint-enable @typescript-eslint/naming-convention */
