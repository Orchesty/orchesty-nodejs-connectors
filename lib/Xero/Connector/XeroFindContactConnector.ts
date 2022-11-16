import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-find-contact-connector';

export default class XeroFindContactConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { contactName } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `contacts?where=Name="${contactName}"`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200, 404]);

        return this.setNewJsonData(dto, resp);
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto<IResponse>): ProcessDto<IOutput> {
        const data = resp.getJsonBody();
        if (resp.getResponseCode() === 404 || data.Contacts.length <= 0) {
            return dto.setNewJsonData<IOutput>({ contact: null });
        }
        return dto.setNewJsonData<IOutput>({ contact: data.Contacts.shift() ?? null });
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    Contacts: IContact[];
}

export interface IInput {
    contactName: string;
}

export interface IOutput {
    contact: IContact | null;
}

export interface IContact {
    ContactID: string;
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
    UpdatedDateUTC: string;
    IsSupplier: boolean;
    IsCustomer: boolean;
    DefaultCurrency: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
