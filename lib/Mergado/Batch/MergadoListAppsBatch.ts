import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'mergado-list-apps-batch';
const LIMIT = 99;

export default class MergadoListAppsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = Number(dto.getBatchCursor('0'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `apps/?limit=${LIMIT}&offset=${offset}`;
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.data ?? []);
        if (response.total_results === LIMIT + 1) {
            dto.setBatchCursor((offset + LIMIT).toString());
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    data: IOutput[];
    limit: number;
    total_results: number;
    offset: number;
}

export interface IOutput {
    creation_date: Date;
    forum_url: string;
    latest_release_date: Date;
    title: string;
    trial_period: number;
    type: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
