import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'productboard-list-all-products-batch';

export default class ProductboardListAllProductsBatch extends ABatchNode {
    public getName = (): string => NAME;

    public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
        const dto = _dto;

        return dto;
    }
}
