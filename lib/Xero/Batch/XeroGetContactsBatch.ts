import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'xero-get-contacts-batch';

export default class XeroGetContactsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const page = dto.getBatchCursor('1');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `Contacts?page=${page}`;
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.Contacts ?? []);
        if (response.Contacts.length >= 100) {
            dto.setBatchCursor((Number(page) + 1).toString());
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    Contacts: IOutput[];
}

export interface IOutput {
    ContactID: string;
    ContactNumber: string;
    AccountNumber: string;
    ContactStatus: string;
    Name: string;
    FirstName: string;
    LastName: string;
    CompanyNumber: string;
    EmailAddress: string;
    SkypeUserName: string;
    BankAccountDetails: string;
    TaxNumber: string;
    AccountsReceivableTaxType: string;
    AccountsPayableTaxType: string;
    Addresses: {
        AddressType: string;
        AddressLine1: string;
        City: string;
        PostalCode: string;
        AttentionTo: string;
    }[];
    Phones: {
        PhoneType: string;
        PhoneNumber: string;
        PhoneAreaCode: string;
        PhoneCountryCode: string;
    }[];
    UpdatedDateUTC: Date;
    IsSupplier: boolean;
    IsCustomer: boolean;
    DefaultCurrency: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
