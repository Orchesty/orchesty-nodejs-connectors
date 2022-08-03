import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AShoptetConnector from './AShoptetConnector';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export const NAME = 'shoptet-get-all-products';

export default class ShoptetGetAllProducts extends AShoptetConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { from } = dto.jsonData as { from: string };
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    let url = 'api/products/snapshot';

    const creationTimeFrom = from || ShoptetPremiumApplication.shoptetDateISO(
      appInstall.getNonEncryptedSettings().lastRunAllProducts,
    );

    if (creationTimeFrom) {
      url = `${url}&creationTimeFrom=${creationTimeFrom}`;
    }

    const response = await this._doRequest(url, dto) as IResponse;

    dto.jsonData = response.data;

    return dto;
  }
}

interface IResponse {
  data: IOutput
}

export interface IOutput {
  jobId: string
}