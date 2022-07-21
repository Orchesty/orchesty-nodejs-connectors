import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'amazon-get-orders-connector';

export default class AmazonGetOrdersConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { marketplaceIds } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `orders/v0/orders?marketplaceIds=${marketplaceIds.join(',')}`,

    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput{
  marketplaceIds: string[]
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput{
  payload: {
    NextToken: string,
    Orders: [
      {
        AmazonOrderId: string,
        PurchaseDate: string,
        LastUpdateDate: string,
        OrderStatus: string,
        FulfillmentChannel: string,
        NumberOfItemsShipped: number,
        NumberOfItemsUnshipped: number,
        PaymentMethod: string,
        PaymentMethodDetails: string[],
        MarketplaceId: string,
        ShipmentServiceLevelCategory: string,
        OrderType: string,
        EarliestShipDate: string,
        LatestShipDate: string,
        IsBusinessOrder: boolean,
        IsPrime: boolean,
        IsAccessPointOrder: boolean,
        IsGlobalExpressEnabled: boolean,
        IsPremiumOrder: boolean,
        IsSoldByAB: boolean,
        IsIBA: boolean,
        ShippingAddress: {
          Name: string,
          AddressLine1: string,
          City: string,
          StateOrRegion: string,
          PostalCode: string,
          CountryCode: string
        },
        BuyerInfo: {
          BuyerEmail: string,
          BuyerName: string,
          BuyerTaxInfo: {
            CompanyLegalName: string
          },
          PurchaseOrderNumber: string
        }
      }
    ]
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
