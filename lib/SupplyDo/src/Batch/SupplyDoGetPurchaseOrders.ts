import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'supply-do-get-purchase-orders';
export const LAST_RUN_KEY = 'lastRunListPurchaseOrders';
export const LIMIT = 1000;

export default class SupplyDoGetPurchaseOrders extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = await appInstall.getNonEncryptedSettings()[LAST_RUN_KEY];
        const page = Number(dto.getBatchCursor('0'));
        const ecommerce = dto.getUser();
        let url = 'items/purchase_order?fields[]=*&fields[]=warehouse.*&fields[]=purchase_order_history.*&fields[]=purchase_order_history.purchase_order_product.*'
            + `&filter[ecommerce][_eq]=${ecommerce}` // TODO: nefunkční filtr
            + `&limit=${LIMIT}&offset=${page * LIMIT}&meta=filter_count`;

        if (lastRun) {
            url += `&filter[date_updated][_gte]=${lastRun}`;
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            url,
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
export interface IPurchaseOrder {
    supplier: number;
    warehouse: {
        id: number;
        external_id: string;
    };
    external_id: string;
    order_number: string;
    company: number;
    purchase_order_history:
    {
        date: string;
        purchase_order: string;
        type: string;
        purchase_order_product:
        {
            id: number;
            price: number;
            purchase_order_history: number;
            quantity: number;
            product_batch: number;
            sales_14d: number;
            stock_status: number;
        }[]
    }[];
}

export interface IResponse {
    data: IPurchaseOrder[];
    meta: {
        total_count: number;
        filter_count: number;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
