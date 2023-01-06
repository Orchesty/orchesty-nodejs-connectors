import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const JIRA_GET_ISSUE_ENDPOINT = '/rest/api/3/issue';

export const NAME = 'jira-get-issue';

export default class JiraGetIssueConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { id } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${JIRA_GET_ISSUE_ENDPOINT}/${id}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        const data = resp.getJsonBody();

        // TODO define what this connector should return
        return dto.setNewJsonData({
            summary: data.fields.summary,
        });
    }

}

export interface IInput {
    id: string;
}

export interface IOutput {
    fields: {
        summary: string;
    };
}
