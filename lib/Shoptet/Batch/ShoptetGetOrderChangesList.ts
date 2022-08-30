import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import AShoptetList, { IPaging } from './AShoptetList';

export const NAME = 'shoptet-get-order-changes-list';

export default class ShoptetGetOrderChangesList extends AShoptetList<IResponseJson> {

    public endpoint = 'api/orders/changes';

    public lastRunKey = 'lastRunListOrderChanges';

    public fromParamKey = 'from';

    public getName(): string {
        return NAME;
    }

    protected processResult(responseDto: ResponseDto<IResponseJson>, batchProcessDto: BatchProcessDto): IPaging {
        const body = responseDto.getJsonBody().data;
        batchProcessDto.setItemList(body.changes);
        return body.paginator;
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
    code: string;
}