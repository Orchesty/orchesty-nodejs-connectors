import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'humaans-list-companies';

export default class HumaansListCompaniesBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const skip = Number(dto.getBatchCursor('1'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `/companies?$skip=${skip}&$limit=100`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.data ?? []);
        if (response.total >= response.limit) {
            dto.setBatchCursor((skip + response.limit).toString());
        }

        return dto;
    }

}

interface IResponse {
    total: number;
    limit: number;
    skip: number;
    data: IOutput[];
}

export interface IOutput {
    id: string;
    name: string;
    domains: [];
    trialEndDate: string;
    status: string;
    paymentStatus: string;
    package: string;
    createdAt: string;
    updatedAt: string;
    requireTimeAwayApprovalFor: [];
    isTimesheetEnabled: boolean;
}
