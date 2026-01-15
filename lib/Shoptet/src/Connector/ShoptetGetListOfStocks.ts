import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-list-of-stocks';

export default class ShoptetGetListOfStocks extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const response = await this.doRequest('api/stocks', dto, null) as IResponse;

        return dto.setNewJsonData(response.data);
    }

}

interface IResponse {
    data: IStocks;
}

export interface IStocks {
    stocks: {
        id: number;
        title: string;
        isDeliveryPoint: boolean;
        deliveryPointTitle: string;
        deliveryPointAddress: string;
    }[];
    defaultStockId: number;
}

export type IOutput = IStocks;
