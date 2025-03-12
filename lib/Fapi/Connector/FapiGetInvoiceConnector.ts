import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { getErrorInResponse, NAME as APPLICATION_NAME } from '../FapiApplication';

export const NAME = `${APPLICATION_NAME}-get-invoice-connector`;

export default class FapiGetInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `invoices/${id}`,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, {
            success: StatusCodes.OK,
            stopAndFail: StatusCodes.NOT_FOUND,
        }, undefined, undefined, getErrorInResponse);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    id: number;
}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    number: string;
    created_on: string;
    last_modified_on: string;
    create_date: string;
    automatic_charge_date: string;
    payday_date: string;
    client: number;
    type: string;
    payment_type: string;
    currency: string;
    exchange_rate_czk: string;
    exchange_rate: string;
    language: string;
    paid: boolean;
    cancelled: boolean;
    cancellation_reason: string;
    reverse_charge: boolean;
    tax_exempt: boolean;
    round_function: string;
    round_precision: number;
    vat_recapitulation_algorithm: string;
    payment_confirmation_mode: string;
    preserve_vat_date_on_invoice: boolean;
    has_credit_note: boolean;
    create_invoice_automatically: boolean;
    create_payment_confirmation: boolean;
    create_simplified_invoice: boolean;
    path: string;
    recurring_gopay_payment_id: string;
    campaign_code: string;
    periodic_invoice: string;
    periodic_invoice_number: string;
    locked: boolean;
    proforma: boolean;
    payment_confirmation: boolean;
    simplified_invoice: boolean;
    credit_note: boolean;
    show_vat_info: boolean;
    shipping_method_id: number;
    shipping_metadata: {
        packatery_branch_name: string;
        packatery_branch_id: number;
    } | null;
    paid_on: string;
    variable_symbol: string;
    vat_date: string;
    supplier: {
        name: string;
        ic: string;
        dic: string;
        ic_dph: string;
        swift: string;
        iban: string;
        bank_account: string;
        address: {
            street: string;
            city: string;
            zip: string;
            country: string;
        };
    };
    customer: {
        name: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            zip: string;
            country: string;
        };
        shipping_address: {
            name: string;
            surname: string;
            street: string;
            city: string;
            zip: string;
            country: string;
        } | null;
    };
    form: number;
    items: {
        id: number;
        invoice: number;
        name: string;
        code: string;
        accounting_code: string;
        price: number;
        count: number;
        round_item: boolean;
        correction_item: boolean;
        type: string;
        moss: boolean;
        pohoda_accounting: string;
        pohoda_centre: string;
        pohoda_store: string;
        pohoda_stock_item: string;
        vat: number;
        including_vat: boolean;
    }[];
    custom_fields: {
        invoice_custom_fields_data_id: number;
        custom_field_id: number;
        value: string;
        name: string;
        type: string;
    }[];
    shipping_method: {
        id: number;
        user_id: number;
        name: string;
        type: string;
        subtype: string;
        address_prices: {
            address: {
                country_code: string;
            };
            prices: {
                currency_code: string;
                price: number;
            }[];
        }[];
        free_of_charges: string;
        meta_data: string;
        including_vat: number;
        description: string;
        disable_discount: number;
        deleted: number;
    };
    total: number;
    total_vat: number;
    total_czk: number;
    total_vat_czk: number;
    total_native: number;
    total_vat_native: number;
    user: number;
    form_url: string;
    session_id: string;
    labels: {
        id: number;
        name: string;
        color: string;
    }[];
    parent?: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}
