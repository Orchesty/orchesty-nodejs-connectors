import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import AShoptetList, { IPaging } from './AShoptetList';

export const NAME = 'shoptet-get-products-list';

export default class ShoptetGetProductsList extends AShoptetList {

    protected endpoint = 'api/products';

    protected lastRunKey = 'lastRunListProducts';

    public getName(): string {
        return NAME;
    }

    protected processResult(responseDto: ResponseDto<IResponseJson>, batchProcessDto: BatchProcessDto): IPaging {
        const body = responseDto.getJsonBody().data;
        batchProcessDto.setItemList(body.products);

        return body.paginator;
    }

}

interface IResponseJson {
    data: {
        products: IOutputJson[];
        paginator: IPaging;
    };
}

export interface IOutputJson {
    guid: string;
}
