import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-payment-list-batch`;

export const LAST_RUN_KEY = 'payment';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default class PohodaGetPaymentListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

    public getName(): string {
        return NAME;
    }

    protected getKey(): string {
        return LAST_RUN_KEY;
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/list.xsd';
    }

}

export interface IOutput {
    paymentHeader: {
        id: number;
        name: string;
        text: string;
        paymentType: string;
        useInSales: boolean;
        useInOtherAgendas: boolean;
    };
}
