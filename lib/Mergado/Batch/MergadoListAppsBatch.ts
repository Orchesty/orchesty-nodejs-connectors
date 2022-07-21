import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mergado-list-apps-batch';
const LIMIT = 10;

export default class MergadoListAppsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('0'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `apps/?limit=${LIMIT}&offset=${offset}`;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

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
