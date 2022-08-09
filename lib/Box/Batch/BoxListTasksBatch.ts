import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'box-list-tasks-batch';

export default class BoxListTasksBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { file_id } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `files/${file_id}/tasks`;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.entries ?? []);
    dto.removeBatchCursor();
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
  file_id: string;
}

interface IResponse {
  entries: IOutput[];
  total_count: number;
}

export interface IOutput{
  id: number;
  type: string;
  item: {
    id: number;
    etag: number;
    type: string;
    sequence_id: number;
    name: string;
    sha1: string;
    file_version: {
      id: number;
      type: string;
      sha1: string;
    };
  };
  due_at: Date;
  action: string;
  message: string;
  task_assignment_collection: {
    total_count: number;
    entries: {
      id: number;
      type: string;
      item: {
        id: number;
        etag: number;
        type: string;
        sequence_id: number;
        name: string;
        sha1: string;
        file_version: {
          id: number;
          type: string;
          sha1: string;
        };
      };
      assigned_to: {
        id: number;
        type: string;
        name: string;
        login: string;
      };
      message: string;
      completed_at: Date;
      assigned_at: Date;
      reminded_at: Date;
      resolution_state: string;
      assigned_by: {
        id: number;
        type: string;
        name: string;
        login: string;
      };
    }[];
  };
  is_completed: boolean;
  created_by: {
    id: number;
    type: string;
    name: string;
    login: string;
  }
  ;
  created_at: Date;
  completion_rule: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
