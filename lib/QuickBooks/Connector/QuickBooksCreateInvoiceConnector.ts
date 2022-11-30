import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'quick-books-create-invoice-connector';

export default class QuickBooksCreateInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/invoice',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    Invoice: {
        DocNumber: string;
        SyncToken: string;
        domain: string;
        Balance: number;
        BillAddr: {
            City: string;
            Line1: string;
            PostalCode: string;
            Lat: string;
            Long: string;
            CountrySubDivisionCode: string;
            Id: string;
        };
        TxnDate: string;
        TotalAmt: number;
        CustomerRef: {
            name: string;
            value: string;
        };
        ShipAddr: {
            City: string;
            Line1: string;
            PostalCode: string;
            Lat: string;
            Long: string;
            CountrySubDivisionCode: string;
            Id: string;
        };
        LinkedTxn: unknown[];
        DueDate: string;
        PrintStatus: string;
        Deposit: number;
        sparse: boolean;
        EmailStatus: string;
        Line: {
            LineNum: number;
            Amount: number;
            SalesItemLineDetail: {
                TaxCodeRef: {
                    name: string;
                    value: string;
                };
                ItemRef: {
                    name: string;
                    value: string;
                };
            };
            Id: string;
            DetailType: string;
        }[];
        ApplyTaxAfterDiscount: boolean;
        CustomField: {
            DefinitionId: string;
            Type: string;
            Name: string;
        }[];
        Id: string;
        TxnTaxDetail: {
            TotalTax: number;
        };
        MetaData: {
            CreateTime: string;
            LastUpdatedTime: string;
        };
    };
    time: string;
}

export interface IInput {
    Line: {
        DetailType: string;
        Amount: number;
        SalesItemLineDetail: {
            ItemRef?: {
                name?: string;
                value: string;
            };
        };
    }[];
    CustomerRef: {
        name?: string;
        value: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
