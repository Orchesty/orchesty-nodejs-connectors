import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'james-and-james-get-product-stock';

export default class JamesAndJamesGetProductStock extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto<IOutput[]>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'product/stock',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        const products: IOutput[] = [];

        resp.getJsonBody().data.warehouses.forEach((warehouse) => {
            warehouse.products.forEach((product) => {
                products.push({
                    warehouse_id: warehouse.warehouse_id,
                    product_id: product.product_id,
                    batches: product.batches,
                });
            });
        });

        return dto.setItemList(products) as BatchProcessDto<IOutput[]>;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    warehouse_id: number;
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
        warehouses: {
            warehouse_id: number;
            products: {
                product_id: number;
                batches: {
                    batch_id: number;
                    pickable_stock: number;
                    stored_stock: number;
                    incoming_stock: number;
                    moving_stock: number;
                }[];
            }[];
        }[];
    }
}

/* eslint-enable @typescript-eslint/naming-convention */
