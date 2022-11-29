import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'quick-books-find-customer-connector';

export default class QuickBooksFindCustomerConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { contactName } = dto.getJsonData();
        const resp = await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.GET,
                encodeURI(`/query?query=select * from Customer where DisplayName = ${contactName}`),
            ),
            [200, 404],
        );

        return this.setNewJsonData(dto, resp);
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto<IResponse>): ProcessDto<IOutput> {
        const data = resp.getJsonBody();
        if (resp.getResponseCode() === 404 || data.QueryResponse.Customer.length <= 0) {
            return dto.setNewJsonData<IOutput>({ customer: null });
        }
        return dto.setNewJsonData<IOutput>({ customer: data.QueryResponse.Customer.shift() ?? null });
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    QueryResponse: {
        Customer: ICustomer[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

export interface ICustomer {
    domain: string;
    FamilyName: string;
    DisplayName: string;
    DefaultTaxCodeRef: {
        value: string;
    };
    PrimaryEmailAddr: {
        Address: string;
    };
    PreferredDeliveryMethod: string;
    GivenName: string;
    FullyQualifiedName: string;
    BillWithParent: boolean;
    Job: boolean;
    BalanceWithJobs: number;
    PrimaryPhone: {
        FreeFormNumber: string;
    };
    Active: boolean;
    MetaData: {
        CreateTime: string;
        LastUpdatedTime: string;
    };
    BillAddr: {
        City: string;
        Line1: string;
        PostalCode: string;
        Lat: string;
        Long: string;
        CountrySubDivisionCode: string;
        Id: string;
    };
    MiddleName: string;
    Notes: string;
    Taxable: boolean;
    Balance: number;
    SyncToken: string;
    CompanyName: string;
    ShipAddr: {
        City: string;
        Line1: string;
        PostalCode: string;
        Lat: string;
        Long: string;
        CountrySubDivisionCode: string;
        Id: string;
    };
    PrintOnCheckName: string;
    sparse: boolean;
    Id: string;
}

/* eslint-enable @typescript-eslint/naming-convention */

export interface IInput {
    contactName: string;
}

export interface IOutput {
    customer: ICustomer | null;
}
