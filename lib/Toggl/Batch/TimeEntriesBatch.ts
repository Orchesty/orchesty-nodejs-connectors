import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import TogglApplication from '../TogglApplication';

export default class TimeEntriesBatch extends ABatchNode {

    public getName(): string {
        return 'toggle-list-time-entries';
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const data = dto.getJsonData();
        const app = this.getApplication<TogglApplication>();
        const req = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `time_entries?start_date=${data.startDate}&end_date=${data.endDate}`,
        );
        const resp = await this.getSender().send<IOutput[]>(req);

        return dto.setItemList(resp.getJsonBody());
    }

}

export interface IInput {
    startDate: string;
    endDate: string;
}

export interface IOutput {
    description: string | null;
    duration: number;
    start: string;
    id: number;
    project_id: number;
}
