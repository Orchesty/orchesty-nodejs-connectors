import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch, { IFilter } from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-product-stock-list-batch`;

export enum Select {
    ID = 'id',
    PRODUCT = 'product',
    WAREHOUSE = 'warehouse',
    WMS = 'wms',
    QUANTITY = 'quantity',
    BOOKED = 'booked',
    BOOKED_AT_EXPEDITIONS = 'bookedAtExpeditions',
    VIRTUAL_BOOKED_AT_EXPEDITIONS = 'virtualBookedAtExpeditions',
    BOOKED_AT_TRANSFERS = 'bookedAtTransfers',
    BOOKED_AT_STOCK_CHANGES = 'bookedAtStockChanges',
    AVAILABLE = 'available',
    MISSING = 'missing',
    MISSING_AT_EXPEDITIONS = 'missingAtExpeditions',
    MISSING_AT_TRANSFERS = 'missingAtTransfers',
    MISSING_AT_STOCK_CHANGES = 'missingAtStockChanges',
    BOOKED_AT_INTERNAL_STOCK_CHANGES = 'bookedAtInternalStockChanges',
    MISSING_AT_INTERNAL_STOCK_CHANGES = 'missingAtInternalStockChanges',
    REQUIRED = 'required',
    INCOMING = 'incoming',
    CREATED_AT = 'createdAt',
    LOTS = 'lots',
    CHANGED_AT = 'changedAt'
}

export enum Filter {
    PRODUCT = 'product',
    PRODUCT_NAME = 'product.name',
    PRODUCT_PRODUCT_SKU = 'product.productSku',
    PRODUCT_INTERNAL_SKU = 'product.internalSku',
    PRODUCT_TYPE = 'product.type',
    PRODUCT_ACTIVE = 'product.active',
    PRODUCT_REFERENCE_NUMBERS = 'product.referenceNumbers',
    PRODUCT_ESHOPS = 'product.eshops',
    PRODUCT_WORK_AROUND_SN_IN = 'product.workAroundSnIn',
    PRODUCT_WORK_AROUND_EAN_STICKER = 'product.workAroundEanSticker',
    PRODUCT_WORK_AROUND_WARRANTY_INF = 'product.workAroundWarrantyInf',
    PRODUCT_WORK_AROUND_LOT = 'product.workAroundLot',
    PRODUCT_ORGANISATION = 'product.organisation',
    PRODUCT_ORGANISATION_NAME = 'product.organisation.name',
    WAREHOUSE = 'warehouse',
    WAREHOUSE_NAME = 'warehouse.name',
    WAREHOUSE_ESHOPS = 'warehouse.eshops',
    WMS = 'wms',
    WMS_NAME = 'wms.name',
    QUANTITY = 'quantity',
    BOOKED = 'booked',
    BOOKED_AT_EXPEDITIONS = 'bookedAtExpeditions',
    BOOKED_AT_TRANSFERS = 'bookedAtTransfers',
    AVAILABLE = 'available',
    MISSING = 'missing',
    MISSING_AT_EXPEDITIONS = 'missingAtExpeditions',
    MISSING_AT_TRANSFERS = 'missingAtTransfers',
    REQUIRED = 'required',
    INCOMING = 'incoming',
    CHANGED_AT = 'changedAt',
}

export enum Sorter {
    PRODUCT = 'product',
    WAREHOUSE = 'warehouse',
    WMS = 'wms',
    QUANTITY = 'quantity',
    BOOKED = 'booked',
    BOOKED_AT_EXPEDITIONS = 'bookedAtExpeditions',
    VIRTUAL_BOOKED_AT_EXPEDITIONS = 'virtualBookedAtExpeditions',
    BOOKED_AT_TRANSFERS = 'bookedAtTransfers',
    BOOKED_AT_STOCK_CHANGES = 'bookedAtStockChanges',
    AVAILABLE = 'available',
    MISSING = 'missing',
    MISSING_AT_EXPEDITIONS = 'missingAtExpeditions',
    MISSING_AT_TRANSFERS = 'missingAtTransfers',
    MISSING_AT_STOCK_CHANGES = 'missingAtStockChanges',
    BOOKED_AT_INTERNAL_STOCK_CHANGES = 'bookedAtInternalStockChanges',
    MISSING_AT_INTERNAL_STOCK_CHANGES = 'missingAtInternalStockChanges',
    REQUIRED = 'required',
    INCOMING = 'incoming',
    CREATED_AT = 'createdAt',
    CHANGED_AT = 'changedAt',
    PRODUCT_PRODUCT_SKU = 'product.productSku',
    PRODUCT_INTERNAL_SKU = 'product.internalSku',
    PRODUCT_NAME = 'product.name',
    PRODUCT_REFERENCE_NUMBERS = 'product.referenceNumbers',
    PRODUCT_HS_CODE = 'product.hsCode',
    PRODUCT_TYPE = 'product.type',
    PRODUCT_CHILDREN_PRODUCTS = 'product.childrenProducts',
    PRODUCT_CUSTOMS_DESCRIPTION = 'product.customsDescription',
    PRODUCT_CHANGED_AT = 'product.changedAt',
    WAREHOUSE_NAME = 'warehouse.name',
    WAREHOUSE_CUSTOM_ID = 'warehouse.customId',
    WAREHOUSE_CHANGED_AT = 'warehouse.changedAt',
    WMS_NAME = 'wms.name',
    WMS_CHANGED_AT = 'wms.changedAt',
}

export default class MailstepGetProductStockListBatch extends AMailstepListBatch<
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
        return 'product-stock/list';
    }

    protected async getFilters(dto: BatchProcessDto<undefined>): Promise<IFilter<Filter>> {
        const eshopId = await this.getEshopId(dto);

        return {
            ...(await super.getFilters(dto)),
            [Filter.PRODUCT_ESHOPS]: {
                eq: eshopId,
            },
            [Filter.WAREHOUSE_ESHOPS]: {
                eq: eshopId,
            },
        };
    }

}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: string;
    product: string;
    warehouse: string;
    wms: string;
    quantity: number;
    booked?: number;
    bookedAtExpeditions?: number;
    virtualBookedAtExpeditions?: number;
    bookedAtTransfers?: number;
    bookedAtStockChanges?: number;
    available?: number;
    missing?: number;
    missingAtExpeditions?: number;
    missingAtTransfers?: number;
    missingAtStockChanges?: number;
    bookedAtInternalStockChanges?: number;
    missingAtInternalStockChanges?: number;
    required?: number;
    incoming?: number;
    createdAt?: string;
    lots?: {
        id: string
        lot: string
        date?: string
        quantity?: number
        booked?: number
        available?: number
        missing?: number
        required?: number
        createdAt?: string
        changedAt?: string
    }[];
    changedAt?: string;
    'productProductGroup.id'?: string;
    'productProductGroup.name'?: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}
