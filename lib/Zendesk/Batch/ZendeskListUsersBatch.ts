import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'zendesk-list-users-batch';

export default class ZendeskListUsersBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = dto.getBatchCursor('0');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/users.json?page[size]=100&page[after]=${offset}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.users ?? []);
    if (response.meta.after_cursor) {
      dto.setBatchCursor(response.meta.after_cursor);
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
  users: IOutput[],
  meta: {
    has_more: boolean,
    after_cursor: string | null
    before_cursor: string | null
  },
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
