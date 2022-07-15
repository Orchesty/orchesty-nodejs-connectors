import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mall-get-order-list-batch';

export default class MallGetOrderListBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `orders?page=${page}&page_size=1000`,
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
interface IResponse{

  result: {
    code: number,
    status: string
  },
  paging: {
    pages: number,
    size: number,
    page: number
  },
  data: IOutput[]
}

export interface IOutput{
  id: number,
  purchase_id: number,
  cod: number,
  ship_date: string,
  delivered_at: string,
  status: string,
  confirmed: boolean,
  test: boolean,
  mdp: boolean,
  mdp_classic: boolean,
  mdp_spectrum: boolean,
  shipped: string,
  shipping: string,
  open: string,
  blocked: string,
  lost: string,
  returned: string,
  cancelled: string,
  delivered: string,
  customer_id: number,
  customer: string
}
/* eslint-enable @typescript-eslint/naming-convention */
