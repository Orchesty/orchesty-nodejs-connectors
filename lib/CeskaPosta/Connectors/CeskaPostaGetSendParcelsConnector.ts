import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'ceska-posta-get-send-parcels-connector';

export default class CeskaPostaGetSendParcelsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { idTransaction } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `sendParcels/idTransaction/${idTransaction}`,
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    idTransaction: string;
}

export interface IOutput {
    StatusResponseList: {
        responseCode: number;
        responseText: string;
    }[];
    ResultSendParcelsList: {
        recordNumber: string;
        parcelCode: string;
        parcelStateResponse: {
            responseCode: number;
            responseText: string;
        }[];
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
