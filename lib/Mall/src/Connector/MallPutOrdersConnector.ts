import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'mall-put-orders-connector';

export default class MallPutOrdersConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { id, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `orders/${id}`,
            body,
        );
        await this.getSender().send(req, [200]);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string;
    confirmed: boolean;
    status: string;
    first_delivery_attempt: string;
    delivered_at: string;
    tracking_number: string;
    tracking_url: string;

}

/* eslint-enable @typescript-eslint/naming-convention */
