import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { getErrorInResponse, NAME as APPLICATION_NAME } from '../FapiApplication';

export const NAME = `${APPLICATION_NAME}-post-invoice-label-connector`;

export default class FapiPostInvoiceLabelConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, labels } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `invoice-labels/${id}`,
            {
                labels,
            },
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, {
            success: StatusCodes.OK,
            stopAndFail: [StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND],
        }, undefined, undefined, getErrorInResponse);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    id: number;
    labels: string[];
}

export interface IOutput {
    status: string;
    message: string;
    invoice_id: number,
    labels: number[];
}
