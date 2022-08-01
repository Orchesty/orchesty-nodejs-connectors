import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'calendly-list-events-batch';

export default class CalendlyListEventsBatch extends ABatchNode {
    public getName = (): string => NAME;

    public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
        const dto = _dto;

        return dto;
    }
}
