import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';

export const NAME = `${APPLICATION_NAME}-get-supplier-connector`;

export default class MailstepGetSupplierConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `supplier/${id}`,
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
    name: string;
    companyName: string;
    active: boolean;
    firstName?: string;
    lastName?: string;
    degree?: string;
    degree2?: string;
    street?: string;
    houseNr?: string;
    city?: string;
    zip?: number;
    country?: string;
    phone?: string;
    email?: string;
    registrationNumber?: number;
    vatNumber?: string;
    note?: string;
    createdAt?: string;
    ref1?: string;
    ref2?: string;
    ref3?: string;
    changedAt?: string;
}
