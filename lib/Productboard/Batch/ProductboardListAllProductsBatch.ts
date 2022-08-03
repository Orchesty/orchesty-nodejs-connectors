import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BASE_URL } from '../ProductboardApplication';

export const NAME = 'productboard-list-all-products-batch';
export default class ProductboardListAllProductsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = _dto.getBatchCursor('products?pageLimit=100&pageOffset=0');
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.links.next) {
      dto.setBatchCursor(response.links.next.replace(`${BASE_URL}/`, ''));
    }
    return dto;
  }
}

interface IResponse {
    data: IOutput[];
    links: {
        next: string;
    }
}

export interface IOutput {
    data: {
        id: string;
        name: string;
        description: string;
        owner: {
            email: string;
        };
        links: {
            self: string;
            html: string;
        };
    }[];
    links: {
        next: string;
    };
}
