import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import WooCommerceApplication, { NAME as BASE_NAME } from '../WooCommerceApplication';
import { IOutput as IInput } from './WooCommerceGetProducts';

export const NAME = `${BASE_NAME.toLowerCase()}-get-variants`;

export default class WooCommerceGetVariants extends ABatchNode {

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const pageNumber = dto.getBatchCursor('1');
        const app = this.getApplication<WooCommerceApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const product = dto.getJsonData();

        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `wp-json/wc/v3/products/${product.id}/variations/?per_page=100&page=${pageNumber}`,
        );

        const res = await this.getSender().send<IVariant[]>(requestDto, [200, 404]);
        const totalPages = res.getHeaders()['x-wp-totalpages'];
        if (Number(totalPages) > Number(pageNumber)) {
            dto.setBatchCursor((Number(pageNumber) + 1).toString());
        }
        dto.setItemList([{ product, variants: res.getJsonBody() }]);

        return dto;
    }

    public getName(): string {
        return NAME;
    }

}

export interface IOutput {
    product: IInput;
    variants: IVariant[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IVariant {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    description: string;
    permalink: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    status: string;
    purchasable: boolean;
    virtual: boolean;
    downloadable: boolean;
    downloads: undefined[];
    download_limit: number;
    download_expiry: number;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_class: string;
    shipping_class_id: number;
    image: {
        id: number;
        date_created: Date;
        date_created_gmt: Date;
        date_modified: Date;
        date_modified_gmt: Date;
        src: string;
        name: string;
        alt: string;
    };
    attributes: {
        id: number;
        name: string;
        option: string;
    }[];
    menu_order: number;
    meta_data: undefined[];
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
        up: {
            href: string;
        }[];
    };
    date_on_sale_from?: Date;
    date_on_sale_from_gmt?: Date;
    date_on_sale_to?: Date;
    date_on_sale_to_gmt?: Date;
    stock_quantity?: number;
}

/* eslint-enable @typescript-eslint/naming-convention */
