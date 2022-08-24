import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'xero-get-accounts-batch';

export default class XeroGetAccountsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'Accounts';
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.Accounts ?? []);
        dto.removeBatchCursor();

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    Accounts: IOutput[];
}

export interface IOutput {
    Code: string;
    Name: string;
    Type: string;
    BankAccountNumber: string;
    Status: string;
    Description: string;
    BankAccountType: string;
    CurrencyCode: string;
    TaxType: string;
    EnablePaymentsToAccount: boolean;
    ShowInExpenseClaims: boolean;
    AccountID: string;
    Class: string;
    SystemAccount: string | null;
    ReportingCode: string;
    ReportingCodeName: string;
    HasAttachments: boolean;
    UpdatedDateUTC: Date;
    AddToWatchlist: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
