import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IVariant } from '../Batch/WooCommerceGetVariants';

export const NAME = 'woo-commerce-update-product-variant';

export default class WooCommerceUpdateProductVariant extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { productId, id, ...rest } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            `wp-json/wc/v3/products/${productId}/variations/${id}`,
            JSON.stringify(rest),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput extends Partial<IVariant> {
    id: number;
    productId: number;
}

type IResponse = IVariant;

export type IOutput = IVariant;
