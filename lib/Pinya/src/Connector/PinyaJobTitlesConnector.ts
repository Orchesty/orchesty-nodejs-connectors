import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const PINYA_JOB_TITLES_CONNECTOR = 'pinya-job-titles';

export class PinyaJobTitlesConnector extends AConnector {

    public getName(): string {
        return PINYA_JOB_TITLES_CONNECTOR;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<PinyaJobTitlesOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'system/job-titles?PageNumber=0&PageSize=150',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const titles = resp.getJsonBody().data;

        return dto.setNewJsonData(titles);
    }

}

interface IResponse {
    pageNumber: number;
    pageSize: number;
    lastPage: number;
    totalItemsCount: number;
    count: number;
    data: PinyaJobTitle[];
}

export interface PinyaJobTitle {
    id: number;
    title: string;
    code: string;
    description: string;
    note: string;
}

export type PinyaJobTitlesOutput = PinyaJobTitle[];
