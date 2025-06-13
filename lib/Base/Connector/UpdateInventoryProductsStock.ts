import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'update-inventory-products-stock';

export default class UpdateInventoryProductsStock extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'updateInventoryProductsStock';
    }

    protected getParameters(dto: ProcessDto<IInput>): object {
        const { inventoryId, products } = dto.getJsonData();

        return {
            inventory_id: inventoryId,
            products,
        };
    }

}

export interface IInput {
    inventoryId: string;
    products: Record<string, Record<string, number>>;
}

export interface IOutput {
    counter: number;
    warnings: string;
}
