import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';

export const NAME = 'marketo-get-files-connector';

export default class MarketoGetFilesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('20'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/asset/v1/files.json?offset=${offset}&limit=${200}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput;

    dto.setItemList(response.data ?? []);
    if (response.maxReturn >= 200) {
      dto.setBatchCursor((offset + 200).toString());
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IOutput {
    data: {
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
    }[]
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
    maxReturn: number;
}
/* eslint-enable @typescript-eslint/naming-convention */
