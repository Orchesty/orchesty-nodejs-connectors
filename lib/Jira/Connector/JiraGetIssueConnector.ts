import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const JIRA_GET_ISSUE_ENDPOINT = '/rest/api/3/issue';

export const NAME = 'jira-get-issue';

export default class JiraGetIssueConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { id } = dto.getJsonData();

        if (!id) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Connector is missing required data: "id".');
            return dto;
        }

        const request = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${JIRA_GET_ISSUE_ENDPOINT}/${id}`,
        );
        const response = await this.getSender().send(request);
        return dto.setData(response.getBody());
    }

}

export interface IInput {
    id: string;
}
