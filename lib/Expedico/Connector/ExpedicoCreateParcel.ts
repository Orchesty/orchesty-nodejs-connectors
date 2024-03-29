import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { IResultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'expedico-create-parcel';

export default class ExpedicoCreateParcel extends AConnector {

    protected errorCodes: IResultRanges = { success: 201, stopAndFail: 422 };

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
            data,
        );

        return this.setJsonData(
            dto,
            await this.getSender().send(requestDto, this.errorCodes),
            dto.getJsonData(),
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected setJsonData(dto: ProcessDto, response: ResponseDto, data: IInput): ProcessDto<IOutput> {
        const { id,
            'carrier-barcode': carrierBarcode,
            'carrier-tracking-code': carrierTrackingCode,
        } = response.getHeaders();

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
    data: IData;
}

export interface IData {
    orderNumber: string;
    weightInKg: number;
    senderId: number;
    recipient: IAddress;
    carrierPickupDate: string;
    carrier?: string;
    sender?: IAddress;
    currency?: string;
    codAmount?: number;
    pickupPoint?: number;
}

export interface IOutput {
    id: number;
    carrierBarcode: number;
    carrierTrackingCode: number;
}
