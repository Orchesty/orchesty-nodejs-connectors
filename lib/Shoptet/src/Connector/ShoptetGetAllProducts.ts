import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-all-products';

export default class ShoptetGetAllProducts extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<{ from: string }>): Promise<ProcessDto<IOutput>> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        let url = 'api/products/snapshot';

        const creationTimeFrom = from || ShoptetPremiumApplication.shoptetDateISO(
            appInstall.getNonEncryptedSettings().lastRunListProductChanges,
        );

        if (creationTimeFrom) {
            url = `${url}?creationTimeFrom=${creationTimeFrom}`;
        }

        const response = await this.doRequest(url, dto) as IResponse;

        appInstall.addNonEncryptedSettings({ lastRunListProductChanges: new Date() });
        await this.getDbClient().getApplicationRepository().update(appInstall);

        return dto.setNewJsonData(response.data);
    }

}

interface IResponse {
    data: IOutput;
}

export interface IOutput {
    jobId: string;
}
