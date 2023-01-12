import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const JIRA_GET_WORKLOGS_ENDPOINT = '/rest/api/3/worklog/list';

export const NAME = 'jira-get-worklogs';

export default class JiraGetWorklogsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { ids } = dto.getJsonData();
        if (!ids) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Connector is missing required data: "ids".');
        } else {
            const request = await this.getApplication().getRequestDto(
                dto,
                appInstall,
                HttpMethods.POST,
                `${JIRA_GET_WORKLOGS_ENDPOINT}`,
                { ids },
            );
            const response = await this.getSender().send<IOutput>(request);
            dto.setData(response.getBody());
        }
        return dto;
    }

}

export interface IInput {
    ids: number[];
}

export interface IOutput {
    author: Author;
    created: string;
    id: string;
    issueId: string;
    self: string;
    started: string;
    timeSpent: string;
    timeSpentSeconds: number;
    updateAuthor: Author;
    updated: string;
}

export interface Author {
    accountId: string;
    accountType: string;
    active: boolean;
    avatarUrls: Record<string, string>;
    displayName: string;
    self: string;
    timeZone: string;
}
