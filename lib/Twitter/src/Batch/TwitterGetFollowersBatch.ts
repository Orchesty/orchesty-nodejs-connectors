import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'twitter-get-followers-batch';

export default class TwitterGetFollowersBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { id } = dto.getJsonData();

        const token = dto.getBatchCursor('');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `2/users/${id}/followers/?max_results=100${token}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.data ?? []);
        if (response.next_token) {
            const nextToken = `&pagination_token=${response.next_token}`;
            dto.setBatchCursor(nextToken);
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string;
}

interface IResponse {
    data: IOutput[];
    result_count: number;
    next_token: string;
}

export interface IOutput {
    id: string;
    name: string;
    username: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
