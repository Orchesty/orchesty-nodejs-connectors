import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { ABaseBatch } from './ABaseBatch';

export const NAME = 'inventory-products-data';

export default class InventoryProductsData extends ABaseBatch<IInput> {

    public constructor(private readonly useAsBatch = false) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getInventoryProductsData';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(dto: BatchProcessDto<IInput>): Promise<object> {
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

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async processOutputData(dto: BatchProcessDto, body: IOutput): Promise<BatchProcessDto> {
        if (this.useAsBatch) {
            dto.addItem(body);
        } else {
            Object.values(body.products).forEach((product) => {
                dto.addItem(product);
            });
        }

        return dto;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected hasNextPage(jsonBody: IOutput): boolean {
        return false;
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
