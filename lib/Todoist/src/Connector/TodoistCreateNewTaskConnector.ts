import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'todoist-create-new-task-connector';

export default class TodoistCreateNewTaskConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'tasks';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    content: string;
    due_string: string;
    due_lang: string;
    priority: number;
}

export interface IOutput {
    comment_count: number;
    completed: boolean;
    content: string;
    description: string;
    due: {
        date: string;
        datetime: Date;
        recurring: boolean;
        string: string;
        timezone: string;
    };
    id: number;
    order: number;
    priority: number;
    project_id: number;
    section_id: number;
    parent_id: number;
    url: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
