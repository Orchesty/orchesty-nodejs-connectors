import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'servant-get-warehouses';

export default class ServantGetWarehouses extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput[]>> {
        const requestDto = new RequestDto(
            'https://www.webskladservant.cz/impl/SAPI/rest.php?type=warehouses',
            HttpMethods.GET,
            dto,
        );

        const resp = await this.getSender().send<IOutput[]>(requestDto);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    id: string;
    name: string;
}
