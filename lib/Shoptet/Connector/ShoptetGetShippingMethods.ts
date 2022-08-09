import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-shipping-methods';

export default class ShoptetGetShippingMethods extends AShoptetConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const url = 'api/shipping-methods';

    const response = await this._doRequest(url, dto) as IResponse;

    dto.jsonData = response.data;

    return dto;
  }
}

export interface IOutput {
  shippingMethods: {
    guid: string;
    name: string;
    description: string;
    shippingCompany: {
      id: number;
      code: string;
      name: string;
    };
    trackingUrl: string;
    visible: boolean;
    priority: number;
    wholesale: boolean;
    logoUrl: string;
  }[];
  wholesaleActive: boolean;
  defaultRetailMethod: string;
  defaultWholesaleMethod: string;
}

interface IResponse {
  data: IOutput;
}
