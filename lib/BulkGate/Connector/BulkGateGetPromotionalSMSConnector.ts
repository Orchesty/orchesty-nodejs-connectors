import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'bulk-gate-get-promotional-sms-connector';

export default class BulkGateGetPromotionalSMSConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutputItem[]>> {
        return dto.setNewJsonData((await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.POST,
                'promotional',
                dto.getJsonData(),
            ),
            [200],
        )).getJsonBody().data.response);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    unicode?: boolean;
    sender_id?: string;
    sender_id_value?: string;
    country?: string;
    schedule?: string;
    number: string;
    text: string;
}

export interface IOutputItem {
    status: string;
    part_id: string[];
    number: string;
    channel: string;
    sms_id: string;
    price: number;
    credit: number;
}

interface IResponse {
    data: {
        response: IOutputItem[];
        total: {
            price: number;
            status: {
                accepted: number;
                blacklisted: number;
                error: number;
                invalid_number: number;
                invalid_sender: number;
                scheduled: number;
                sent: number;
            };
        };
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
