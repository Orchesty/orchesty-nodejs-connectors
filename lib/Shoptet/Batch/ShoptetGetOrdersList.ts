import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import AShoptetList, { IPaging } from './AShoptetList';

export default class ShoptetGetOrdersList extends AShoptetList<IResponseJson> {

    protected endpoint = 'api/orders';

    protected lastRunKey = 'lastRunListOrders';

    protected fromParamKey = 'creationTimeFrom';

    public getName(): string {
        return 'shoptet-get-orders-list';
    }

    protected processResult(responseDto: ResponseDto<IResponseJson>, batchProcessDto: BatchProcessDto): IPaging {
        const body = responseDto.getJsonBody().data;
        batchProcessDto.setItemList(body.orders);
        return body.paginator;
    }

}

interface IResponseJson {
    data: {
        orders: IOutputJson[];
        paginator: IPaging;
    };
}

export interface IOutputJson {
    code: string;
}
