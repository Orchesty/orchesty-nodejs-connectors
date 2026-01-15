import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import JamesAndJamesApplication from '../JamesAndJamesApplication';

export const NAME = 'james-and-james-get-product-stock-v1';

export default class JamesAndJamesGetProductStockV1 extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto<IOutput[]>> {
        const req = this.getApplication<JamesAndJamesApplication>().getRequestDtoV1(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'product/stock?split_by_batch=true',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        const products: IOutput[] = [];

        const warehouses = resp.getJsonBody().data.stock;
        Object.entries(warehouses).forEach(([warehouse, stocks]) => {
            Object.entries(stocks).forEach(([_sku, product]) => {
                products.push({
                    warehouse,
                    product_id: Number(product.id),
                    batches: Object.entries(product.batches).map(([batchId, batch]) => ({
                        batch_id: Number(batchId),
                        ...batch,
                    })),
                });
            });
        });

        return dto.setItemList(products) as BatchProcessDto<IOutput[]>;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    warehouse: string;
    product_id: number;
    batches: {
        batch_id: number;
        pickable_stock: number;
        stored_stock: number;
        incoming_stock: number;
        moving_stock: number;
    }[];
}

export interface IResponse {
    data: {
        test: boolean;
        stock: Record<string, Record<string, {
            id: string;
            totals: {
                pickable_stock: number;
                stored_stock: number;
                incoming_stock: number;
                moving_stock: number;
                needed_stock: number;
                needed_for_assembly_stock: number;
                assembleable_stock: number;
            };
            batches: Record<string, {
                pickable_stock: number;
                stored_stock: number;
                incoming_stock: number;
                moving_stock: number;
            }>,
        }>>;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
