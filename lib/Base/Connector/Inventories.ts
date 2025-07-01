import ABaseConnector from './ABaseConnector';

export const NAME = 'inventories';

export default class Inventories extends ABaseConnector<unknown, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getInventories';
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    inventories:
    {
        inventory_id: number;
        name: string;
        description: string;
        languages: string[];
        default_language: string;
        price_groups: number[];
        default_price_group: number;
        warehouses: string[];
        default_warehouse: string;
        reservations: boolean;
        is_default: boolean;
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
