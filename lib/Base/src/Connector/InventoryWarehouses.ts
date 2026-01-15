import ABaseConnector from './ABaseConnector';

export const NAME = 'inventory-warehouses';

export default class InventoryWarehouses extends ABaseConnector<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getInventoryWarehouses';
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    warehouses:
    {
        warehouse_type: string;
        warehouse_id: number;
        name: string;
        description: string;
        stock_edition: boolean;
        is_default: boolean;
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
