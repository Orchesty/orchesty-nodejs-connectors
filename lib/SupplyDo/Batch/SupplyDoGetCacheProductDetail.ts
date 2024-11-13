import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'supply-do-cache-product-detail';
export const LAST_RUN_KEY = 'lastRunListProductStocks';
export const LIMIT = 1000;

export default class SupplyDoGetCacheProductDetail extends ABatchNode {

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
            'items/cache_product_detail?fields[]=*&fields[]=product_batch.product.*&fields[]=warehouse.*'
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
    available: number;
    ecommerce: number;
    id: number;
    monthly_sales: number;
    mtm_sales: number;
    ordered: number;
    product: number;
    quantity: number;
    reserved: number;
    updated_at: string;
    product_batch: {
        id: number;
        name: string;
        expiresAt: string;
        ecommerce: number;
        product: {
            alt_ean: string;
            brand: number;
            country_of_origin: string;
            ean: string;
            eta_days: number;
            height_cm: string;
            id: number;
            length_cm: string;
            name: string;
            purchase_price: number;
            sd: false,
            selling_price: number;
            supplier: number;
            weight_grams: number;
            width_cm: string;
            ecommerce: number;
            external_id: string;
            category: null,
            image: string;
            date_created:string;
            date_updated: string;
        },
    }
}

export interface IResponse {
    data: IOutput[];
    meta: {
        filter_count?: number;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
