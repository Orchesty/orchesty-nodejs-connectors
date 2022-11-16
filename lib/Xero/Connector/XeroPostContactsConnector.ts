import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-put-contacts-connector';

export default class XeroPostContactsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'contacts',
            JSON.stringify(dto.getJsonData()),
        );
        const resp = await this.getSender().send<IResponse>(req, this.getCodeRange());

        return this.setNewJsonData(dto, resp);
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto<IResponse>): ProcessDto<IOutput> {
        return dto.setNewJsonData({ contact: resp.getJsonBody() });
    }

    protected getCodeRange(): number[] {
        return [200];
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

export interface IOutput {
    contact: IResponse | null;
}

export interface IResponse {
    Contacts: {
        Addresses: {
            AddressType: string;
            City: string;
            Country: string;
            PostalCode: string;
            Region: string;
        }[];
        BankAccountDetails: string;
        ContactGroups: unknown[];
        ContactID: string;
        ContactPersons: unknown[];
        ContactStatus: string;
        EmailAddress: string;
        HasValidationErrors: boolean;
        IsCustomer: boolean;
        IsSupplier: boolean;
        Name: string;
        Phones: {
            PhoneAreaCode: string;
            PhoneCountryCode: string;
            PhoneNumber: string;
            PhoneType: string;
        }[];
        PurchasesTrackingCategories: unknown[];
        SalesTrackingCategories: unknown[];
        UpdatedDateUTC: string;
    }[];
    DateTimeUTC: string;
    Id: string;
    ProviderName: string;
    Status: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
