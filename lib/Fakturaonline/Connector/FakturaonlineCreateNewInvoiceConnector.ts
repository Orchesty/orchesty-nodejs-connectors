import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'fakturaonline-create-new-invoice-connector';

export default class FakturaonlineCreateNewInvoiceConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'invoices',
        dto.jsonData as IInput,
    );

    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    invoice: {
        credit_noted_invoice_id: number,
        kind: string,
        advance_deduction_amount: number,
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
}

export interface IOutput {
    public_url: string,
    invoice: {
        already_paid_note: null,
        buyer: {
            bank_account_name: null,
            bank_account_number: null,
            city: null,
            company_number: string,
            country_code: string,
            iban: null,
            id: number,
            name: null,
            postcode: null,
            show_iban: boolean,
            street: null,
            swift: null,
            tax_number: null,
            vat_number: null,
            vat_payer: null
        },
        constant_symbol: null,
        contact_id: null,
        created_at: string,
        credit_noted_invoice_id: null,
        currency: string,
        delivery_on: null,
        design: string,
        due_in_api: string,
        due_on: string,
        eet: {
            uuid_zpravy: null,
            bkp: null,
            dat_prij: null,
            fik: null,
            locked?: boolean,
            should_be_registered?: null
        },
        eet_invoice: boolean,
        eet_state: string,
        foot_note: null,
        id: number,
        is_accessible: boolean,
        issued_by: null,
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
                unit_type: null,
                vat_rate: string
            },
            {
                description: string,
                id: number,
                invoice_id: number,
                price: string,
                quantity: string,
                unit_type: null,
                vat_rate: string
            },
            {
                'description': string,
                'id': number,
                'invoice_id': number,
                'price': string,
                'quantity': string,
                'unit_type': null,
                'vat_rate': string
            }
        ],
        locked?: boolean,
        logo: {
            filename: null,
            thumb: {
                filename: null,
                thumb: null,
                url: null
            },
            'url': null
        },
        logo_id: null,
        means_of_payment: string,
        note: null,
        number: string,
        paid: boolean,
        paid_at: null,
        payment_symbol: string,
        registration_number: null,
        rounding_type: string,
        seller: {
            bank_account_name: null,
            bank_account_number: null,
            city: null,
            company_number: string,
            country_code: string,
            iban: null,
            id: number,
            name: string,
            postcode: null,
            show_iban: boolean,
            street: null,
            swift: null,
            tax_number: null,
            vat_number: null,
            vat_payer: null
        },
        seller_company_id: string,
        seller_id: null,
        settlement_method: null,
        show_qr_code: boolean,
        site: string,
        stamp: {
            filename: null,
            thumb: {
                filename: null,
                thumb: null,
                url: null
            },
            url: null
        },
        stamp_id: null,
        state: null,
        stateful_invoice: boolean,
        submitted_at: null,
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
