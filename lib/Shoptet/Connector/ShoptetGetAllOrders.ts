import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-all-orders';

export default class ShoptetGetAllOrders extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<{ from: string }>): Promise<ProcessDto<IOutput>> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        let url = 'api/orders/snapshot';

        const creationTimeFrom = from || ShoptetPremiumApplication.shoptetDateISO(
            appInstall.getNonEncryptedSettings().lastRunAllOrders,
        );

        if (creationTimeFrom) {
            url = `${url}&creationTimeFrom=${creationTimeFrom}`;
        }

        const response = await this.doRequest(url, dto) as IResponse;

        return dto.setNewJsonData(response.data);
    }

}

interface IResponse {
    data: IOutput;
}

export interface IOutput {
    jobId: string;
}
