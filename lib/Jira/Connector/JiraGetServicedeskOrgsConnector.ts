import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const JIRA_GET_SERVICEDESK_ORGS_ENDPOINT = '/rest/servicedeskapi/organization';

export const NAME = 'jira-get-servicedesk-orgs';

const PAGE_SIZE = 100;

export default class JiraGetServicedeskOrgsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const request = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${JIRA_GET_SERVICEDESK_ORGS_ENDPOINT}?limit=${PAGE_SIZE}`,
        );
        const response = await this.getSender().send<IOutput>(request);
        const responseData = response.getJsonBody();
        return dto.setJsonData(responseData.values);
    }

}

export interface IOutput {
    _expands: unknown[];
    size: number;
    start: number;
    limit: number;
    isLastPage: boolean;
    _links: Links;
    values: Value[];
}

export interface Links {
    base: string;
    context: string;
    next: string;
    prev: string;
}

export interface Value {
    id: string;
    name: string;
    _links: ValueLinks;
}

export interface ValueLinks {
    self: string;
}
