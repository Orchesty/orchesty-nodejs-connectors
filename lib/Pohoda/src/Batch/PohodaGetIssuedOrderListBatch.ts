import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaGetOrderListBatch, { OrderType } from './APohodaGetOrderListBatch';

export const NAME = `${APPLICATION_NAME}-get-issued-order-list-batch`;

export const LAST_RUN_KEY = OrderType.ISSUED;

export default class PohodaGetIssuedOrderListBatch extends APohodaGetOrderListBatch<IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getType(): OrderType {
        return OrderType.ISSUED;
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    orderHeader: {
        id: number;
        orderType: string;
        number: {
            id: number;
            ids: number;
            numberRequested: number;
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
                phone: string;
                email: string;
            };
        };
        myIdentity: {
            address: {
                company: string;
                city: string;
                street: string;
                number: string;
                zip: string;
                ico: number;
                dic: string;
                mobilPhone: string;
                email: string;
            };
            establishment: {
                company: string;
                city: string;
                street: string;
                zip: string;
            };
        };
        paymentType: {
            id: number;
            ids: string;
            paymentType: string;
        };
        isExecuted: boolean;
        isDelivered: boolean;
        permanentDocument: boolean;
        intNote: string;
        lock1: boolean;
        lock2: boolean;
        markRecord: boolean;
        parameters: string;
    };
    orderDetail: {
        orderItem: {
            id: number;
            text: string;
            quantity: number;
            delivered: number;
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
        }[];
    };
    orderSummary: {
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
                number: string;
            };
        }[];
    };
    version: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
