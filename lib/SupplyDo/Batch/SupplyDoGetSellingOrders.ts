import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'supply-do-get-selling-orders';
export const LAST_RUN_KEY = 'lastRunListSellingOrders';
export const LIMIT = 1000;

export default class SupplyDoGetSellingOrders extends ABatchNode {

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
            'items/selling_order?fields[]=*&fields[]=selling_order_history.*&fields[]=selling_order_product.*'
            + '&fields[]=selling_order_product.return_product.*&fields[]=selling_order_product.reclamation_product.*'
            + '&fields[]=customer.address.*'
            + `&filter[ecommerce][_eq]=${ecommerce}`
            + `&filter[date_updated][_gte]=${lastRun}`
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

export interface ISellingOrder {
    customer: {
        address: {
            city: string;
            country: string;
            name: string;
            street: string;
            street_number: string;
            zip_code: string;
        };
        email: string;
        phone: string;
        name: string;
    };
    id: string;
    payment_type: string;
    transport: number;
    external_id: string;
    ecommerce: number;
    order_number: string;
    selling_order_history: {
        date: string;
        id: number;
        selling_order: string;
        type: string;
    }[];
    selling_order_product: {
        id: number;
        price: number;
        quantity: number;
        selling_order: string;
        product_batch: number;
        warehouse: number;
        reclamation_product: {
            id: number;
            quantity: number;
            reclamation: string;
            selling_order_product: number;
        }[];
        return_product: {
            id: number;
            quantity: number;
            return: string;
            selling_order_product: number;
        }[];
    }[];
}

export interface IResponse {
    data: ISellingOrder[];
    meta: {
        total_count: number;
        filter_count: number;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
