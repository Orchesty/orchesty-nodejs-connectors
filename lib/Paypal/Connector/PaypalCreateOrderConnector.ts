import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'paypal-create-order-connector';

export default class PaypalCreateOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'v2/checkout/orders';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    intent: string;
    purchase_units: {
        amount: {
            currency_code: string;
            value: string;
        }
    }[];
}

export interface IOutput {
    id: string;
    status: string;
    links: {
        href: string;
        rel: string;
        method: string;
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
