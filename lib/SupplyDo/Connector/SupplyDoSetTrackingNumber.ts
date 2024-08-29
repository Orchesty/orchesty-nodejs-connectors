import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IOutput } from './SupplyDoGetSellingOrder';

export const NAME = 'supply-do-set-tracking-number';

export default class SupplyDoSetTrackingNumber extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...body } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PATCH,
            `items/selling_order/${id}?fields[]=*&fields[]=transport.*`,
            body,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: string;
    transport: {
        id: number;
        tracking_number: string;
    }
    /* eslint-enable @typescript-eslint/naming-convention */
}
