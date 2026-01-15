import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-create-return';

export default class SupplyDoCreateReturn extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'items/return',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    data: ISellingOrderHistory[];
}

export type IInput = ISellingOrderHistory | ISellingOrderHistory[];

export interface ISellingOrderHistory {
    ecommerce: number;
    return_number: string;
    history:
    {
        date: string;
        id?: number;
        return: string;
        type: string;
    }[];
    products: string[];
    id?: number;
}
/* eslint-enable @typescript-eslint/naming-convention */
