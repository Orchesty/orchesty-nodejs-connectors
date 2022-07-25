import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'fakturaonline-get-invoice-connector';

export default class FakturaonlineGetInvoiceConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const { id } = dto.jsonData as IInput;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `invoices/${id}`,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IResponce;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string
}

export interface IOutput {
    id: IResponce
}

export interface IResponce {
    buyer: {
        company_number: string,
        country_code: string,
        id: number,
        show_iban: boolean,
    },
    created_at: string,
    currency: string,
    design: string,
    due_in_api: string,
    due_on: string,
    eet: {
        locked?: boolean,
    },
    eet_invoice: boolean,
    eet_state: string,
    id: number,
    is_accessible: boolean,
    issued_on: string,
    kind: string,
    language: string,
    lines: [
        {
            description: string,
            id: number,
            invoice_id: number,
            price: string,
            quantity: string,
            vat_rate: string
        },
        {
            description: string,
            id: number,
            invoice_id: number,
            price: string,
            quantity: string,
            vat_rate: string
        },
        {
            description: string,
            id: number,
            invoice_id: number,
            price: string,
            quantity: string,
            vat_rate: string
        }
    ],
    locked?: boolean,
    means_of_payment: string,
    number: string,
    paid: boolean,
    payment_symbol: string,
    rounding_type: string,
    seller: {
        company_number: string,
        country_code: string,
        id: number,
        name: string,
        show_iban: boolean,
    },
    seller_company_id: string,
    show_qr_code: boolean,
    site: string,
    state: string,
    stateful_invoice: boolean,
    subscription_id: number,
    tax_point_on: string,
    total_float: number,
    updated_at: string,
    vat_calculation: string,
    vat_totals_currency: string,
    vat_totals_currency_conversion: boolean
}

/* eslint-enable @typescript-eslint/naming-convention */
