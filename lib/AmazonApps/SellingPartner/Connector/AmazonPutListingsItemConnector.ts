import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'amazon-put-listings-item-connector';

export default class AmazonPutListingsItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const {
      sellerId, sku, marketplaceIds, ...body
    } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      `listings/2021-08-01/items/${sellerId}/${sku}?marketplaceIds=${marketplaceIds.join(',')}`,
      body,

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
  productType: string,
  requirements: string,
  attributes: {
    additionalProp1: object
  }
}

export interface IOutput{
  sku: string,
  status: string,
  submissionId: string,
  issues: []
}
