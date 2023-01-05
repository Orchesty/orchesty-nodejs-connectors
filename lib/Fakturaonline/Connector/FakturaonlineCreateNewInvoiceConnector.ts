import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'fakturaonline-create-new-invoice-connector';

export default class FakturaonlineCreateNewInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'invoices',
            dto.getJsonData(),
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    invoice: {
        credit_noted_invoice_id: number;
        kind: string;
        advance_deduction_amount: number;
        already_paid_note: string;
        constant_symbol: string;
        number: string;
        due_in_api: string;
        registration_number: string;
        issued_on_localized: string;
        tax_point_on_localized: string;
        issued_on: string;
        tax_point_on: string;
        due_in: number;
        means_of_payment: string;
        payment_symbol: string;
        issued_by: string;
        vat_calculation: string;
        currency: string;
        vat_totals_currency: string;
        vat_totals_currency_conversion: boolean;
        rounding_type: string;
        language: string;
        desing: string;
        show_qr_code: boolean;
        note: string;
        foot_note: string;
        seller_attributes: {
            company_number: string;
            name: string;
            tax_number: string;
            address_attributes: {
                street: string;
                city: string;
                postcode: string;
                country_code: string;
            };
            bank_account_attributes: {
                number: string;
                show_iban: boolean;
                iban: string;
                swift: string;
            };
            buyer_attributes: {
                company_number: string;
                name: string;
                tax_number: string;
                address_attributes: {
                    street: string;
                    city: string;
                    postcode: string;
                    country_code: string;
                };
            };
            lines_attributes: [
                {
                    description: string;
                    price: string;
                    quantity: string;
                    unit_type: string;
                    vat_rate: string;
                },
            ];
        };
    };
}

export interface IOutput {

    public_url: string;
    invoice: {
        already_paid_note: unknown;
        buyer: {
            bank_account_name: unknown;
            bank_account_number: unknown;
            city: unknown;
            company_number: string;
            country_code: string;
            iban: unknown;
            id: number;
            name: unknown;
            postcode: unknown;
            show_iban: boolean;
            street: unknown;
            swift: unknown;
            tax_number: unknown;
            vat_number: unknown;
            vat_payer: unknown;
        };
        constant_symbol: unknown;
        contact_id: unknown;
        created_at: string;
        credit_noted_invoice_id: unknown;
        currency: string;
        delivery_on: unknown;
        design: string;
        due_in_api: string;
        due_on: string;
        eet: {
            uuid_zpravy: unknown;
            bkp: unknown;
            dat_prij: unknown;
            fik: unknown;
            locked?: boolean;
            should_be_registered?: unknown;
        };
        eet_invoice: boolean;
        eet_state: string;
        foot_note: unknown;
        id: number;
        is_accessible: boolean;
        issued_by: unknown;
        issued_on: string;
        kind: string;
        language: string;
        lines: [
            {
                description: string;
                id: number;
                invoice_id: number;
                price: string;
                quantity: string;
                unit_type: unknown;
                vat_rate: string;
            },
            {
                description: string;
                id: number;
                invoice_id: number;
                price: string;
                quantity: string;
                unit_type: unknown;
                vat_rate: string;
            },
            {
                description: string;
                id: number;
                invoice_id: number;
                price: string;
                quantity: string;
                unit_type: unknown;
                vat_rate: string;
            },
        ];

        logo: {
            filename: unknown;
            thumb: {
                filename: unknown;
                thumb: unknown;
                url: unknown;
            };
            url: unknown;
        };
        logo_id: unknown;
        means_of_payment: string;
        note: unknown;
        number: string;
        paid: boolean;
        paid_at: unknown;
        payment_symbol: string;
        registration_number: unknown;
        rounding_type: string;
        seller: {
            bank_account_name: unknown;
            bank_account_number: unknown;
            city: unknown;
            company_number: string;
            country_code: string;
            iban: unknown;
            id: number;
            name: string;
            postcode: unknown;
            show_iban: boolean;
            street: unknown;
            swift: unknown;
            tax_number: unknown;
            vat_number: unknown;
            vat_payer: unknown;
        };
        seller_company_id: string;
        seller_id: unknown;
        settlement_method: unknown;
        show_qr_code: boolean;
        site: string;
        stamp: {
            filename: unknown;
            thumb: {
                filename: unknown;
                thumb: unknown;
                url: unknown;
            };
            url: unknown;
        };
        stamp_id: unknown;
        state: unknown;
        stateful_invoice: boolean;
        submitted_at: unknown;
        subscription_id: number;
        tax_point_on: string;
        total_float: number;
        updated_at: string;
        vat_calculation: string;
        vat_totals_currency: string;
        vat_totals_currency_conversion: boolean;
    };
    invoice_id: number;
    locked?: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
