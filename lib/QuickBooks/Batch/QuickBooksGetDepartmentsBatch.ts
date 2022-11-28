import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'quick-books-get-departments-batch';

export default class QuickBooksGetDepartmentsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const response = (await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.GET,
                encodeURI('/query?query=select * from Department maxresults 1000'),
            ),
            [200],
        )).getJsonBody();

        this.setItemsListToDto(dto, response.QueryResponse.Department || []);

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
        Department: IOutput[];
    };
}

export interface IOutput {
    FullyQualifiedName: string;
    domain: string;
    Name: string;
    SyncToken: string;
    SubDepartment: boolean;
    sparse: boolean;
    Active: boolean;
    Id: string;
    MetaData: {
        CreateTime: string;
        LastUpdatedTime: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
