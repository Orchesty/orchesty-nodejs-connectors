import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'quick-books-get-tax-rates-batch';

export default class QuickBooksGetTaxRatesBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const response = (await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.GET,
                encodeURI('/query?query=select * from TaxRate limit 1000'),
            ),
            [200],
        )).getJsonBody();

        this.setItemsListToDto(dto, response.QueryResponse.TaxRate);

        return dto;
    }

    protected setItemsListToDto(dto: BatchProcessDto, responseBody: IOutput[]): void {
        dto.setItemList(responseBody);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    QueryResponse: {
        startPosition: number;
        totalCount: number;
        TaxRate: IOutput[];
    };
}

export interface IOutput {
    RateValue: number;
    AgencyRef: {
        value: string;
    };
    domain: string;
    Name: string;
    SyncToken: string;
    SpecialTaxType: string;
    DisplayType: string;
    sparse: boolean;
    Active: boolean;
    MetaData: {
        CreateTime: string;
        LastUpdatedTime: string;
    };
    Id: string;
    Description: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
