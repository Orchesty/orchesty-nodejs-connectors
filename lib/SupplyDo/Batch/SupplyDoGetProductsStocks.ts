import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { IProduct } from '../Connector/SupplyDoUpsertProduct';

export const NAME = 'supply-do-get-products-stocks';
export const LAST_RUN_KEY = 'lastRunListProductStocks';
export const LIMIT = 1000;

export default class SupplyDoGetProductsStocks extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = await appInstall.getNonEncryptedSettings()[LAST_RUN_KEY] ?? new Date(0).toISOString();
        const page = Number(dto.getBatchCursor('0'));

        const ecommerce = dto.getUser();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'items/product_batch_warehouse?fields[]=*&fields[]=product_batch.product.*&fields[]=warehouse.*'
            + `&fields[]=product_batch.*&filter[ecommerce][_eq]=${ecommerce}&filter[updated_at][_gte]=${lastRun}`
            + `&limit=${LIMIT}&offset=${page * LIMIT}&meta=filter_count`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const { meta } = resp.getJsonBody();

        if (meta.filter_count && meta.filter_count > LIMIT * (page + 1)) {
            dto.setBatchCursor(String(page + 1));
        } else {
            appInstall.addNonEncryptedSettings({
                [LAST_RUN_KEY]: new Date().toISOString(),
            });
            await this.getDbClient().getApplicationRepository().update(appInstall);
        }

        return dto.setItemList(resp.getJsonBody().data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
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
}

export interface IResponse {
    data: IOutput[];
    meta: {
        filter_count?: number;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
