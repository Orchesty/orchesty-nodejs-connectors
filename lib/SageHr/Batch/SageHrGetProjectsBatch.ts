import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'sage-hr-get-projects-batch';

export default class SageHrGetProjectsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `timesheets/projects?page=${page}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.errors ?? []);
    if (response.meta.current_page < response.meta.total_pages) {
      dto.setBatchCursor((response.meta.next_page).toString());
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    errors: string[];
    meta: {
        current_page: number;
        next_page: number;
        total_pages: number;
        per_page: number;
        total_entries: number;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
