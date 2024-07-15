import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const PINYA_ABSENCES_BATCH = 'pinya-absences-batch';

export default class PinyaAbsencesBatch extends ABatchNode {

    public constructor(resultAsBatch = false, protected batchSize = 50) {
        super(resultAsBatch);
    }

    public getName(): string {
        return PINYA_ABSENCES_BATCH;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `absences?${this.processFilter(dto)}`,
        );
        const resp = await this.getSender().send<Response>(req, { success: ['<300', '404'] });
        let response = resp.getJsonBody();
        if (!('data' in response)) { // Instead of empty data, Pinya returns an error
            response = {
                pageNumber: 0,
                pageSize: 1,
                lastPage: 0,
                totalItemsCount: 0,
                count: 0,
                data: [],
            };
        }

        this.processResult(dto, response);

        if (response.lastPage > response.pageNumber) {
            dto.setBatchCursor((response.pageNumber + 1).toString());
        } else {
            dto.removeBatchCursor();
        }

        return dto;
    }

    protected processFilter(dto: BatchProcessDto): string {
        const page = Number(dto.getBatchCursor('0'));

        return `PageNumber=${page}&PageSize=${this.batchSize}`;
    }

    protected processResult(dto: BatchProcessDto, response: Response): BatchProcessDto {
        return dto.setItemList(response.data, this.resultAsBatch);
    }

}

export interface PinyaAbsencesOutput {
    id: number;
    dateFrom: string;
    dateTo: string;
    absenceState: string;
    amount: number;
    description: string;
    employeeNumber: string;
    absenceTypeCode: string;
    absenceTypeTitle: string;
    absenceTypeShortcut: string;
    isWorktime: boolean;
}

interface Response {
    pageNumber: number;
    pageSize: number;
    lastPage: number;
    totalItemsCount: number;
    count: number;
    data: PinyaAbsencesOutput[];
}
