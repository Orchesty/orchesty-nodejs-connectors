import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'order-payments-history';

export default class OrderPaymentsHistory extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getOrderPaymentsHistory';
    }

    protected getParameters(dto: ProcessDto<IInput>): object {
        const { orderId, showFullHistory } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            order_id: orderId,
            show_full_history: showFullHistory,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

}

export interface IInput {
    orderId: number;
    showFullHistory: boolean;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    payments:
    {
        paid_before: string;
        paid_after: string;
        total_price: string;
        date: string;
        currency: string;
        external_payment_id: string;
        comment: string;
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
