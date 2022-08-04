import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'todoist-create-project-connector';

export default class TodoistCreateProjectConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'projects';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    name: string;
}
export interface IOutput {
    id: number;
    name: string;
    comment_count: number;
    color: number;
    shared: boolean;
    sync_id: number;
    order: number;
    favorite: boolean;
    url: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
