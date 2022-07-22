import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';

export const NAME = 'wedo-get-package-batch';

export default class WedoGetPackageConnector extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      '/package',

    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput[];

    dto.setItemList(response);

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
  order_number: string,
  reference_number: string,
  barcode: string[],
  sorting_code: string,
  product_name: string,
  delivery_price: number,
}
/* eslint-enable @typescript-eslint/naming-convention */
