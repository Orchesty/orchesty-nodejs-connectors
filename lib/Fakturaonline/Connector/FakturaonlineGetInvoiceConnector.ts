import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'fakturaonline-get-invoice-connector';

export default class FakturaonlineGetInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { id } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `invoices/${id}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string;
}

export interface IOutput {
    buyer: {
        company_number: string;
        country_code: string;
        id: number;
        show_iban: boolean;
    };
    created_at: string;
    currency: string;
    design: string;
    due_in_api: string;
    due_on: string;
    eet: {
        locked?: boolean;
    };
    eet_invoice: boolean;
    eet_state: string;
    id: number;
    is_accessible: boolean;
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
            vat_rate: string;
        },
        {
            description: string;
            id: number;
            invoice_id: number;
            price: string;
            quantity: string;
            vat_rate: string;
        },
        {
            description: string;
            id: number;
            invoice_id: number;
            price: string;
            quantity: string;
            vat_rate: string;
        },
    ];
    locked?: boolean;
    means_of_payment: string;
    number: string;
    paid: boolean;
    payment_symbol: string;
    rounding_type: string;
    seller: {
        company_number: string;
        country_code: string;
        id: number;
        name: string;
        show_iban: boolean;
    };
    seller_company_id: string;
    show_qr_code: boolean;
    site: string;
    state: string;
    stateful_invoice: boolean;
    subscription_id: number;
    tax_point_on: string;
    total_float: number;
    updated_at: string;
    vat_calculation: string;
    vat_totals_currency: string;
    vat_totals_currency_conversion: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
