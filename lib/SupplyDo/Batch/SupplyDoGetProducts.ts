import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'supply-do-get-products';
export const LAST_RUN_KEY = 'lastRunListProducts';
export const LIMIT = 1000;

export default class SupplyDoGetProducts extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        // TODO odkomentovat az bude filtr
        // const lastRun = await appInstall.getNonEncryptedSettings()[LAST_RUN_KEY] ?? new Date(0).toISOString();
        const page = Number(dto.getBatchCursor('0'));

        const ecommerce = dto.getUser();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'items/product?&fields[]=*&fields[]=selling_price.*&fields[]=supplier.*&fields[]=supplier.company.*'
            + '&fields[]=supplier.company.ecommerces.*&fields[]=supplier.company.ecommerces.countries.*'
            + '&fields[]=supplier.company.ecommerces.countries.country.*&fields[]=supplier.company.address.*'
            + '&fields[]=supplier.address.*&fields[]=purchase_price.*&fields[]=brand.*'
            + `&filter[ecommerce][_eq]=${ecommerce}`
            // TODO doplnit filtr
            // + `&filter[updated_at][_gte]=${lastRun}`
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
export interface IProduct {
    alt_ean: string;
    color: string;
    country_of_origin: string;
    ean: string;
    eta_days: number;
    height_cm: string;
    id: number;
    length_cm: string;
    name: string;
    sd: boolean;
    tags: string[] | null;
    weight_grams: number;
    width_cm: string;
    ecommerce: number;
    external_id: string;
    image: string;
    selling_price: {
        amount: number;
        currency: string;
        id: number;
    };
    supplier: {
        currency: string;
        email?: string | null;
        eta_days?: number | null;
        ico: string;
        id: number;
        main_assortment?: string | null;
        moq?: number | null;
        name: string;
        payment_type?: string | null;
        phone?: string | null;
        purchase_style: string;
        tags?: string[] | null;
        external_id: string;
        image?: string | null;
        discount?: number | null;
        company: {
            id: number;
            name: string;
            dic: string;
            ico: string;
            url: string;
            vat_payer: boolean;
            active: boolean;
            negative: string;
            normal: string;
            positive: string;
            ecommerces: {
                company: number;
                id: number;
                name: string;
                url: string;
                active: boolean;
                installed: boolean;
                type: string;
                logistics_method?: unknown;
                markets?: string[] | null;
                order_count_monthly?: number | null;
                order_quantity?: number | null;
                return_percent?: number | null;
                sku_quantity?: number | null;
                special_order_packaging?: unknown;
                warehouse_area?: number | null;
                warehouse_quantity?: number | null;
                countries: {
                    ecommerce: number;
                    id: number;
                    country: {
                        id: number;
                        iso_code: string;
                        ecommerces: number[];
                    };
                }[];
            }[];
            users: string[] | null;
            address: {
                city: string;
                country: string;
                id: number;
                name: string;
                street: string;
                street_number: string;
                zip_code?: unknown;
            };
        };
        address: {
            city: string;
            country: string;
            id: number;
            name: string;
            street: string;
            street_number: string;
            zip_code?: unknown;
        };
    };
    purchase_price: {
        amount: number;
        currency: string;
        id: number;
    };
    brand: {
        id: number;
        image: string;
        name: string;
        ecommerce: number;
    };
    category?: string | null;
}

export interface IResponse {
    data: IProduct[];
    meta: {
        total_count: number;
        filter_count: number;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
