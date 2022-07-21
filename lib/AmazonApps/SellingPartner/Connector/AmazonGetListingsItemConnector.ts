import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'amazon-get-listings-item-connector';

export default class AmazonGetListingsItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { sellerId, sku, marketplaceIds } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `listings/2021-08-01/items/${sellerId}/${sku}?marketplaceIds=${marketplaceIds.join(',')}`,

    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput{
  sellerId: string
  sku: string
  marketplaceIds: string[]

}

export interface IOutput{
  sku: string,
    summaries: [
    {
      marketplaceId: string,
      asin: string,
      productType: string,
      conditionType: string,
      status: string[],
      itemName: string,
      createdDate: string,
      lastUpdatedDate: string,
      mainImage: {
        link: string,
        height: number,
        width: number
      }
    }
  ],
    offers: [
    {
      marketplaceId: string,
      offerType: string,
      price: {
        currencyCode: string,
        amount: string
      }
    }
  ],
    fulfillmentAvailability: [
    {
      fulfillmentChannelCode: string,
      quantity: number
    }
  ],
    issues: []
}
