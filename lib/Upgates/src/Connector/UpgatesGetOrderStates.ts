import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'upgates-get-order-states';
const GET_ORDER_STATES_ENDPOINT = 'api/v2/orders/states';

export default class UpgatesGetOrderStates extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            GET_ORDER_STATES_ENDPOINT,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    states: {
        id: number;
        type: string;
        color: string;
        names: Record<string, string>;
    }[];
}
