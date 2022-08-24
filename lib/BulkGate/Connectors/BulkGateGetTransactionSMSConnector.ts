import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'bulk-gate-get-transaction-sms-connector';

export default class BulkGateGetTransactionSMSConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        return dto.setNewJsonData((await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.POST,
                'transactional',
                dto.getJsonData(),
            ),
            [200],
        )).getJsonBody().data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    number: string;
    text: string;
    sender_id?: string;
    sender_id_value?: string;
    country?: string;
    unicode?: boolean;
}

export interface IOutput {
    status: string;
    part_id: string[];
    number: string;
    channel: string;
    sms_id: string;
    price: number;
    credit: number;
}

interface IResponse {
    data: IOutput;
}

/* eslint-enable @typescript-eslint/naming-convention */
