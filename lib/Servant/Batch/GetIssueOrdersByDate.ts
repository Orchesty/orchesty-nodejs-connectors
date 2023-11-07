import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABaseSoapBatch from './ABaseSoapBatch';

export const NAME = 'get-issue-orders-by-date';
export const LAST_RUN_KEY = 'lastRunListOrders';

export default class GetIssueOrdersByDate extends ABaseSoapBatch {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        return this.callSOAP<IOutput[]>(
            dto,
            'GetIssueOrdersByDate',
            'orders',
            {},
            LAST_RUN_KEY,
        );
    }

}

export interface IOutput {
    order: string;
    document: string;
    invoice: string;
    orderItems: IOrderItem[];
    activities: IImportActivity[];
    transportItems: ITransportItem[];
    partnerName: string;
    partnerCode: string;
    recipientAddress: string;
    cashOnDelivery: ICashOnDelivery;
    note: string;
    state: string;
    warning: string;
    error: Date;
    requiredDispatch: Date;
    dispatch: Date;
    loaded: Date;
    entered: Date;
    packaged: Date;
    transportCarrier: string;
    transportEntered: Date;
    transportPicked: Date;
    transportDelivered: Date;
}

export interface IOrderItem {
    item: IItem;
    requiredCount: number;
    count: number;
    activities: IActivity[];
}

interface IImportActivity {
    checkExpiration: boolean;
    checkBatch: boolean;
    checkSerialNumbers: boolean;
    printLabel: boolean;
    labels: IImportLabel[];
    services: string[];
    documentsType: string;
}

interface ITransportItem {
    unit: string;
    servantNumber: string;
    transportNumber: string;
    statusUrl: string;
    packageType: string;
    weight: number;
}

interface ICashOnDelivery {
    amount: number;
    currency: string;
    variableSymbol: string;
}

interface IItem {
    code: string;
    name: string;
    attributes: string[];
    expiration: Date;
    batch: string;
    unit: string;
}

interface IActivity {
    id: number;
    name: string;
    value: string;
    count: number;
    servantNumber: string;
    transportNumber: string;
}

interface IImportLabel {
    type: number;
    specification: string;
}
