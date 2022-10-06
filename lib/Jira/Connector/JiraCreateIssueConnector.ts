import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import JiraApplication, { BUG_TYPE, ISSUE_TYPE_FROM, STORY_TYPE, TASK_TYPE } from '../JiraApplication';

const JIRA_CREATE_ISSUE_ENDPOINT = '/rest/api/3/issue';

export default class JiraCreateIssueConnector extends AConnector {

    public getName(): string {
        return 'jira-create-issue';
    }

    public async processAction(dto: ProcessDto<IJiraIssue>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['description', 'summary', 'projectKey', 'issueType', 'labels'],
        );

        const {
            description,
            summary,
            projectKey,
            issueType,
            labels,
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
                    id: this.getIssueTypeId(applicationInstall, issueType),
                },
                labels,
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

    private getIssueTypeId(applicationInstall: ApplicationInstall, issueType: IssueTypeEnum): number {
        const issueTypeForm = applicationInstall.getSettings()[ISSUE_TYPE_FROM];
        const types = [
            issueTypeForm?.[BUG_TYPE],
            issueTypeForm?.[TASK_TYPE],
            issueTypeForm?.[STORY_TYPE],
        ];

        if (types[issueType]) {
            return types[issueType];
        }

        throw new Error(`Connector [${this.getName()}] doesn't have correct issueType.`);
    }

}

export interface IJiraIssue {
    description: string;
    summary: string;
    projectKey: string;
    issueType: IssueTypeEnum;
    labels: string[];
}

export enum IssueTypeEnum {
    BUG = 0,
    TASK = 1,
    STORY = 2,
}
