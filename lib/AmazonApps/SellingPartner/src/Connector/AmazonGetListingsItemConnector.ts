import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'amazon-get-listings-item-connector';

export default class AmazonGetListingsItemConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { sellerId, sku, marketplaceIds } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `listings/2021-08-01/items/${sellerId}/${sku}?marketplaceIds=${marketplaceIds.join(',')}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    sellerId: string;
    sku: string;
    marketplaceIds: string[];

}

export interface IOutput {
    sku: string;
    summaries: [
        {
            marketplaceId: string;
            asin: string;
            productType: string;
            conditionType: string;
            status: string[];
            itemName: string;
            createdDate: string;
            lastUpdatedDate: string;
            mainImage: {
                link: string;
                height: number;
                width: number;
            };
        },
    ];
    offers: [
        {
            marketplaceId: string;
            offerType: string;
            price: {
                currencyCode: string;
                amount: string;
            };
        },
    ];
    fulfillmentAvailability: [
        {
            fulfillmentChannelCode: string;
            quantity: number;
        },
    ];
    issues: [];
}
