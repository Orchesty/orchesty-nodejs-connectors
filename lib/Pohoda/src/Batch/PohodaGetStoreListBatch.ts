import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-store-list-batch`;

export const LAST_RUN_KEY = 'store';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default class PohodaGetStoreListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

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
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    name: string;
    text: string;
    storekeeper: {
        ids: string;
    };
    allowNegInvBalance: boolean;
    PLU: {
        usePLU: boolean;
        lowerLimit: number;
        upperLimit: number;
    };
    markRecord: boolean;
    sourceStore: boolean;
    destinationStore: boolean;
    createInventoryCard: boolean;
    accStockA: {
        material: number;
        goods: number;
        workInProgress: number;
        semiproducts: number;
        products: number;
        animals: number;
        materialOfOwnProduction: number;
    };
    version: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
