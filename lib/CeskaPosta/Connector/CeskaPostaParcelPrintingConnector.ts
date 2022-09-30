import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'ceska-posta-parcel-printing-connector';

export default class CeskaPostaParcelPrintingConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'parcelPrinting',
            dto.getJsonData(),
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    printingHeader: {
        customerID: string;
        contractNumber: string;
        idForm: number;
        shiftHorizontal: number;
        shiftVertical: number;
        position: number;
    };
    printingData: string [];
}

export interface IOutput {
    printingHeaderResult: {
        printingHeader: {
            customerID: string;
            contractNumber: string;
            idForm: number;
            shiftHorizontal: number;
            shiftVertical: number;
            position: number;
        };
        printingStatusResponse: {
            responseCode: number;
            responseText: string;
        };
    };
    printingDataResult: string;
}
