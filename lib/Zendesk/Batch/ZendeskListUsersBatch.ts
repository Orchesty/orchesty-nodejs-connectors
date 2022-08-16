import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'zendesk-list-users-batch';

export default class ZendeskListUsersBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/users.json?per_page=100&page=${offset}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.users ?? []);
    if (response.next_page != null) {
      dto.setBatchCursor((Number(offset) + 1).toString());
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
  users: IOutput[],
  next_page: string,
  links: {
    next: string,
    prev: string
  }
}

export interface IOutput {
  id: number,
  name: string
}

/* eslint-enable @typescript-eslint/naming-convention */
