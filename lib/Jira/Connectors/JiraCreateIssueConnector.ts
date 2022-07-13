import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import JiraApplication from '../JiraApplication';

const JIRA_CREATE_ISSUE_ENDPOINT = '/rest/api/latest/issue';

interface IJiraIssue {
    description: string,
    summary: string,
    projectKey: string,
    issueType: string,
}

export default class JiraCreateIssueConnector extends AConnector {
  public getName = (): string => 'jira-create-issue';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
            dto.jsonData as Record<string, unknown>,
            ['description', 'summary', 'projectKey', 'issueType'],
    );

    const {
      description,
      summary,
      projectKey,
      issueType,
    } = dto.jsonData as IJiraIssue;

    const application = this._application as JiraApplication;
    const applicationInstall = await this._getApplicationInstallFromProcess(dto);
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

    const response = await this._sender.send(request, [201]);
    dto.data = response.body;
    return dto;
  }
}
