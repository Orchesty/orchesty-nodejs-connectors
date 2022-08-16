import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'authentica-get-stock';

export default class AuthenticaGetStock extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const link = dto.getBatchCursor('stock?page=1&limit=100');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      link,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.links.next) {
      dto.setBatchCursor(response.links.next);
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
        totalPages: 0
    }
}

export interface IOutput{
        sku: string,
        inStock: string
}
