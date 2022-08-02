import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'katana-create-customer-connector';

export default class KatanaCreateCustomerConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'customers',
        dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    name: string,
    first_name: string,
    last_name: string,
    company: string,
    email: string,
    phone: string,
    currency: string,
    comment: string,
    addresses: {
        entity_type: string,
        default: boolean,
        first_name: string,
        last_name: string,
        company: string,
        phone: string,
        line_1: string,
        line_2: string,
        city: string,
        state: string,
        zip: string,
        country: string
    }[]
}

export interface IOutput {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    company: string;
    email: string;
    comment: string;
    phone: string;
    currency: string;
    created_at: string;
    updated_at: string;
    default_billing_id: number;
    default_shipping_id: number;
    Address: {
        id: number;
        customer_id: number;
        entity_type: string;
        first_name: string;
        last_name: string;
        company: string;
        phone: string;
        line_1: string;
        line_2: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        updated_at: string;
        created_at: string;
    }[]
}

/* eslint-enable @typescript-eslint/naming-convention */
