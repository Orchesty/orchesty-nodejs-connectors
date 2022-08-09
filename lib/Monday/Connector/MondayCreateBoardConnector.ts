import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';

export const NAME = 'monday-create-board';

export default class MondayCreateBoardConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;
    let graphQl = 'mutation { create_board (';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(body)) {
      graphQl += `${key}"${value}",`;
    }
    graphQl = graphQl.slice(0, -1);
    graphQl += ') {board_kind description groups id owner owners permissions state subscribers top_group}}';
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      undefined,
      { query: graphQl },
    );
    const resp = await this._sender.send(req, [200]);
    const output = resp.jsonBody as IOutput;

    if (output.error_code) {
      throw new OnRepeatException(60, 10, output.error_code ?? 'Unknown error.');
    }
    dto.jsonData = output;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    board_name: string;
    board_kind: 'public' | 'board_kind' | 'share';
    folder_id?: number;
    workspace_id?: number;
    template_id?: number;
    board_owner_ids?: number[];
    board_subscriber_ids?: number[];
}

export interface IOutput {
    activity_logs?: {
        limit?: number;
        page?: number;
        user_ids?: number[];
        column_ids?: string;
        group_ids?: string;
        item_ids?: number;
        from?: Date;
        to?: Date;
    }[]
    board_folder_id?: number;
    board_kind: 'public' | 'board_kind' | 'share';
    columns?: {
        ids?: string[];
    }[];
    name?: string;
    description?: string;
    groups: {
        ids: string[];
    }[];
    id: string;
    items?: {
        ids?: number[];
        limit?: number;
        page?: number;
        newest_first?: boolean;
    }
    owner: string;
    owners: string[];
    permissions: 'everyone' | 'collaborators' | 'assignee' | 'owners';
    pos?: string;
    state: 'all' | 'active' | 'archived' | 'deleted';
    subscribers: string[];
    tags?: string[];
    top_group: string[];
    type?: string;
    updated_at?: Date;
    updates?: {
        limit?: number;
        page?: number;
    }[];
    views?: {
        ids?: number[];
        type?: string;
    }[];
    workspace?: string;
    workspace_id?: number;
    error_code?: string;
    status_code?: number;
    error_message?: string;
}
