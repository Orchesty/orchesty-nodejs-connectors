import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'inventory-products-data';

export default class InventoryProductsData extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getInventoryProductsData';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(dto: ProcessDto<IInput>): Promise<object> {
        const { inventoryId, products, includeErpUnits, includeWmsUnits, includeAdditionalEans } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            inventory_id: inventoryId,
            products,
            include_erp_units: includeErpUnits,
            include_wms_units: includeWmsUnits,
            include_additional_eans: includeAdditionalEans,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

}

export interface IInput {
    inventoryId: string;
    products: number[];
    includeErpUnits: boolean;
    includeWmsUnits: boolean;
    includeAdditionalEans: boolean;
}

export interface Variant {
    name: string;
    sku: string;
    ean: number;
    prices: Record<string, string>;
    stock: Record<string, number>;
    locations: Record<string, string>;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface Product {
    is_bundle: boolean;
    ean: number;
    sku: string;
    tags: string[];
    tax_rate: number;
    weight: number;
    height: number;
    width: number;
    length: number;
    star: number;
    category_id: number;
    manufacturer_id: number;
    prices: Record<string, string>;
    stock: Record<string, number>;
    locations: Record<string, string>;
    text_fields: Record<string, string>;
    average_cost: number;
    average_landed_cost: number;
    images: Record<number, string>;
    links: Record<string, Record<string, string>>;
    variants: Record<string, Variant>
}

export interface IOutput {
    products: Record<string, Product>
}
/* eslint-enable @typescript-eslint/naming-convention */
