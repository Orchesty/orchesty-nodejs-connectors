import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'todoist-get-all-projects-batch';

export default class TodoistGetAllProjectsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'projects';
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IOutput[]>(req, [200]);
        const response = resp.getJsonBody();

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
