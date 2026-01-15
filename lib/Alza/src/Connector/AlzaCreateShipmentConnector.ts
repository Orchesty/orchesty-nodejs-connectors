import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AlzaApplication from '../AlzaApplication';

export const NAME = 'alza-create-shipment-connector';
export const CREATE_SHIPMENT_URL = 'shipment';

export default class AlzaCreateShipmentConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const app = this.getApplication<AlzaApplication>();
        const requestDto = app.getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            CREATE_SHIPMENT_URL,
            dto.getData(),
        );
        const response = await this.getSender().send<IResponseJson>(requestDto, [200, 404]);
        const responseBody = response.getJsonBody();
        if (responseBody.errorCode < 0) {
            throw new Error(
                `Response return error code [${responseBody.errorCode}] and error message [${responseBody.errorMessage}]`,
            );
        }

        return dto;
    }

}

interface IResponseJson {
    errorCode: number;
    errorMessage: string;
}
