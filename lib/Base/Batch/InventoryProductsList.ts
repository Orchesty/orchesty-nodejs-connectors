import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { ABaseBatch } from './ABaseBatch';

export const NAME = 'inventory-products-list';

export default class InventoryProductsList extends ABaseBatch<IInput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getInventoryProductsList';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(dto: BatchProcessDto<IInput>, page: number, _lastRun?: Date): Promise<object> {
        const {
            inventoryId,
            filterId,
            filterCategoryId,
            filterEan,
            filterSku,
            filterName,
            filterPriceFrom,
            filterPriceTo,
            filterStockFrom,
            filterStockTo,
            filterSort,
        } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            inventory_id: inventoryId,
            filter_id: filterId,
            filter_category_id: filterCategoryId,
            filter_ean: filterEan,
            filter_sku: filterSku,
            filter_name: filterName,
            filter_price_from: filterPriceFrom,
            filter_price_to: filterPriceTo,
            filter_stock_from: filterStockFrom,
            filter_stock_to: filterStockTo,
            filter_sort: filterSort,
            page,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async processOutputData(dto: BatchProcessDto, body: IOutput): Promise<BatchProcessDto> {
        Object.values(body.products).forEach((product) => {
            dto.addItem(product);
        });

        return dto;
    }

    protected hasNextPage(jsonBody: IOutput): boolean {
        return Object.keys(jsonBody.products).length >= 1000;
    }

}

export interface IInput {
    inventoryId: string;
    filterId?: number;
    filterCategoryId?: number;
    filterEan?: string;
    filterSku?: string;
    filterName?: string;
    filterPriceFrom?: number;
    filterPriceTo?: number;
    filterStockFrom?: number;
    filterStockTo?: number;
    filterSort?: string;
}

export interface Product {
    id: number;
    ean: string;
    sku: string;
    name: string;
    prices: Record<string, number>,
    stock: Record<string, number>
}

export interface IOutput {
    products: Record<string, Product>
}
