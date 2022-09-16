import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { DateTime } from 'luxon';
import WooCommerceApplication, { NAME as BASE_NAME } from '../WooCommerceApplication';

export const NAME = `${BASE_NAME.toLowerCase()}-get-products`;

export default class WooCommerceGetProducts extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const pageNumber = dto.getBatchCursor('1');
        const app = this.getApplication<WooCommerceApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const after = appInstall.getNonEncryptedSettings().productLastRun;

        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `wp-json/wc/v3/products?per_page=100&page=${pageNumber}${after ? `&after=${after}` : ''}`,
        );

        const res = await this.getSender().send<IOutput[]>(requestDto, [200, 404]);
        const totalPages = res.getHeaders().get('x-wp-totalpages');
        if (Number(totalPages) > Number(pageNumber)) {
            dto.setBatchCursor((Number(pageNumber) + 1).toString());
        } else {
            appInstall.setNonEncryptedSettings({ productLastRun: DateTime.now() });
            const repo = await this.getDbClient().getApplicationRepository();
            await repo.update(appInstall);
        }
        dto.setItemList(res.getJsonBody());

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IImage {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    src: string;
    name: string;
    alt: string;
}

export interface IAttribute {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

export interface IOutput {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    type: string;
    status: string;
    featured: boolean;
    catalog_visibility: string;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from?: Date;
    date_on_sale_from_gmt?: Date;
    date_on_sale_to?: Date;
    date_on_sale_to_gmt?: Date;
    price_html: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: undefined[];
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity?: number;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    sold_individually: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    tags: undefined[];
    images: IImage[];
    attributes: IAttribute[];
    default_attributes: IAttribute[];
    variations: number[];
    grouped_products: number[];
    menu_order: number;
    meta_data: undefined[];
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
