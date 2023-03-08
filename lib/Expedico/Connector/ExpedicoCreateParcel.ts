import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'expedico-create-parcel';

export default class ExpedicoCreateParcel extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const data = this.getJsonData(dto);

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'parcels',
            JSON.stringify(data),
        );

        const { id, 'carrier-barcode': carrierBarcode, 'carrier-tracking-code': carrierTrackingCode } = (await this.getSender().send(requestDto, [201])).getHeaders();

        return dto.setNewJsonData({
            id,
            carrierBarcode,
            carrierTrackingCode,
        } as IOutput);
    }

    protected getJsonData(dto: ProcessDto<IInput>): IInput {
        return dto.getJsonData();
    }

}

export interface IAddress {
    firstname: string;
    lastname: string;
    city: string;
    zipCode: string;
    street: string;
    streetNumber: string;
    email: string;
    phone: string;
    country: string;
}

export interface IInput {
    data: {
        carrier: string;
        weightInKg: number;
        sender?: IAddress;
        senderId: number;
        recipient: IAddress;
        carrierPickupDate: string;
        orderNumber: string;
    };
}

export interface IOutput {
    id: number;
    carrierBarcode: number;
    carrierTrackingCode: number;
}
