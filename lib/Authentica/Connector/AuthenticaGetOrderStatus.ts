import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'authentica-get-order-status';

export default class AuthenticaGetOrderStatus extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutputItem[]>> {
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'order-statuses',
        );

        const response = (await this.getSender().send<IResponse>(requestDto, [200])).getJsonBody();

        return dto.setNewJsonData(response.data);
    }

}

export interface IOutputItem {
    id: string;
    title: string;
}

interface IResponse {
    data: IOutputItem[];
}
