import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { IRangeObject } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-put-invoice-connector';

export default class XeroPutInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'invoices',
            JSON.stringify(this.getJsonData(dto)),
        );
        const resp = await this.getSender().send<IResponse>(req, this.getCodeRange());

        return this.setNewJsonData(dto, resp);
    }

    protected getJsonData(dto: ProcessDto): unknown {
        return dto.getJsonData();
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto): ProcessDto {
        return dto.setNewJsonData(resp.getJsonBody());
    }

    protected getCodeRange(): IRangeObject[] | number[] | undefined {
        return [200];
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    Invoices: IInvoice[];
}

export interface IInvoice {
    Type?: string;
    Contact?: {
        ContactID: string;
    };
    DateString?: string;
    DueDateString?: string;
    ExpectedPaymentDate?: string;
    InvoiceNumber?: string;
    Reference?: string;
    BrandingThemeID?: string;
    Url?: string;
    CurrencyCode?: string;
    Status?: string;
    LineAmountTypes?: string;
    SubTotal?: string;
    TotalTax?: string;
    Total?: string;
    LineItems?: {
        ItemCode?: string;
        Description?: string;
        Quantity?: string;
        UnitAmount?: string;
        TaxType?: string;
        TaxAmount?: string;
        LineAmount?: string;
        AccountCode?: string;
        Tracking?: {
            TrackingCategoryID?: string;
            Name?: string;
            Option?: string;
        }[];
    }[];
    ValidationErrors?: undefined[];
}

export interface IInput {
    Type: string;
    Contact: unknown;
    LineItems: {
        Description?: string;
        Quantity?: unknown;
        UnitAmount?: unknown;
        ItemCode?: unknown;
        AccountCode?: unknown;
        LineItemId?: unknown;
        TaxType?: unknown;
        LineAmount?: unknown;
        DiscountRate?: unknown;
        DiscountAmount?: unknown;
        Tracking?: unknown;
    }[];
    Date?: string;
    DueDate?: string;
    LineAmountTypes?: string;
    InvoiceNumber?: unknown;
    Reference?: unknown;
    BrandingThemeID?: string;
    Url?: string;
    CurrencyCode?: string;
    CurrencyRate?: string;
    Status?: string;
    SendToContact?: string;
    ExpectedPaymentDate?: string;
    PlannedPaymentDate?: string;
    DateString?: string;
    DueDateString?: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
