import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'humaans-list-companies';

export default class HumaansListCompaniesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const skip = Number(dto.getBatchCursor('1'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/api/companies?skip=${skip}&limit=${100}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.total >= response.limit) {
      dto.setBatchCursor((skip + response.limit).toString());
    }

    return dto;
  }
}

interface IResponse {
    total: number,
    limit: number,
    skip: number,
    data: IOutput[],
}

export interface IOutput {
        id: string,
        name: string,
        domains: [],
        trialEndDate: string,
        status: string,
        paymentStatus: string,
        package: string,
        createdAt: string,
        updatedAt: string,
        requireTimeAwayApprovalFor: [],
        isTimesheetEnabled: boolean
}
