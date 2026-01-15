import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'active-campaign-list-accounts-batch';
const LIMIT = 50;

export default class ActiveCampaignListAccountsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = Number(dto.getBatchCursor('0'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `accounts?offset=${offset}&limit=${LIMIT}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();
        dto.setItemList(response.accounts ?? []);
        if (response.total_records >= LIMIT) {
            dto.setBatchCursor((offset + LIMIT).toString());
        }
        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    accounts: IOutput[];
    total_records: number;
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface IOutput {
    name: string;
    createdTimestamp: string;
    updatedTimestamp: string;
    contactCount: string;
    dealCount: string;
    links: {
        notes: string;
        accountCustomFieldData: string;
        accountContacts: string;
        emailActivities: string;
        contactEmails: string;
        owner: string;
    };
    id: string;
}
