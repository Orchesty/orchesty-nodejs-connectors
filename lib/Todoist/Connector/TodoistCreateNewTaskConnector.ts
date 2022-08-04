import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'todoist-create-new-task-connector';

export default class TodoistCreateNewTaskConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'tasks';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
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
