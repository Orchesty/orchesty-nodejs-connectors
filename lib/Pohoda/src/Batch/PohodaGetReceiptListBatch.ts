import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-receipt-list-batch`;

export const LAST_RUN_KEY = 'prijemka';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default class PohodaGetReceiptListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

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
    prijemkaHeader: {
        id: number;
        number: {
            id: number;
            ids: string;
            numberRequested: string;
        };
        date: string;
        text: string;
        partnerIdentity: {
            id: number;
            address: {
                company: string;
                city: string;
                street: string;
                zip: string;
                ico: number;
                dic: string;
            };
        };
        symPar: number;
        isExecuted: boolean;
        isDelivered: boolean;
        centre: {
            id: number;
            ids: string;
        };
        lock1: boolean;
        lock2: boolean;
        markRecord: boolean;
    };
    prijemkaDetail: {
        prijemkaItem: {
            id: number;
            text: string;
            quantity: number;
            unit: string;
            coefficient: number;
            payVAT: boolean;
            rateVAT: {
                '#text': string;
                value: number;
            };
            discountPercentage: number;
            homeCurrency: {
                unitPrice: number;
                price: number;
                priceVAT: number;
                priceSum: number;
            };
            code: string;
            stockItem: {
                store: {
                    id: number;
                    ids: string;
                };
                stockItem: {
                    id: number;
                    ids: number[];
                    EAN: number;
                };
            };
        }[];
    };
    prijemkaSummary: {
        roundingDocument: string;
        roundingVAT: string;
        typeCalculateVATInclusivePrice: string;
        homeCurrency: {
            priceNone: number;
            priceLow: number;
            priceLowVAT: {
                '#text': number;
                rate: number;
            };
            priceLowSum: number;
            priceHigh: number;
            priceHighVAT: {
                '#text': number;
                rate: number;
            };
            priceHighSum: number;
            round: {
                priceRound: number;
            };
        };
    };
    linkedDocuments: {
        link: {
            sourceAgenda: string;
            sourceDocument: {
                id: number;
                number: string;
            };
        }[];
    };
    version: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
