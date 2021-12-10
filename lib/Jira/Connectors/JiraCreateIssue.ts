import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import JiraApplication from '../JiraApplication';

const JIRA_CREATE_ISSUE_ENDPOINT = '/rest/api/latest/issue';

interface IJiraIssue {
    description: string,
    summary: string,
    projectKey: string,
    issueType: string,
    userName: string,
}

export default class JiraCreateIssue extends AConnector {
  public getName = (): string => 'jira-create-issue';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
            dto.jsonData as Record<string, unknown>,
            ['description', 'summary', 'projectKey', 'userName', 'issueType'],
    );

    const {
      description,
      summary,
      projectKey,
      userName,
      issueType,
    } = dto.jsonData as IJiraIssue;

    const application = this._application as JiraApplication;
    const applicationInstall = await this._getApplicationInstall(userName);
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
