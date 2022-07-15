import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mall-get-product-list-batch';

export default class MallGetProductListBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `products?page=${page}&page_size=1000`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (Number(page) !== response.paging.pages) {
      dto.setBatchCursor((Number(page) + 1).toString());
    }
    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse{
  result: {
    code: number,
    status: string
  },
  paging: {
    total: number,
    pages: number,
    size: number,
    page: number
  },
  data: IOutput[]
}

export interface IOutput {
  id: string,
  product_id: number,
  title: string,
  status: string,
  stage: string,
  in_stock: number,
  category_id: string,
  price: number,
  rrp: number,
  variants_count: number,
  has_variants: boolean
}
/* eslint-enable @typescript-eslint/naming-convention */