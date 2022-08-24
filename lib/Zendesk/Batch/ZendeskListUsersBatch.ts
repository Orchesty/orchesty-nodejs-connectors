import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ZendeskApplication from '../ZendeskApplication';

export const NAME = 'zendesk-list-users-batch';

export default class ZendeskListUsersBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = dto.getBatchCursor('1');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication<ZendeskApplication>().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `/users.json?per_page=100&page=${offset}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.users ?? []);
        if (response.meta.has_more) {
            dto.setBatchCursor((Number(offset) + 1).toString());
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    users: IOutput[];
    meta: {
        has_more: boolean;
        before_cursor: string;
    };
    links: {
        next: string;
        prev: string;
    };
}

export interface IOutput {
    id: number;
    name: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
