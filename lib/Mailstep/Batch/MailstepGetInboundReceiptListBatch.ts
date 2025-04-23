import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch, { IFilter } from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-inbound-receipt-list-batch`;

export const LAST_RUN_KEY = 'inbound-receipt/list';

export enum Select {
    ID = 'id',
    STOCK_ADVICE = 'stockAdvice',
    WMS = 'wms',
    ORGANISATION = 'organisation',
    WAREHOUSE = 'warehouse',
    WMS_INTERNAL_ID = 'wmsInternalId',
    RECEIVED_AT = 'receivedAt',
    CREATED_AT = 'createdAt',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    STATUS = 'status',
}

export enum Filter {
    ID = 'id',
    STATUS = 'status',
    TYPE = 'type',
    CREATED_AT = 'createdAt',
    RECEIVED_AT = 'receivedAt',
    WMS_INTERNAL_ID = 'wmsInternalId',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    WAREHOUSE = 'warehouse',
    WAREHOUSE_NAME = 'warehouse.name',
    WAREHOUSE_CUSTOM_ID = 'warehouse.customId',
    WMS = 'wms',
    WMS_NAME = 'wms.name',
    ORGANISATION = 'organisation',
    ORGANISATION_NAME = 'organisation.name',
    STOCK_ADVICE = 'stockAdvice',
    STOCK_ADVICE_USER = 'stockAdvice.user',
    STOCK_ADVICE_ORGANISATION = 'stockAdvice.organisation',
    STOCK_ADVICE_CREATED_AT = 'stockAdvice.createdAt',
    STOCK_ADVICE_EXPECTED_AT = 'stockAdvice.expectedAt',
    STOCK_ADVICE_CHANGED_AT = 'stockAdvice.changedAt',
    STOCK_ADVICE_WAREHOUSE = 'stockAdvice.warehouse',
    STOCK_ADVICE_WMS = 'stockAdvice.wms',
    STOCK_ADVICE_SUPPLIER = 'stockAdvice.supplier',
    STOCK_ADVICE_PACKAGING_UNIT = 'stockAdvice.packagingUnit',
    STOCK_ADVICE_COUNT_OF_UNITS = 'stockAdvice.countOfUnits',
    STOCK_ADVICE_STATUS = 'stockAdvice.status',
    STOCK_ADVICE_INPUT_TYPE = 'stockAdvice.inputType',
    STOCK_ADVICE_WMS_INTERNAL_ID = 'stockAdvice.wmsInternalId',
    STOCK_ADVICE_INTERNAL_ID = 'stockAdvice.internalId',
    STOCK_ADVICE_SUPPLIER_NAME = 'stockAdvice.supplier.name',
    MOVEMENTS_LOT = 'movements.lot',
    MOVEMENTS_PRODUCT_ID = 'movements.product.id',
    MOVEMENTS_PRODUCT_NAME = 'movements.product.name',
    MOVEMENTS_PRODUCT_PRODUCT_SKU = 'movements.product.productSku',
    MOVEMENTS_PRODUCT_INTERNAL_SKU = 'movements.product.internalSku',
    MOVEMENTS_PRODUCT_WORK_AROUND_LOT = 'movements.product.workAroundLot',
    MOVEMENTS_PRODUCT_REFERENCE_NUMBERS = 'movements.product.referenceNumbers',
}

export enum Sorter {
    STOCK_ADVICE = 'stockAdvice',
    WMS = 'wms',
    ORGANISATION = 'organisation',
    WAREHOUSE = 'warehouse',
    WMS_INTERNAL_ID = 'wmsInternalId',
    RECEIVED_AT = 'receivedAt',
    CREATED_AT = 'createdAt',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    STATUS = 'status',
    TYPE = 'type',
    NOTE = 'note',
    RETURNED_PARCEL_NUMBER = 'returnedParcelNumber',
    COMPLETE = 'complete',
    STOCK_ADVICE_PACKAGING_UNIT = 'stockAdvice.packagingUnit',
    STOCK_ADVICE_COUNT_OF_UNITS = 'stockAdvice.countOfUnits',
    STOCK_ADVICE_STATUS = 'stockAdvice.status',
    STOCK_ADVICE_NOTE = 'stockAdvice.note',
    STOCK_ADVICE_INTERNAL_ID = 'stockAdvice.internalId',
    STOCK_ADVICE_WMS_INTERNAL_ID = 'stockAdvice.wmsInternalId',
    STOCK_ADVICE_MAILWISE_INTERNAL_ID = 'stockAdvice.mailwiseInternalId',
    STOCK_ADVICE_EXPECTED_AT = 'stockAdvice.expectedAt',
    STOCK_ADVICE_RECEIVING_BEGUN_AT = 'stockAdvice.receivingBegunAt',
    STOCK_ADVICE_CREATED_AT = 'stockAdvice.createdAt',
    STOCK_ADVICE_COUNT_OF_ITEMS = 'stockAdvice.countOfItems',
    STOCK_ADVICE_COUNT_OF_SKU = 'stockAdvice.countOfSku',
    STOCK_ADVICE_SUM_OF_QUANTITY = 'stockAdvice.sumOfQuantity',
    STOCK_ADVICE_SUM_OF_SUPPLIED_QUANTITY = 'stockAdvice.sumOfSuppliedQuantity',
    STOCK_ADVICE_REF_1 = 'stockAdvice.ref1',
    STOCK_ADVICE_REF_2 = 'stockAdvice.ref2',
    STOCK_ADVICE_REF_3 = 'stockAdvice.ref3',
    STOCK_ADVICE_CHANGED_AT = 'stockAdvice.changedAt',
    WMS_NAME = 'wms.name',
    WMS_CHANGED_AT = 'wms.changedAt',
    ORGANISATION_NAME = 'organisation.name',
    ORGANISATION_REGISTRATION_NUMBER = 'organisation.registrationNumber',
    ORGANISATION_VAT_NUMBER = 'organisation.vatNumber',
    ORGANISATION_CODE = 'organisation.code',
    ORGANISATION_AUTOMATIC_EXCHANGE_ENABLED = 'organisation.automaticExchangeEnabled',
    ORGANISATION_IGNORE_ADDRESS_VALIDATION = 'organisation.ignoreAddressValidation',
    ORGANISATION_STOCK_ADVICE_CLOSE_INTERVAL = 'organisation.stockAdviceCloseInterval',
    ORGANISATION_CHANGED_AT = 'organisation.changedAt',
    WAREHOUSE_NAME = 'warehouse.name',
    WAREHOUSE_CUSTOM_ID = 'warehouse.customId',
    WAREHOUSE_CHANGED_AT = 'warehouse.changedAt',
}

export default class MailstepGetInboundReceiptListBatch extends AMailstepListBatch<
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

    protected async getFilters(dto: BatchProcessDto): Promise<IFilter<Filter>> {
        if (await this.useLastRun(dto)) {
            const lastRun = await this.getLastRun(dto);

            if (lastRun) {
                return {
                    createdAt: {
                        // @ts-expect-error Intentionally
                        gte: lastRun,
                    },
                };
            }
        }

        return {};
    }

}

export interface IOutput {
    id: string;
    stockAdvice: string;
    wms: string;
    organisation: string;
    warehouse: string;
    wmsInternalId: string;
    receivedAt: string;
    createdAt: string;
    countOfItems: number;
    countOfSku: number;
    sumOfQuantity: number;
    status: string;
}
