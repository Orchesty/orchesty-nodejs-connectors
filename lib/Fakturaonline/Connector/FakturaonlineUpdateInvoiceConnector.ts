import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'fakturaonline-update-invoice-connector';

export default class FakturaonlineUpdateInvoiceConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      'invoices/id',
            dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponce{
    invoice: IOutput,
    public_url: '/vystavene-faktury/1.pdf',
    invoice: {
        buyer: {
            company_number': '54321',
            country_code': 'CZ',
            id': 2,
            show_iban': false,
        },
        'created_at': '2022-06-08T08:30:22+02:00',
        'currency': 'EUR',
        'design': '1',
        'due_in_api': '14',
        'due_on': '2022-06-22',
        'eet': {
            'locked?': false,
        },
        'eet_invoice': false,
        'eet_state': 'not_subject',
        'id': 1,
        'is_accessible': true,
        'issued_on': '2022-06-08',
        'kind': 'invoice',
        'language': 'cs',
        'lines': [
            {
                'description': 'Invoice line 22',
                'id': 1,
                'invoice_id': 1,
                'price': '199,90 €',
                'quantity': '1,00',
                'vat_rate': '20%'
            },
            {
                'description': 'Invoice line 23',
                'id': 2,
                'invoice_id': 1,
                'price': '312,00 €',
                'quantity': '1,00',
                'vat_rate': '10,5%'
            },
            {
                'description': 'Invoice line 24',
                'id': 3,
                'invoice_id': 1,
                'price': '199,90 €',
                'quantity': '10,00',
                'vat_rate': '15%'
            }
        ],
        'locked?': false,
        'logo': {
            'thumb': {
            },
        },
        'means_of_payment': 'cash',
        'number': 'INVOICE-0014',
        'paid': false,
        'payment_symbol': '0014',
        'rounding_type': 'none',
        'seller': {
            'company_number': '12345',
            'country_code': 'CZ',
            'id': 1,
            'name': 'Ohai',
            'show_iban': false,
        },
        'seller_company_id': '12345',
        'show_qr_code': true,
        'site': 'cz',
        'stamp': {
            'thumb': {
            },
        },
        'state': 'proposal',
        'stateful_invoice': false,
        'subscription_id': 1,
        'tax_point_on': '2022-06-08',
        'total_float': 2883.49,
        'updated_at': '2022-06-08T08:30:22+02:00',
        'vat_calculation': 'vat_exclusive',
        'vat_totals_currency': 'EUR',
        'vat_totals_currency_conversion': false
    },
    'invoice_id': 1
}
export interface IInput {
    id: string
}

export interface IOutput {
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

/* eslint-enable @typescript-eslint/naming-convention */
