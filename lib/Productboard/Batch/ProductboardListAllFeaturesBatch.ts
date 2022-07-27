import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'productboard-list-all-features-batch';
const LIMIT = 99;
export default class ProductboardListAllFeaturesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('0'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `features?pageLimit=${LIMIT}&pageOffset=${offset}`;
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
      dto.setBatchCursor((offset + LIMIT).toString());
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
    id: string;
    name: string;
    description: string;
    type: string;
    archived: boolean;
    status: {
        id: string;
        name: string;
    };
    parent: {
        feature: {
            id: string;
            links: {
                self: string;
            };
        };
    };
    links: {
        self: string;
        html: string;
    };
    timeframe: {
        startDate: string;
        endDate: string;
        granularity: string;
    };
    owner: {
        email: string;
    };
}
