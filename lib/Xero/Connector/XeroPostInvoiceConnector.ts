import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-put-invoice-connector';

export default class XeroPostInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'invoices',
        );
        const resp = await this.getSender().send(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
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
