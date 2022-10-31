import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-put-contacts-connector';

export default class XeroPostContactsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'contacts',
            JSON.stringify(dto.getJsonData()),
        );
        const resp = await this.getSender().send(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    Name: string;
    ContactID?: string;
    ContactNumber?: string;
    AccountNumber?: string;
    ContactStatus?: string;
    FirstName?: string;
    LastName?: string;
    CompanyNumber?: string;
    EmailAddress?: string;
    SkypeUserName?: string;
    ContactPerson?: string;
    Addresses?: {
        AddressType?: string;
        AddressLine1?: string;
        City?: string;
        PostalCode?: string;
    }[];
    BankAccountDetails?: string;
    TaxNumber?: string;
    AccountsReceivableTaxType?: string;
    AccountsPayableTaxType?: string;
    Phones?: unknown;
    IsSupplier?: unknown;
    IsCustomer?: unknown;
    DefaultCurrency?: string;
    XeroNetworkKey?: unknown;
    SalesDefaultAccountCode?: unknown;
    PurchasesDefaultAccountCode?: unknown;
    SalesTrackingCategories?: unknown;
    PurchasingTrackingCategories?: unknown;
    TrackingCategoryName?: string;
    TrackingOptionName?: string;
    PaymentTerms?: unknown;
}

/* eslint-enable @typescript-eslint/naming-convention */
