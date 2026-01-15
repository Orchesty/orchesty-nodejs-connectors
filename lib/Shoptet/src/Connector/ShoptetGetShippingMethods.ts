import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-shipping-methods';

export default class ShoptetGetShippingMethods extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const url = 'api/shipping-methods';

        const response = await this.doRequest(url, dto, null) as IResponse;

        return dto.setNewJsonData(response.data);
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
