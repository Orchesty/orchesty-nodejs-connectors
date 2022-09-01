import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const NAME = 'authentica-put-products';

export default class AuthenticaPutProducts extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const products = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            'products',
            products,
        );

        const response = await this.getSender().send<IResponse>(requestDto);
        if (response.getResponseCode() >= 500) {
            throw new OnRepeatException();
        } else if (response.getResponseCode() >= 300) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, response.getBody());
        } else {
            dto.setNewJsonData(response.getJsonBody().data);
        }

        return dto;
    }

}

export interface IProduct {
    productId: string;
    sku: string;
    name: string;
    englishName: string | null;
    ean: string;
    width: number | null;
    widthUnit: string | null;
    height: number | null;
    heightUnit: string | null;
    length: number | null;
    lengthUnit: string | null;
    weight: number | null;
    weightUnit: string | null;
}

interface IResponse {
    data: IProduct[];
}

export type IInput = IProduct[];

export type IOutput = IInput;
