import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'box-list-tasks-batch';

export default class BoxListTasksBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { file_id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `files/${file_id}/tasks`;
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

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

export interface IOutput {
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
    };
    created_at: Date;
    completion_rule: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
