import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'paypal-create-payout-connector';

export default class PaypalCreatePayoutConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'v1/payments/payouts';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    sender_batch_header: {
        email_subject: string;
        email_message: string;
    };
    items: {
        recipient_type: string;
        amount: {
            value: string;
            currency: string;
        };
        note: string;
        sender_item_id: string;
        receiver: string;
    }[];
}

export interface IOutput {
    batch_header: {
        sender_batch_header: {
            email_subject: string;
            email_message: string;
        };
        payout_batch_id: string;
        batch_status: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
