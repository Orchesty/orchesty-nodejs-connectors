import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'quick-books-create-item-connector';

export default class QuickBooksCreateItemConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        return dto.setJsonData((await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.POST,
                '/item',
                dto.getJsonData(),
            ),
            [200],
        )).getJsonBody().Item);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    Name: number;
    IncomeAccountRef: {
        name: string;
        value: string;
    };
    Type?: string;
    QtyOnHand?: string;
    TrackQtyOnHand?: true;
    InvStartDate?: string;
    AssetAccountRef?: {
        name: string;
        value: string;
    };
    ExpenseAccountRef?: {
        name: string;
        value: string;
    };
}

export interface IOutput {
    FullyQualifiedName: string;
    domain: string;
    Id: string;
    Name: string;
    TrackQtyOnHand: boolean;
    UnitPrice: number;
    PurchaseCost: number;
    QtyOnHand: number;
    IncomeAccountRef: {
        name: string;
        value: string;
    };
    AssetAccountRef: {
        name: string;
        value: string;
    };
    Taxable: boolean;
    sparse: boolean;
    Active: boolean;
    SyncToken: string;
    InvStartDate: string;
    Type: string;
    ExpenseAccountRef: {
        name: string;
        value: string;
    };
    MetaData: {
        CreateTime: string;
        LastUpdatedTime: string;
    };
}

interface IResponse {
    Item: IOutput;
    time: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
