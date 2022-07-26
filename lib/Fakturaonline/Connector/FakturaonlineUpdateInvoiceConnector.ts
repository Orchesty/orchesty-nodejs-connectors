import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'fakturaonline-update-invoice-connector';

export default class FakturaonlineUpdateInvoiceConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { id } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      `invoices/${id}`,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string
    invoice: {
        credit_noted_invoice_id: number,
        kind: string,
        already_paid_note: string,
        constant_symbol: string,
        number: string,
        due_in_api: string,
        registration_number: string,
        issued_on_localized: string,
        tax_point_on_localized: string,
        issued_on: string,
        tax_point_on: string,
        due_in: number,
        means_of_payment: string,
        payment_symbol: string,
        issued_by: string,
        vat_calculation: string,
        currency: string,
        vat_totals_currency: string,
        vat_totals_currency_conversion: boolean,
        rounding_type: string,
        language: string,
        desing: string,
        show_qr_code: boolean,
        note: string,
        foot_note: string,
        seller_attributes: {
            company_number: string,
            name: string,
            tax_number: string,
            address_attributes: {
                street: string,
                city: string,
                postcode: string,
                country_code: string
            },
            bank_account_attributes: {
                number: string,
                show_iban: boolean,
                iban: string,
                swift: string
            }
        },
        buyer_attributes: {
            company_number: string,
            name: string,
            tax_number: string,
            address_attributes: {
                street: string,
                city: string,
                postcode: string,
                country_code: string
            }
        },
        lines_attributes: [
            {
                description: string,
                price: string,
                quantity: string,
                unit_type: string,
                vat_rate: string
            }
        ]
    }
}

export interface IOutput {
    public_url: string,
    invoice: {
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
    },
    invoice_id: number
}

/* eslint-enable @typescript-eslint/naming-convention */
