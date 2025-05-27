import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';

export const NAME = `${APPLICATION_NAME}-get-stock-advice-connector`;

export default class MailstepGetStockAdviceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `stock-advice/${id}`,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, [StatusCodes.OK]);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    id: string;
}

export interface IOutput {
    id: string;
    organisation: string;
    warehouse: string;
    wms: string;
    supplier: string;
    status: string;
    internalId: string;
    expectedAt: string;
    user?: string;
    packagingUnit?: string;
    countOfUnits?: number;
    manualInput?: boolean;
    items?: {
        id: string;
        stockAdvice: string;
        product: string;
        quantity: number;
        bookStockAdvices?: {
            id?: string;
            createdAt?: string;
            expeditionItem?: string;
            quantity?: number;
        }[];
        blocked?: number;
        position?: number;
        suppliedQuantity?: number;
        ref1?: string;
        ref2?: string;
        ref3?: string;
        unitPurchasePrice?: number;
        unitPurchasePriceCurrency?: string;
    }[];
    note?: string;
    wmsInternalId?: string;
    mailwiseInternalId?: string;
    receivingBegunAt?: string;
    unloadingBegunAt?: string;
    arrivedAt?: string;
    createdAt?: string;
    countOfItems?: number;
    countOfSku?: number;
    sumOfQuantity?: number;
    sumOfSuppliedQuantity?: number;
    errors?: {
        message?: string;
        propertyPath?: string;
        code?: string;
        parameters?: object;
    }[];
    ref1?: string;
    ref2?: string;
    ref3?: string;
    type?: string;
    changedAt?: string;
}
