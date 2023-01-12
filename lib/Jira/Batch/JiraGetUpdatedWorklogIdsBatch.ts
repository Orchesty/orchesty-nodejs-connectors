import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { HOST_URL } from '../JiraApplication';

export const JIRA_GET_UPDATED_WORKLOG_IDS_ENDPOINT = '/rest/api/3/worklog/updated';

export const NAME = 'jira-get-updated-worklog-ids';

export default class JiraGetUpdatedWorklogIdsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        let { since } = dto.getJsonData();
        if (!since || since < 0) {
            since = 0;
        }
        const url = `${JIRA_GET_UPDATED_WORKLOG_IDS_ENDPOINT}?since=${since}`;
        const nextUrl = dto.getBatchCursor(url);
        const request = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, nextUrl);
        const response = await this.getSender().send<IOutput>(request);

        const responseData = response.getJsonBody();
        const worklogIds = responseData.values.map((item) => item.worklogId);
        dto.setItemList(worklogIds);

        if (!responseData.lastPage) {
            // Use only path as the url since base is added to all request urls in the application
            const baseUrl = appInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[HOST_URL];
            const nextPageUrl = responseData.nextPage.replace(baseUrl, '');
            dto.setBatchCursor(nextPageUrl);
        }
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
    nextPage: string;
}

interface Value {
    properties: [];
    updatedTime: number;
    worklogId: number;
}
