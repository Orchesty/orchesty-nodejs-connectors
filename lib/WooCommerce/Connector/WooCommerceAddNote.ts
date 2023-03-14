import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IResponseJson as IOutput } from '../Batch/WooCommerceGetOrders';

export const NAME = 'woocommerce-add-note';

export default class WooCommerceAddNote extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...data } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `wp-json/wc/v3/orders/${id}/notes`,
            JSON.stringify(data),
        );

        return dto.setNewJsonData((await this.getSender().send<IOutput>(requestDto, [200])).getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: number;
    author?: string;
    date_created?: Date;
    date_created_gmt?: Date;
    note?: string;
    customer_note?: boolean;
    added_by_user?: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
