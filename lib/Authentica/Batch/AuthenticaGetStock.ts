import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'authentica-get-stock';

export default class AuthenticaGetStock extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `stock?page=${page}&limit=100`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (Number(page) !== response.meta.totalPages) {
      dto.setBatchCursor((Number(page) + 1).toString());
    }
    return dto;
  }
}

interface IResponse{
    data: IOutput[],
    links: {
        first: string,
        last: string,
        prev?: string | null,
        next?: string | null

    },
    meta: {
        totalPages: number
    }
}

export interface IOutput{
        sku: string,
        inStock: string
}
