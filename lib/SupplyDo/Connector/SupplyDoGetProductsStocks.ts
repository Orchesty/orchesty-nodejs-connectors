import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IProduct } from './SupplyDoUpsertProduct';

export const NAME = 'supply-do-get-products-stocks';

export default class SupplyDoGetProductsStocks extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const { ecommerce, updatedAt } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `items/product_batch_warehouse?fields[]=*&fields[]=product_batch.product.*&fields[]=warehouse.*&fields[]=product_batch.*&filter[eccommerce][_eq]=${ecommerce}&filter[updated_at][_gte]=${updatedAt}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    ecommerce: number;
    updatedAt: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    data: {
        id: number;
        product_batch: {
            id: number;
            name: string;
            product: IProduct;
            expiresAt?: string;
            external_id?: string;
        };
        purchase_order_status: string;
        quantity: number;
        warehouse: {
            address: {
                city: string;
                country: string;
                street: string;
                street_number: string;
                name?: string;
            };
            country: string;
            id: number;
            name: string;
            ecommerce: number;
            product_batches: unknown[];
        };
        updated_at: string;
        ecommerce: number;
    }[];
    meta: {
        total_count?: number;
        filter_count?: number;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
