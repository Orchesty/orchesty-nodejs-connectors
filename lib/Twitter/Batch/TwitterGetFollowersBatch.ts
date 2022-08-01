import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'twitter-get-followers-batch';
const LIMIT = 99;

export default class TwitterGetFollowersBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const { id } = dto.jsonData as IInput;

    const token = dto.getBatchCursor('');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `2/users/${id}/followers/?max_results=${LIMIT}${token}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

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
