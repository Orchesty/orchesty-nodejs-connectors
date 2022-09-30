import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import JiraApplication from '../JiraApplication';

const JIRA_CREATE_ISSUE_ENDPOINT = '/rest/api/latest/issue';

interface IJiraIssue {
    description: string;
    summary: string;
    projectKey: string;
    issueType: string;
}

export default class JiraCreateIssueConnector extends AConnector {

    public getName(): string {
        return 'jira-create-issue';
    }

    public async processAction(dto: ProcessDto<IJiraIssue>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['description', 'summary', 'projectKey', 'issueType'],
        );

        const {
            description,
            summary,
            projectKey,
            issueType,
        } = dto.getJsonData();

        const application = this.getApplication<JiraApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = {
            fields: {
                project: {
                    key: projectKey,
                },
                summary,
                description,
                issuetype: {
                    name: issueType,
                },
            },
        };

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            JIRA_CREATE_ISSUE_ENDPOINT,
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [201]);
        dto.setData(response.getBody());

        return dto;
    }

}
