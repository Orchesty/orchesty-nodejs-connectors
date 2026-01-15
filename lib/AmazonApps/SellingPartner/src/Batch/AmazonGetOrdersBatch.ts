import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'amazon-get-orders-batch';

export default class AmazonGetOrdersBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { marketplaceIds } = dto.getJsonData();

        const token = dto.getBatchCursor('');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `orders/v0/orders?MarketplaceIds=${marketplaceIds.join(',')}${token}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.payload.Orders ?? []);
        if (response.payload.NextToken) {
            const nextToken = `&NextToken=${response.payload.NextToken}`;
            dto.setBatchCursor(nextToken);
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    marketplaceIds: string[];
}

export interface IOutput {
    payload: {
        NextToken: string;
        Orders: {
            AmazonOrderId: string;
            PurchaseDate: string;
            LastUpdateDate: string;
            OrderStatus: string;
            FulfillmentChannel: string;
            NumberOfItemsShipped: number;
            NumberOfItemsUnshipped: number;
            PaymentMethod: string;
            PaymentMethodDetails: string[];
            MarketplaceId: string;
            ShipmentServiceLevelCategory: string;
            OrderType: string;
            EarliestShipDate: string;
            LatestShipDate: string;
            IsBusinessOrder: boolean;
            IsPrime: boolean;
            IsAccessPointOrder: boolean;
            IsGlobalExpressEnabled: boolean;
            IsPremiumOrder: boolean;
            IsSoldByAB: boolean;
            IsIBA: boolean;
            ShippingAddress: {
                Name: string;
                AddressLine1: string;
                City: string;
                StateOrRegion: string;
                PostalCode: string;
                CountryCode: string;
            };
            BuyerInfo: {
                BuyerEmail: string;
                BuyerName: string;
                BuyerTaxInfo: {
                    CompanyLegalName: string;
                };
                PurchaseOrderNumber: string;
            };
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
