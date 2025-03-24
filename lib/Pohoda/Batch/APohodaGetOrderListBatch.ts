import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import APohodaListBatch from './APohodaListBatch';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default abstract class APohodaGetOrderListBatch<IOrderOutput> extends APohodaListBatch<
    unknown,
    IOrderOutput,
    Filter
> {

    protected abstract getType(): OrderType;

    protected getKey(): string {
        return 'order';
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/list.xsd';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomListRequestAttributes(dto: BatchProcessDto): Promise<object> {
        return {
            '@_orderType': this.getType(),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLastRunKey(dto: BatchProcessDto): Promise<string> {
        return this.getType();
    }

}

export enum OrderType {
    ISSUED = 'issuedOrder',
    RECEIVED = 'receivedOrder',
}
