import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IResponseJson as IOutput } from '../Batch/WooCommerceGetOrders';

export const NAME = 'woocommerce-update-order';

export default class WooCommerceUpdateOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...data } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            `wp-json/wc/v3/orders/${id}`,
            JSON.stringify(data),
        );

        return dto.setNewJsonData((await this.getSender().send<IOutput>(requestDto, [200])).getJsonBody());
    }

}

export interface IInput {
    id: number;
}
