import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import APohodaListBatch from './APohodaListBatch';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default abstract class APohodaGetInvoiceListBatch<IInvoiceOutput> extends APohodaListBatch<
    unknown,
    IInvoiceOutput,
    Filter
> {

    protected abstract getType(): InvoiceType;

    protected getKey(): string {
        return 'invoice';
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/list.xsd';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomListRequestAttributes(dto: BatchProcessDto): Promise<object> {
        return {
            '@_invoiceType': this.getType(),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLastRunKey(dto: BatchProcessDto): Promise<string> {
        return this.getType();
    }

}

export enum InvoiceType {
    ISSUED = 'issuedInvoice',
    RECEIVED = 'receivedInvoice',
}
