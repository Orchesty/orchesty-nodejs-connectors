import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { getErrorInResponse, NAME as APPLICATION_NAME } from '../MailstepApplication';

export const NAME = `${APPLICATION_NAME}-put-product-connector`;

export default class MailstepPutProductConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...data } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            `product/${id}`,
            data,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, {
            success: StatusCodes.OK,
            stopAndFail: StatusCodes.BAD_REQUEST,
        }, undefined, undefined, getErrorInResponse);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    id: string;
    eshops?: string[];
    productSku?: number;
    internalSku?: number;
    organisation?: string;
    name?: string;
    referenceNumbers?: number[];
    description?: string;
    productGroup?: string;
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    packagingType?: string;
    imeiCheckRequired?: boolean;
    workAroundSnIn?: boolean;
    workAroundEanSticker?: boolean;
    workAroundWarrantyInf?: boolean;
    workAroundLot?: boolean;
    active?: boolean;
    countryOfOrigin?: string;
    hsCode?: string;
    type?: string;
    childrenProducts?: {
        productId: string;
        quantity: number;
    }[];
    category?: string;
    customsDescription?: string;
    requiresAdditionalWork?: boolean;
    requiresQualitativeReceiving?: boolean;
    expectedTurnover?: string;
    expirationOffset?: number;
    localisation?: string[];
    services?: string[];
}

export interface IOutput {
    id: string;
    eshops: string[];
    productSku: number;
    internalSku: number;
    organisation: string;
    name: string;
    referenceNumbers: number[];
    productGroup?: string;
    description?: string;
    images?: string[];
    intImages?: string[];
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    intWeight?: number;
    intHeight?: number;
    intWidth?: number;
    intLength?: number;
    packagingType?: string;
    imeiCheckRequired?: boolean;
    workAroundSnIn?: boolean;
    workAroundEanSticker?: boolean;
    workAroundWarrantyInf?: boolean;
    workAroundLot?: boolean;
    active?: boolean;
    createdAt?: string;
    countryOfOrigin?: string;
    hsCode?: string;
    type?: string;
    childrenProducts?: {
        productId: string;
        quantity: number;
    }[];
    category?: string;
    customsDescription?: string;
    requiresAdditionalWork?: boolean;
    requiresQualitativeReceiving?: boolean;
    expectedTurnover?: string;
    expirationOffset?: number;
    localisation?: string[];
    services?: string[];
    changedAt?: string;
}
