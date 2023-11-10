import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { DateTime } from 'luxon';
import UpgatesApplication from '../UpgatesApplication';

const LIST_PAGE_ENDPOINT = 'api/v2/products';

export const NAME = 'upgates-get-products';

export default class UpgatesGetProducts extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const app = this.getApplication<UpgatesApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const { from, productId, productIds } = dto.getJsonData();
        const pageNumber = dto.getBatchCursor('0');

        let url = LIST_PAGE_ENDPOINT;

        if (productIds) {
            url = `${url}?product_ids=${productIds}`;
        } else if (productId) {
            url = `${url}?product_id=${productId}`;
        } else {
            url = `${url}?page=${pageNumber}`;

            const lastRun = from ?? app.getIsoDateFromDate(appInstall.getNonEncryptedSettings().productLastRun);
            if (lastRun) {
                url = `${url}&last_update_time_from=${lastRun}`;
            }
        }
        const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

        const res = await this.getSender().send<IResponseJson>(requestDto);
        const { number_of_pages, products } = res.getJsonBody();

        if (Number(pageNumber) < number_of_pages) {
            dto.setBatchCursor((Number(pageNumber) + 1).toString());
        } else if (!productId) {
            appInstall.setNonEncryptedSettings({ productLastRun: DateTime.now() });
            const repo = this.getDbClient().getApplicationRepository();
            await repo.update(appInstall);
        }

        dto.setItemList(products);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponseJson extends IProductJson {
    number_of_pages: number;
    number_of_items: number;
}

export interface IProductJson {
    products: IProduct[];
}

export interface IProduct {
    code: string;
    code_supplier: string;
    ean: string;
    product_id: number;
    active_yn: boolean;
    archived_yn: boolean;
    replacement_product_code: string;
    can_add_to_basket_yn: boolean;
    adult_yn: boolean;
    descriptions: IProductDescription[];
    manufacturer: string;
    stock: number;
    stock_position: number;
    availability: string;
    availability_type: AvailabilityTypeEnum;
    weight: number;
    shipment_group: string;
    images: IProductImage[];
    categories: IProductCategories;
    groups: number[];
    prices: IProductPrice[];
    vats: Record<string, number>;
    parameters: IProductParameters[];
    labels: IProductLabel[];
    variants: IProductVariant[];
    related: string[];
    accessories: string[];
    alternative: string[];
    gifts: string[];
    sets: string[];
    metas: IProductVariantMeta[];
    admin_url: string;
}

interface IProductDescription {
    language: string;
    title: string;
    short_description: string;
    long_description: string;
    url: string;
    unit: string;
}

interface IProductImage {
    url: string;
    main_yn: boolean;
    list_yn: boolean;
    position: number;
    titles: IProductImageTitle[];
}

interface IProductImageTitle {
    language: string;
    title: string;
}

interface IProductCategories {
    category_id: number;
    code: string;
    main_yn: boolean;
    position: number;
    name: string;
}

interface IProductPrice {
    language: string;
    currency: string;
    pricelists: IProductPricePriceList[];
}

interface IProductPricePriceList {
    name: string;
    price_original: number;
    product_discount: number;
    product_discount_real: number;
    price_sale: number;
    price_with_vat: number;
    price_without_vat: number;
}

interface IProductParameters {
    name: Record<string, string>;
    values: Record<string, string>;
}

interface IProductLabel {
    name: Record<string, string>;
    active_yn: boolean;
    active_from: Date;
    active_to: Date;
}

interface IProductVariant {
    code: string;
    code_supplier: string;
    ean: string;
    variant_id: number;
    active_yn: boolean;
    can_add_to_basket_yn: boolean;
    stock: number;
    stock_position: string;
    availability: string;
    availability_type: AvailabilityTypeEnum;
    weight: string;
    image: string;
    prices: IProductPrice[];
    parameters: IProductParameters[];
    labels: IProductLabel[];
    metas: IProductVariantMeta[];
}

interface IProductVariantMeta {
    key: string;
    type: MetaTypeEnum;
    value: string;
    values: IProductVariantMetaValues[];
}

interface IProductVariantMetaValues {
    language: string;
    value: string;
}

export interface IInput {
    from?: string;
    productId?: string;
    productIds?: string;
}

enum AvailabilityTypeEnum {
    ON_REQUEST = 'OnRequest',
    NOT_AVAILABLE = 'NotAvailable',
    IN_STOCK = 'InStock',
    CUSTOM = 'Custom',
}

enum MetaTypeEnum {
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    INPUT = 'input',
    DATE = 'date',
    EMAIL = 'email',
    NUMBER = 'number',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
    TEXTAREA = 'textarea',
    FORMATTED = 'formatted',
}
