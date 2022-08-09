import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';

export const NAME = 'marketo-get-files-connector';
const LIMIT = 200;

export default class MarketoGetFilesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('0'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/asset/v1/files.json?offset=${offset}&maxReturn=${LIMIT}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput;

    dto.setItemList(response.result ?? []);
    if (response.result.length >= LIMIT) {
      dto.setBatchCursor((offset + LIMIT).toString());
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IOutput {
    errors: {
        code: string,
        message: string
    }[],
    requestId: string,
    result: {
        createdAt: string,
        description: string,
        folder: {
            id: number,
            name: string,
            type: string
        },
        id: number,
        mimeType: string,
        name: string,
        size: number,
        updatedAt: string,
        url: string
    }[],
    success: true,
    warnings: {
        createdAt: string,
        description: string,
        folder: {
            id: number,
            name: string,
            type: string
        },
        id: number,
        mimeType: string,
        name: string,
        size: number,
        updatedAt: string,
        url: string
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
