import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';

export const NAME = `${APPLICATION_NAME}-get-product-stock-connector`;

export default class MailstepGetProductStockConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `product-stock/${id}`,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, [StatusCodes.OK]);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    id: string;
}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: string;
    product: string;
    warehouse: string;
    wms: string;
    quantity: number;
    booked?: number;
    bookedAtExpeditions?: number;
    virtualBookedAtExpeditions?: number;
    bookedAtTransfers?: number;
    bookedAtStockChanges?: number;
    available?: number;
    missing?: number;
    missingAtExpeditions?: number;
    missingAtTransfers?: number;
    missingAtStockChanges?: number;
    bookedAtInternalStockChanges?: number;
    missingAtInternalStockChanges?: number;
    required?: number;
    incoming?: number;
    createdAt?: string;
    lots?: {
        id: string;
        lot: string;
        date?: string;
        quantity?: number;
        booked?: number;
        available?: number;
        missing?: number;
        required?: number;
        createdAt?: string;
        changedAt?: string;
    }[];
    changedAt?: string;
    'productProductGroup.id'?: string;
    'productProductGroup.name'?: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}
