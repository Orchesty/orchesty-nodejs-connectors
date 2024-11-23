import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'ceska-posta-parcel-status-connector';

export default class CeskaPostaParcelStatusConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'parcelStatus',
            dto.getJsonData(),
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    parcelIds: string [];
    language: string;
}

export interface IOutput {
    detail: {
        idParcel: string;
        parcelType: string;
        weight: string;
        amount: string;
        currency: string;
        parcelsQuantity: string;
        depositTo: string;
        timeDeposit: string;
        countryOfOrigin: string;
        countryOfDestination: string;
        parcelStatuses: {
            id: string;
            date: string;
            text: string;
            postCode: string;
            name: string;
        }[];
    } [];
}
