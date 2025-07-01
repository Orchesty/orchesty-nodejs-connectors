import ABaseConnector from './ABaseConnector';

export const NAME = 'order-status-list';

export default class OrderStatusList extends ABaseConnector<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getOrderStatusList';
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    statuses:
    {
        id: number;
        name: string;
        name_for_customer: string;
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
