import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const JIRA_GET_UPDATED_WORKLOG_IDS_ENDPOINT = '/rest/api/3/worklog/updated';

export const NAME = 'jira-get-updated-worklog-ids';

export default class JiraGetUpdatedWorklogIdsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        let { since } = dto.getJsonData();
        if (!since || since < 0) {
            since = 0;
        }
        const request = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${JIRA_GET_UPDATED_WORKLOG_IDS_ENDPOINT}?since=${since}`,
        );
        const response = await this.getSender().send<IOutput>(request);

        const worklogIds = response.getJsonBody().values.map((item) => item.worklogId);
        const data = JSON.stringify({ worklogIds });
        dto.setData(data);
        return dto;
    }

}

export interface IInput {
    since: number;
}

interface IOutput {
    lastPage: boolean;
    self: string;
    since: number;
    until: number;
    values: Value[];
}

interface Value {
    properties: [];
    updatedTime: number;
    worklogId: number;
}
