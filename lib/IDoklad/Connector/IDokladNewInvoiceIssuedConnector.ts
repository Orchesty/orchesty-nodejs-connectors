import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BASE_URL } from '../IDokladApplication';

export const NAME = 'i-doklad-new-invoice-issued';

export default class IDokladNewInvoiceIssuedConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const request = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `${BASE_URL}/IssuedInvoices`,
            dto.getData(),
        );

        return dto.setNewJsonData(
            (await this.getSender().send<IResponse>(request)).getJsonBody().Data,
        );
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    CurrencyId: number;
    DateOfIssue: string;
    DateOfMaturity: string;
    DateOfTaxing: string;
    Description: string;
    DocumentSerialNumber: number;
    IsEet: boolean;
    Items: {
        Amount: number;
        DiscountPercentage: number;
        IsTaxMovement: boolean;
        Name: string;
        PriceType: number;
        UnitPrice: number;
        VatRateType: number;
        Code?: string;
        DiscountName?: string;
        InvoiceProformaId?: number;
        ItemType?: number;
        PriceListItemId?: number;
        Unit?: string;
        VatCodeId?: number;
    }[];
    IsIncomeTax: boolean;
    PartnerId: number;
    PaymentOptionId: number;
    NumericSequenceId: number;
    AccountNumber?: string;
    BankId?: number;
    ConstantSymbolId?: number;
    DateOfPayment?: string;
    DateOfVatApplication?: string;
    DeliveryAddressId?: number;
    DiscountPercentage?: number;
    EetResponsibility?: number;
    ExchangeRate?: number;
    ExchangeRateAmount?: number;
    HasVatRegimeOss?: boolean;
    Iban?: string;
    ItemsTextPrefix?: string;
    ItemsTextSuffix?: string;
    Note?: string;
    OrderNumber?: string;
    ProformaInvoices?: number[];
    ReportLanguage?: number;
    SalesOrderId?: number;
    SalesPosEquipmentId?: number;
    Swift?: string;
    Tags?: number[];
    VariableSymbol?: string;
    VatOnPayStatus?: number;
    VatReverseChargeCodeId?: number;
}

export interface IOutput {
    Attachments: {
        FileName: string;
        Id: number;
    }[];
    IssuedTaxDocumentIds: number[];
    ConstantSymbolId: number;
    CurrencyId: number;
    DateOfAccountingEvent: string;
    DateOfIssue: string;
    DateOfLastReminder: string;
    DateOfMaturity: string;
    DateOfPayment: string;
    DateOfTaxing: string;
    DateOfVatApplication: string;
    DeliveryAddress: {
        ContactDeliveryAddressId: number;
        City: string;
        Name: string;
        CountryId: number;
        PostalCode: string;
        Street: string;
    };
    Description: string;
    DiscountPercentage: number;
    DiscountType: number;
    DocumentNumber: string;
    DocumentSerialNumber: number;
    EetResponsibility: number;
    ExchangeRate: number;
    ExchangeRateAmount: number;
    Exported: number;
    HasVatRegimeOss: boolean;
    Id: number;
    IsEet: boolean;
    IsIncomeTax: boolean;
    IsSentToAccountant: boolean;
    IsSentToPurchaser: number;
    Items: {
        Amount: number;
        Code: string;
        DiscountName: string;
        DiscountPercentage: number;
        Id: number;
        InvoiceProformaId: number;
        IsTaxMovement: boolean;
        ItemType: number;
        Name: string;
        PriceListItemId: number;
        Prices: {
            TotalWithVatBeforeDiscount: number;
            TotalWithoutVatBeforeDiscount: number;
            TotalVatBeforeDiscount: number;
            TotalWithoutVat: number;
            TotalWithoutVatHc: number;
            TotalWithVat: number;
            TotalWithVatHc: number;
            UnitPrice: number;
            TotalVat: number;
            TotalVatHc: number;
        };
        PriceType: number;
        Unit: string;
        VatCodeId: number;
        VatRate: number;
        VatRateType: number;
    }[];
    ItemsTextPrefix: string;
    ItemsTextSuffix: string;
    Metadata: {
        DateCreated: Date;
        DateLastChange: Date;
        UserCreatedId: number;
        UserLastChangeId: number;
    };
    MyAddress: {
        AccountNumber: string;
        BankCode: string;
        BankName: string;
        City: string;
        CountryId: number;
        CountryName: string;
        Email: string;
        Fax: string;
        Firstname: string;
        Iban: string;
        IdentificationNumber: string;
        Mobile: string;
        NickName: string;
        Phone: string;
        PostalCode: string;
        Street: string;
        Surname: string;
        Swift: string;
        Title: string;
        VatIdentificationNumber: string;
        VatIdentificationNumberSk: string;
        Www: string;
    };
    Note: string;
    OrderNumber: string;
    PartnerAddress: {
        AccountNumber: string;
        BankCode: string;
        BankName: string;
        City: string;
        CountryId: number;
        CountryName: string;
        Email: string;
        Fax: string;
        Firstname: string;
        Iban: string;
        IdentificationNumber: string;
        Mobile: string;
        NickName: string;
        Phone: string;
        PostalCode: string;
        Street: string;
        Surname: string;
        Swift: string;
        Title: string;
        VatIdentificationNumber: string;
        VatIdentificationNumberSk: string;
        Www: string;
    };
    PartnerId: number;
    PaymentOptionId: number;
    PaymentStatus: number;
    Prices: {
        TotalDiscountAmount: number;
        TotalWithoutDiscount: number;
        TotalPaid: number;
        TotalPaidHc: number;
        VatRateSummary: {
            VatRateType: number;
            TotalVat: number;
            TotalVatHc: number;
            TotalWithoutVat: number;
            TotalWithoutVatHc: number;
            TotalWithVat: number;
            TotalWithVatHc: number;
        }[];
        TotalVat: number;
        TotalVatHc: number;
        TotalWithoutVat: number;
        TotalWithoutVatHc: number;
        TotalWithVat: number;
        TotalWithVatHc: number;
    };
    ProformaInvoices: number[];
    ReminderCount: number;
    ReportLanguage: number;
    RecurringInvoiceId: number;
    SalesOrderId: number;
    SalesPosEquipmentId: number;
    Tags: {
        TagId: number;
    }[];
    VariableSymbol: string;
    VatOnPayStatus: number;
    VatReverseChargeCodeId: number;
}

export interface IResponse {
    Data: IOutput;
    ErrorCode: number;
    IsSuccess: boolean;
    Message: string;
    StatusCode: number;
}
/* eslint-enable @typescript-eslint/naming-convention */
