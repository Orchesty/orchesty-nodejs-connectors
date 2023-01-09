import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
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
        if (id === undefined || id === null) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Connector is missing required data: "id".');
        } else {
            const reqest = await this.getApplication().getRequestDto(
                dto,
                appInstall,
                HttpMethods.GET,
                `${JIRA_GET_ISSUE_ENDPOINT}/${id}`,
            );
            const response = await this.getSender().send<IOutput>(reqest, [200]);

            // TODO revision these conditions (request should follow 30x
            // redirects; request should be retried on 500)
            if (response.getResponseCode() >= 300 && response.getResponseCode() < 400) {
                throw new OnRepeatException(30, 5, response.getBody());
            } else if (response.getResponseCode() >= 400) {
                dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Failed with code ${response.getResponseCode()}`);
            }

            dto.setData(response.getBody());
        }
        return dto;
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
