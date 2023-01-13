import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const JIRA_GET_SERVICEDESK_ORGS_ENDPOINT = '/rest/servicedeskapi/organization';

export const NAME = 'jira-get-servicedesk-orgs';

const PAGE_SIZE = 50;

export default class JiraGetServicedeskOrgsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto<unknown, IOutput>> {
        const start = dto.getBatchCursor('0');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const request = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${JIRA_GET_SERVICEDESK_ORGS_ENDPOINT}?limit=${PAGE_SIZE}&start=${start}`,
        );
        const response = await this.getSender().send<IResponse>(request);
        const responseData = response.getJsonBody();
        dto.setItemList(responseData.values);

        if (!responseData.isLastPage) {
            dto.setBatchCursor((Number(start) + PAGE_SIZE).toString());
        }
        return dto;
    }

}

interface IResponse {
    _expands: unknown[];
    size: number;
    start: number;
    limit: number;
    isLastPage: boolean;
    _links: {
        base: string;
        context: string;
        next: string;
        prev: string;
    };
    values: IOutput[];
}

export interface IOutput {
    id: string;
    name: string;
    _links: {
        self: string;
    };
}
