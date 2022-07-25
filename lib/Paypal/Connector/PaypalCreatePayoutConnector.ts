import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'paypal-create-payout-connector';

export default class PaypalCreatePayoutConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'v1/payments/payouts';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    sender_batch_header: {
        email_subject: string;
        email_message: string;
    };
    items: [{
        recipient_type: string;
        amount: {
            value: string;
            currency: string;
        };
        note: string;
        sender_item_id: string;
        receiver: string;
    }];
}

export interface IOutput {
    batch_header: {
        sender_batch_header: {
            sender_batch_id: string;
            email_subject: string;
            email_message: string;
        };
        payout_batch_id: string;
        batch_status: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
