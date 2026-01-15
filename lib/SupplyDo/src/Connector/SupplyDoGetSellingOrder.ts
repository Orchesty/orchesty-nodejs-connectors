import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-get-selling-order';

export default class SupplyDoGetSellingOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `items/selling_order/${id}?fields[]=*&fields[]=transport.*`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return this.processResponseData(dto, resp.getJsonBody());
    }

    protected processResponseData(dto: ProcessDto, response: IOutput): ProcessDto<IOutput> {
        return dto.setNewJsonData(response);
    }

}

export interface IInput {
    id: string;
}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    data: {
        customer: number;
        id: string;
        payment_type: string;
        external_id: string;
        ecommerce: number;
        order_number: string;
        date_created: string;
        date_updated: string;
        transport: {
            carrier: number;
            id: number;
            tracking_number: string;
            ecommerce: number;
        }
    }
    /* eslint-enable @typescript-eslint/naming-convention */
}
