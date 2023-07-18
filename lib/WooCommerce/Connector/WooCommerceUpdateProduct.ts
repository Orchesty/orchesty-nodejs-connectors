import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { defaultRanges, IResultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IOutput as IInput } from '../Batch/WooCommerceGetProducts';

export const NAME = 'woo-commerce-update-product';

export default class WooCommerceUpdateProduct extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...rest } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            `wp-json/wc/v3/products/${id}`,
            JSON.stringify(rest),
        );
        const resp = await this.getSender().send<IResponse>(req, this.getCodeRanges());

        return dto.setNewJsonData(resp.getJsonBody());
    }

    protected getCodeRanges(): IResultRanges {
        return defaultRanges;
    }

}

type IResponse = IInput;

type IOutput = IInput;
