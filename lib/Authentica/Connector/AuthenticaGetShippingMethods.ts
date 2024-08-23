import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'authentica-get-shipping-methods';

export default class AuthenticaGetShippingMethods extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutputItem[]>> {
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'applinth/delivery-methods',
        );

        const response = (await this.getSender().send<IResponse>(
            requestDto.setTimeout(5000),
            [200],
        )).getJsonBody();

        return dto.setNewJsonData(response.data);
    }

}

export interface IOutputItem {
    id: string;
    title: string;
    type: string;
    shipper: string;
    serviceType: string;
}

interface IResponse {
    data: IOutputItem[];
}
