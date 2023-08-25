import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { IOutput } from '../Batch/WooCommerceGetProducts';

export const NAME = 'woocommerce-get-products-by-sku';

export default class WooCommerceGetProductsBySku extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IInput | IOutput>> {
        const { sku } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `wp-json/wc/v3/products?sku=${sku}`,
        );
        const resp = await this.getSender().send<IOutput[]>(req, [200]);

        const responseData = resp.getJsonBody();
        if (!responseData.length) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Product not found [sku=${sku}]`);
            return dto;
        }
        if (responseData.length > 1) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, `More than one product found [sku=${sku}]`);
            return dto;
        }

        return this.setNewJsonData(dto, responseData[0]);
    }

    protected setNewJsonData(dto: ProcessDto, resp: IOutput): ProcessDto<IOutput> {
        return dto.setNewJsonData(resp);
    }

}

export interface IInput {
    sku: string;
}
