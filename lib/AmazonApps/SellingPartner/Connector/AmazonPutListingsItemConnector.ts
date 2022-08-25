import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'amazon-put-listings-item-connector';

export default class AmazonPutListingsItemConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const {
            sellerId, sku, marketplaceIds, ...body
        } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `listings/2021-08-01/items/${sellerId}/${sku}?marketplaceIds=${marketplaceIds.join(',')}`,
            body,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    sellerId: string;
    sku: string;
    marketplaceIds: string[];
    productType: string;
    requirements: string;
    attributes: {
        additionalProp1: object;
    };
}

export interface IOutput {
    sku: string;
    status: string;
    submissionId: string;
    issues: [];
}
