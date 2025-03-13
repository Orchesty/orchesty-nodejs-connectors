import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-stock-list-batch`;

export const LAST_RUN_KEY = 'stock';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
    STORE = 'store',
}

export default class PohodaGetStockListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

    public getName(): string {
        return NAME;
    }

    protected getKey(): string {
        return LAST_RUN_KEY;
    }

    protected getSchema(): string {
        return 'http://www.stormware.cz/schema/version_2/list_stock.xsd';
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    stockHeader: {
        id: number;
        stockType: string;
        code: string;
        EAN: string;
        isSales: boolean;
        isInternet: boolean;
        purchasingRateVAT: {
            '#text': string;
            value: number;
        };
        sellingRateVAT: {
            '#text': string;
            value: number;
        };
        name: string;
        nameComplement: string;
        unit: string;
        storage: {
            id: number;
            ids: string;
        };
        typePrice: {
            id: number;
            ids: string;
        };
        weightedPurchasePrice: number;
        purchasingPrice: number;
        sellingPrice: number;
        fixation: string;
        limitMin: number;
        mass: number;
        count: number;
        countReceivedOrders: number;
        reservation: number;
        reclamation: number;
        service: number;
        supplier: {
            id: number;
        };
        orderQuantity: number;
        countIssuedOrders: number;
        producer: string;
        classOfStock: string;
        news: boolean;
        clearanceSale: boolean;
        sale: boolean;
        recommended: boolean;
        discount: boolean;
        prepare: boolean;
        controlLimitTaxLiability: boolean;
        markRecord: boolean;
        parameters: {
            parameter: {
                name: string;
                textValue: string;
                integerValue?: number;
                booleanValue?: boolean;
                datetimeValue?: boolean;
                listValueRef?: {
                    id: number;
                    ids: string;
                };
                list?: {
                    id: number;
                    ids: string;
                };
            }[];
        };
    };
    stockPriceItem: {
        stockPrice: {
            id: number;
            ids: string;
            price: number;
        }[];
    };
    version: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
