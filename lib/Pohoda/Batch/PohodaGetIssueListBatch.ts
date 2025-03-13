import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaListBatch from './APohodaListBatch';

export const NAME = `${APPLICATION_NAME}-get-issue-list-batch`;

export const LAST_RUN_KEY = 'vydejka';

export enum Filter {
    LAST_CHANGES = 'lastChanges',
    DATE_FROM = 'dateFrom',
}

export default class PohodaGetIssueListBatch extends APohodaListBatch<unknown, IOutput, Filter> {

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
    vydejkaHeader: {
        id: number;
        number: {
            id: number;
            ids: string;
            numberRequested: string;
        };
        date: string;
        numberOrder: number;
        dateOrder: string;
        partnerIdentity: {
            address: {
                company: string;
                name: string;
                city: string;
                street: string;
                zip: number;
                country: {
                    id: number;
                    ids: string;
                };
                phone: number;
                email: string;
            };
            shipToAddress?: {
                company: string;
                name: string;
                city: string;
                street: string;
                zip: number;
                country: {
                    id: number;
                    ids: string;
                };
                phone: number;
                email: string;
            };
        };
        priceLevel: {
            id: number;
            ids: string;
        };
        paymentType: {
            id: number;
            ids: string;
            paymentType: string;
        };
        isExecuted: boolean;
        isDelivered: boolean;
        centre: {
            id: number;
            ids: string;
        };
        lock1: boolean;
        lock2: boolean;
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
    vydejkaDetail: {
        vydejkaItem: {
            id: number;
            text: string;
            quantity: number;
            transferred: number;
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
                    ids: string;
                    EAN: number;
                };
            };
            PDP: boolean;
            linkedDocument: {
                sourceAgenda: string;
                sourceDocument: {
                    id: number;
                    number: number;
                };
                sourceDocumentItem: {
                    sourceItemId: number;
                };
            };
            parameters: string;
        }[];
    };
    vydejkaSummary: {
        roundingDocument: string;
        roundingVAT: string;
        calculateVAT: boolean;
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
                number: number;
            };
        }[];
    };
    version: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
