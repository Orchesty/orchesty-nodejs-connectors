import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-create-product-batch-warehouse';

export default class SupplyDoCreateProductBatchWarehouse extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'items/product_batch_warehouse',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

interface IResponse {
    data: IInput[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export type IInput = IProductBatch | IProductBatch[];

export interface IProductBatch {
    id: number;
    quantity: number;
    warehouse: number;
    updated_at: string;
    ecommerce: number;
    stocked_at: string;
    product_batch?: number | {
        id: number;
        name: string;
        product: number | {
            alt_ean?: string;
            brand?: number;
            color?: string;
            country_of_origin?: string;
            ean: string;
            eta_days?: number;
            height_cm?: number;
            id: number;
            length_cm?: number;
            name: string;
            purchase_price?: number | {
                amount: number;
                currency: string;
            };
            sd: boolean;
            selling_price: number | {
                amount: number;
                currency: string;
            };
            supplier?: number;
            tags?: unknown;
            weight_grams: number;
            width_cm?: number;
            ecommerce: number | {
                company?: number | {
                    id: number;
                    name: string;
                    address: number | {
                        city: string;
                        country: string;
                        name?: string;
                        street: string;
                        street_number: string;
                        zip_code?: string;
                    };
                    dic?: string;
                    ico?: string;
                    url?: string;
                    vat_payer?: boolean;
                    active?: boolean;
                    negative?: number;
                    normal?: number;
                    positive?: number;
                    ecommerces: number[];
                    users: string[];
                };
                id: number;
                name: string;
                url?: string;
                active: boolean;
                installed: boolean;
                type: EcommerceType;
                logistics_method?: string;
                markets?: unknown;
                order_count_monthly?: number;
                order_quantity?: number;
                return_percent?: number;
                sku_quantity?: number;
                special_order_packaging?: boolean;
                warehouse_area?: number;
                warehouse_quantity?: number;
                countries: {
                    country: number | {
                        id: number;
                        iso_code: string;
                        ecommerces: number[];
                    };
                    ecommerce: number;
                    id: number;
                }[] | number[];
            };
            external_id: string;
            category?: string;
            image?: unknown;
        };
        expiresAt: string;
        external_id: string;
        ecommerce: number;
        product_batch_warehouse: number[];
        selling_order_product: {
            id: number;
            price: number | {
                amount: number;
                currency: string;
            };
            quantity: number;
            selling_order: string;
        }[] | number[];
        product_batch: number;
        warehouse: number;
        reclamation_product: number[];
        return_product: number[];
    };
}
/* eslint-enable @typescript-eslint/naming-convention */

export enum EcommerceType {
    SHOPIFY = 'shopify',
    SHOPTET = 'shoptet',
    WOOCOMMERCE = 'woocommerce',
}
