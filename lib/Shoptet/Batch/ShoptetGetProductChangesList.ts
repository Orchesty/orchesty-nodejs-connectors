import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';
import AShoptetList, { IPaging } from './AShoptetList';

export const NAME = 'shoptet-get-product-changes-list';

export default class ShoptetGetProductChangesList extends AShoptetList<IResponseJson> {

    public endpoint = 'api/products/changes';

    public lastRunKey = 'lastRunListProductChanges';

    public fromParamKey = 'from';

    public getName(): string {
        return NAME;
    }

    protected processResult(responseDto: ResponseDto<IResponseJson>, batchProcessDto: BatchProcessDto): IPaging {
        const body = responseDto.getJsonBody().data;

        if (body.changes.length) {
            this.setItemsListToDto(batchProcessDto, body.changes);
        } else {
            batchProcessDto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'No changes since last import.');
        }

        return body.paginator;
    }

    protected setItemsListToDto(dto: BatchProcessDto, responseBody: IOutputJson[]): void {
        dto.setItemList(responseBody);
    }

    protected getDefaultLastRun(): string {
        return ShoptetPremiumApplication.shoptetDateISO(new Date(), -1 * 30 * 24);
    }

}

export interface IResponseJson {
    data: {
        changes: IOutputJson[];
        paginator: IPaging;
    };
}

export interface IOutputJson {
    changeType: string;
    changeTime: string;
    guid: string;
}
