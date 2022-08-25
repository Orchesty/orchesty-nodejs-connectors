import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'go-balik-order-list-connector';

export default class GObalikOrderListConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { from, to, id } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `order?from=${from}&to=${to}&id=${id}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    from: string;
    to: string;
    id: string;
}

export interface IOutput {
    hash: string;
    id: string;
    pack_number: string;
    price: number;
    pick_up_date: string;
    carrier_name: string;
    reference_number: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
