import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-get-warehouses';

export default class SupplyDoGetWarehouses extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        let url = 'items/warehouse';
        const params = this.uriParams(dto);
        if (params) {
            url = `${url}?${params}`;
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody().data);
    }

    protected uriParams(_dto: ProcessDto<IInput>): string | null {
        // example: 'filter[fullfilment][type]=James&fields[]=*'
        return null;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface Warehouse {
    address: number;
    id: number;
    name: string;
    central: boolean;
    company: number;
    active: boolean;
    contact: string;
    phone: string;
    store: boolean;
    supply_time: string;
    external_id: string;
    fullfilment: number;
    product_batches: (number | string)[];
}

interface IResponse {
    data: Warehouse[];
}

export interface IInput {
}

export type IOutput = Warehouse[];
/* eslint-enable @typescript-eslint/naming-convention */
