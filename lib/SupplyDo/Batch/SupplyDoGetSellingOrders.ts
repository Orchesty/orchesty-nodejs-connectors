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

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = await appInstall.getNonEncryptedSettings()[this.getLastRunKey()];
        const page = Number(dto.getBatchCursor('0'));
        const ecommerce = dto.getUser();
        let url = 'items/selling_order?fields[]=*&fields[]=selling_order_history.*&fields[]=selling_order_product.*'
            + '&fields[]=selling_order_product.price.*&fields[]=selling_order_product.return_product.*&fields[]=selling_order_product.reclamation_product.*'
            + '&fields[]=customer.address.*&fields[]=selling_order_product.product_batch.*&fields[]=selling_order_product.product_batch.product.*'
            + `&fields[]=total_price.*&fields[]=transport.*&fields[]=customer.*${this.getStatusQueryParams()}&filter[ecommerce][_eq]=${ecommerce}`
            + `${this.addIdFilter(dto)}&limit=${LIMIT}&offset=${page * LIMIT}&meta=filter_count`;

        if (this.addIdFilter(dto) === '' && lastRun) {
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
                [this.getLastRunKey()]: new Date().toISOString(),
            });
            await this.getDbClient().getApplicationRepository().update(appInstall);
        }

        return dto.setItemList(resp.getJsonBody().data);
    }

    protected getLastRunKey(): string {
        return LAST_RUN_KEY;
    }

    protected getStatusQueryParams(): string {
        return '&filter[selling_order_history][_some][type][_eq]=processing'
            + '&filter[selling_order_history][_none][type][_in]=dispatched,ready_for_pickup,delivered,not_delivered,not_paid,wrong_address,wrong_phone_number,package_lost,canceled,rejected,missing_pickup_point,hold';
    }

    protected addIdFilter(dto: BatchProcessDto<IInput>): string {
        const { id } = dto.getJsonData();
        if (id) {
            return `&filter[id][_eq]=${id}`;
        }

        return '';
    }

}

export interface IInput {
    id?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface ISellingOrder {
    customer: {
        email: string;
        phone: string;
        address: {
            city: string;
            country: string;
            name: string;
            street: string;
            street_number: string;
            zip_code: string;
        };
    };
    id: string;
    payment_type: string;
    date_created: string;
    date_updated: string;
    paid: boolean;
    transport: {
        carrier: number;
        id: number;
        tracking_number: string;
        packeta_pickup_point_id: string;
        ecommerce: number;
    };
    external_id: string;
    ecommerce: number;
    order_number: string;
    total_price: {
        amount: number;
        currency: string;
    }
    selling_order_history: {
        date: string;
        id: number;
        selling_order: string;
        type: string;
    }[];
    selling_order_product: {
        id: number;
        price: {
            amount: number;
            currency: string;
            id: number;
        };
        quantity: number;
        selling_order: string;
        product_batch: {
            product: {
                alt_ean: string;
                brand: number;
                color: string;
                country_of_origin: string;
                ean: string;
                eta_days: number;
                height_cm: string;
                id: number;
                length_cm: string;
                name: string;
                purchase_price: number;
                selling_price: number;
                supplier: number;
                weight_grams: number;
                width_cm: string;
                ecommerce: number;
                external_id: string;
                category: string;
                date_created: string;
            }
        };
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
