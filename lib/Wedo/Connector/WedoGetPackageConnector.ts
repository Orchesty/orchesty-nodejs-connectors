import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { IInput, IOutput } from '../../AmazonApps/SellingPartner/Connector/AmazonGetListingsItemConnector';

export const NAME = 'wedo-get-package-connector';

export default class WedoGetPackageConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      '/package',

    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

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
