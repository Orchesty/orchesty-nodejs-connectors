import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch, { IFilter } from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-product-list-batch`;

export const LAST_RUN_KEY = 'product/list';

export enum Select {
    ID = 'id',
    ESHOPS = 'eshops',
    PRODUCT_SKU = 'productSku',
    INTERNAL_SKU = 'internalSku',
    ORGANISATION = 'organisation',
    PRODUCT_GROUP = 'productGroup',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    DESCRIPTION = 'description',
    IMAGES = 'images',
    INT_IMAGES = 'intImages',
    WEIGHT = 'weight',
    HEIGHT = 'height',
    WIDTH = 'width',
    LENGTH = 'length',
    INT_WEIGHT = 'intWeight',
    INT_HEIGHT = 'intHeight',
    INT_WIDTH = 'intWidth',
    INT_LENGTH = 'intLength',
    REFERENCE_NUMBERS = 'referenceNumbers',
    PACKAGING_TYPE = 'packagingType',
    IMEI_CHECK_REQUIRED = 'imeiCheckRequired',
    WORK_AROUND_SN_IN = 'workAroundSnIn',
    WORK_AROUND_EAN_STICKER = 'workAroundEanSticker',
    WORK_AROUND_WARRANTY_INF = 'workAroundWarrantyInf',
    WORK_AROUND_LOT = 'workAroundLot',
    ACTIVE = 'active',
    CREATED_AT = 'createdAt',
    COUNTRY_OF_ORIGIN = 'countryOfOrigin',
    HS_CODE = 'hsCode',
    TYPE = 'type',
    CHILDREN_PRODUCTS = 'childrenProducts',
    CATEGORY = 'category',
    CUSTOMS_DESCRIPTION = 'customsDescription',
    REQUIRES_ADDITIONAL_WORK = 'requiresAdditionalWork',
    REQUIRES_QUALITATIVE_RECEIVING = 'requiresQualitativeReceiving',
    EXPECTED_TURNOVER = 'expectedTurnover',
    EXPIRATION_OFFSET = 'expirationOffset',
    LOCALISATION = 'localisation',
    SERVICES = 'services',
    CODES = 'codes',
    CHANGED_AT = 'changedAt'
}

export enum Filter {
    ID = 'id',
    PRODUCT_SKU = 'productSku',
    INTERNAL_SKU = 'internalSku',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    TYPE = 'type',
    WEIGHT = 'weight',
    HEIGHT = 'height',
    WIDTH = 'width',
    LENGTH = 'length',
    REFERENCE_NUMBERS = 'referenceNumbers',
    PACKAGING_TYPE = 'packagingType',
    WORK_AROUND_SN_IN = 'workAroundSnIn',
    WORK_AROUND_EAN_STICKER = 'workAroundEanSticker',
    WORK_AROUND_WARRANTY_INF = 'workAroundWarrantyInf',
    WORK_AROUND_LOT = 'workAroundLot',
    ACTIVE = 'active',
    CREATED_AT = 'createdAt',
    CHANGED_AT = 'changedAt',
    CUSTOMS_DESCRIPTION = 'customsDescription',
    REQUIRES_ADDITIONAL_WORK = 'requiresAdditionalWork',
    REQUIRES_QUALITATIVE_RECEIVING = 'requiresQualitativeReceiving',
    EXPECTED_TURNOVER = 'expectedTurnover',
    EXPIRATION_OFFSET = 'expirationOffset',
    LOCALISATION = 'localisation',
    ORGANISATION = 'organisation',
    ORGANISATION_NAME = 'organisation.name',
    ESHOPS = 'eshops',
    ESHOPS_NAME = 'eshops.name',
    PRODUCT_GROUP_NAME = 'productGroup.name',
    CODES_VALUE = 'codes.value',
    CODES_ACTIVE = 'codes.active',
}

export enum Sorter {
    PRODUCT_SKU = 'productSku',
    INTERNAL_SKU = 'internalSku',
    PRODUCT_GROUP = 'productGroup',
    NAME = 'name', // eslint-disable-line @typescript-eslint/no-shadow
    DESCRIPTION = 'description',
    WEIGHT = 'weight',
    HEIGHT = 'height',
    WIDTH = 'width',
    LENGTH = 'length',
    REFERENCE_NUMBERS = 'referenceNumbers',
    PACKAGING_TYPE = 'packagingType',
    IMEI_CHECK_REQUIRED = 'imeiCheckRequired',
    WORK_AROUND_SN_IN = 'workAroundSnIn',
    WORK_AROUND_EAN_STICKER = 'workAroundEanSticker',
    WORK_AROUND_WARRANTY_INF = 'workAroundWarrantyInf',
    WORK_AROUND_LOT = 'workAroundLot',
    CREATED_AT = 'createdAt',
    COUNTRY_OF_ORIGIN = 'countryOfOrigin',
    HS_CODE = 'hsCode',
    TYPE = 'type',
    CHILDREN_PRODUCTS = 'childrenProducts',
    CUSTOMS_DESCRIPTION = 'customsDescription',
    REQUIRES_ADDITIONAL_WORK = 'requiresAdditionalWork',
    REQUIRES_QUALITATIVE_RECEIVING = 'requiresQualitativeReceiving',
    EXPECTED_TURNOVER = 'expectedTurnover',
    EXPIRATION_OFFSET = 'expirationOffset',
    CHANGED_AT = 'changedAt',
    PRODUCT_GROUP_NAME = 'productGroup.name',
    PRODUCT_GROUP_CHANGED_AT = 'productGroup.changedAt',
    COUNTRY_OF_ORIGIN_CODE = 'countryOfOrigin.code',
    COUNTRY_OF_ORIGIN_NAME = 'countryOfOrigin.name',
    COUNTRY_OF_ORIGIN_CURRENCY_CODE = 'countryOfOrigin.currencyCode',
    COUNTRY_OF_ORIGIN_CURRENCY_NAME = 'countryOfOrigin.currencyName',
    COUNTRY_OF_ORIGIN_CUSTOMS_DECLARATION = 'countryOfOrigin.customsDeclaration',
    COUNTRY_OF_ORIGIN_CHANGED_AT = 'countryOfOrigin.changedAt',
}

export default class MailstepGetProductListBatch extends AMailstepListBatch<
    unknown,
    IOutput,
    Select,
    Filter,
    Sorter
> {

    public getName(): string {
        return NAME;
    }

    protected getUrl(): string {
        return LAST_RUN_KEY;
    }

    protected async getFilters(dto: BatchProcessDto<undefined>): Promise<IFilter<Filter>> {
        return {
            ...(await super.getFilters(dto)),
            [Filter.ESHOPS]: {
                eq: await this.getEshopId(dto),
            },
        };
    }

}

export interface IOutput {
    id: string;
    eshops: string[];
    productSku: number;
    internalSku: number;
    organisation: string;
    name: string;
    referenceNumbers: number[];
    description?: string;
    productGroup?: string;
    images?: string[];
    intImages?: string[];
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    intWeight?: number;
    intHeight?: number;
    intWidth?: number;
    intLength?: number;
    packagingType?: string;
    imeiCheckRequired?: boolean;
    workAroundSnIn?: boolean;
    workAroundEanSticker?: boolean;
    workAroundWarrantyInf?: boolean;
    workAroundLot?: boolean;
    active?: boolean;
    createdAt?: string;
    countryOfOrigin?: string;
    hsCode?: string;
    type?: string;
    childrenProducts?: {
        productId: string;
        quantity: number;
    }[];
    category?: string;
    customsDescription?: string;
    requiresAdditionalWork?: boolean;
    requiresQualitativeReceiving?: boolean;
    expectedTurnover?: string;
    expirationOffset?: number;
    localisation?: string[];
    services?: string[];
    codes?: {
        id: string;
        type: string;
        value: string;
        primary: boolean;
        createdAt?: string;
        changedAt?: string;
    }[];
    changedAt?: string;
}
