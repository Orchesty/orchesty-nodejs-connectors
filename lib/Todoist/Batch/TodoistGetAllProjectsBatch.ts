import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'todoist-get-all-projects-batch';

export default class TodoistGetAllProjectsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'projects';
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput[];

    dto.setItemList(response ?? []);
    dto.removeBatchCursor();
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IOutput {
    id: number;
    name: string;
    comment_count: number;
    order: number;
    color: number;
    shared: boolean;
    favorite: boolean;
    inbox_project: boolean;
    team_inbox: boolean;
    url: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
