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
    const url = `order/checkout-forms?offset=${(offset * LIMIT) + offset ? 1 : 0}&limit=${LIMIT}`;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.checkoutForms ?? []);
    if (response.count === LIMIT + 1) {
      dto.setBatchCursor((offset + 1).toString());
    }
    return dto;
  }
}

interface IResponse {
    products: IOutput[];

}
export interface IOutput {

}
