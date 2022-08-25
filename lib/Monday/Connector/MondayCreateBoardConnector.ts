import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'monday-create-board';

export default class MondayCreateBoardConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const body = dto.getJsonData();
        let graphQl = 'mutation { create_board (';
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(body)) {
            if (key === 'board_kind') {
                graphQl += `${key}:${value},`;
            } else {
                graphQl += `${key}:"${value}",`;
            }
        }
        graphQl = graphQl.slice(0, -1);
        graphQl += ') {board_kind description groups{id} id owner{id} owners{id}'
        + ' permissions state subscribers{id} top_group{id}}}';
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            undefined,
            { query: graphQl },
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);
        const output = resp.getJsonBody();

        if (output.error_code) {
            throw new OnRepeatException(60, 10, output.error_code ?? 'Unknown error.');
        }
        return dto.setNewJsonData(output);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    board_name: string;
    board_kind: 'board_kind' | 'public' | 'share';
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
    }[];
    board_folder_id?: number;
    board_kind: 'board_kind' | 'public' | 'share';
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
    };
    owner: string;
    owners: string[];
    permissions: 'assignee' | 'collaborators' | 'everyone' | 'owners';
    pos?: string;
    state: 'active' | 'all' | 'archived' | 'deleted';
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
