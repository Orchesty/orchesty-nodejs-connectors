import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaGetOrderListBatch, { OrderType } from './APohodaGetOrderListBatch';

export const NAME = `${APPLICATION_NAME}-get-received-order-list-batch`;

export const LAST_RUN_KEY = OrderType.RECEIVED;

export default class PohodaGetReceivedOrderListBatch extends APohodaGetOrderListBatch<IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getType(): OrderType {
        return OrderType.RECEIVED;
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    orderHeader: {
        id: number;
        orderType: string;
        storno: string;
        number: {
            id: number;
            ids: number;
            numberRequested: number;
        };
        numberOrder: number;
        date: string;
        dateFrom: string;
        dateTo: string;
        text: string;
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
        isReserved: boolean;
        dateCancellation: string;
        permanentDocument: boolean;
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
    orderDetail: {
        orderItem: {
            id: number;
            text: string;
            quantity: number;
            delivered: number;
            unit?: string;
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
            code?: number;
            stockItem?: {
                store: {
                    id: number;
                    ids: string;
                };
                stockItem: {
                    id: number;
                    ids: number;
                    EAN: number;
                };
            };
            PDP: boolean;
            parameters: {
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
        }[];
    };
    orderSummary: {
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
            price3: number;
            price3VAT: {
                '#text': number;
                rate: number;
            };
            price3Sum: number;
            round: {
                priceRound: number;
            };
        };
    };
    version: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
