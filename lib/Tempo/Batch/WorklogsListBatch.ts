import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import TempoApplication from '../TempoApplication';

export const NAME = 'tempo-worklogs-list-batch';

export default class WorklogsListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const data = dto.getJsonData();
        const app = this.getApplication<TempoApplication>();
        const req = app.getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `/worklogs?limit=999&from=${data.startDate}&to=${data.endDate}`,
        );
        const resp = await this.getSender().send<IResponse>(req);

        return dto.setItemList(resp.getJsonBody().results);
    }

}

export interface IInput {
    startDate: string;
    endDate: string;
}

interface IResponse {
    results: IOutput[];
    metadata: {
        count: number;
        limit: number;
        next: string;
        offset: number;
        previous: string;
    };
}

export interface IOutput {
    attributes: {
        values: [
            {
                key: string;
                value: string;
            },
        ];
    };
    author: {
        accountId: string;
    };
    issue: {
        id: number;
    };
    billableSeconds: number;
    createdAt: string;
    description: string;

    startDate: string;
    startTime: string;
    tempoWorklogId: number;
    timeSpentSeconds: number;
    updatedAt: string;
}
