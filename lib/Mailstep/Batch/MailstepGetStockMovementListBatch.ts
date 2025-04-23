import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch, { IFilter } from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-stock-movement-list-batch`;

export const LAST_RUN_KEY = 'stock-movement/list';

export enum Select {
    ID = 'id',
    PRODUCT = 'product',
    MOVEMENT_TYPE = 'movementType',
    MOVEMENT_SUB_TYPE = 'movementSubType',
    ORGANISATION = 'organisation',
    WAREHOUSE = 'warehouse',
    WMS = 'wms',
    INBOUND_RECEIPT = 'inboundReceipt',
    OUTBOUND_RECEIPT = 'outboundReceipt',
    EXPEDITION = 'expedition',
    EXPEDITION_ITEM = 'expeditionItem',
    STOCK_CHANGE = 'stockChange',
    STOCK_CHANGE_ITEM = 'stockChangeItem',
    INTERNAL_STOCK_CHANGE = 'internalStockChange',
    INTERNAL_STOCK_CHANGE_ITEM = 'internalStockChangeItem',
    TRANSFER = 'transfer',
    TRANSFER_ITEM = 'transferItem',
    EAN = 'ean',
    SERIAL_NUMBER = 'serialNumber',
    QUANTITY = 'quantity',
    LOT = 'lot',
    LOT_DATE = 'lotDate',
    WARRANTY = 'warranty',
    CREATED_AT = 'createdAt',
    MOVED_AT = 'movedAt',
    REPORTED = 'reported',
    WMS_INTERNAL_ID = 'wmsInternalId',
    SERIAL_NUMBERS = 'serialNumbers',
}

export enum Filter {
    ID = 'id',
    MOVEMENT_TYPE = 'movementType',
    MOVEMENT_SUB_TYPE = 'movementSubType',
    EAN = 'ean',
    SERIAL_NUMBER = 'serialNumber',
    LOT = 'lot',
    QUANTITY = 'quantity',
    WARRANTY = 'warranty',
    CREATED_AT = 'createdAt',
    MOVED_AT = 'movedAt',
    WMS_INTERNAL_ID = 'wmsInternalId',
    PRODUCT = 'product',
    PRODUCT_NAME = 'product.name',
    PRODUCT_PRODUCT_SKU = 'product.productSku',
    PRODUCT_CODES_VALUE = 'product.codes.value',
    PRODUCT_INTERNAL_SKU = 'product.internalSku',
    PRODUCT_WORK_AROUND_SN_IN = 'product.workAroundSnIn',
    PRODUCT_WORK_AROUND_EAN_STICKER = 'product.workAroundEanSticker',
    PRODUCT_WORK_AROUND_WARRANTY_INF = 'product.workAroundWarrantyInf',
    PRODUCT_WORK_AROUND_LOT = 'product.workAroundLot',
    WAREHOUSE = 'warehouse',
    WAREHOUSE_NAME = 'warehouse.name',
    INBOUND_RECEIPT = 'inboundReceipt',
    INBOUND_RECEIPT_CREATED_AT = 'inboundReceipt.createdAt',
    INBOUND_RECEIPT_RECEIVED_AT = 'inboundReceipt.receivedAt',
    INBOUND_RECEIPT_STATUS = 'inboundReceipt.status',
    INBOUND_RECEIPT_TYPE = 'inboundReceipt.type',
    INBOUND_RECEIPT_WMS_INTERNAL_ID = 'inboundReceipt.wmsInternalId',
    INBOUND_RECEIPT_COUNT_OF_ITEMS = 'inboundReceipt.countOfItems',
    INBOUND_RECEIPT_COUNT_OF_SKU = 'inboundReceipt.countOfSku',
    INBOUND_RECEIPT_SUM_OF_QUANTITY = 'inboundReceipt.sumOfQuantity',
    INBOUND_RECEIPT_STOCK_ADVICE = 'inboundReceipt.stockAdvice',
    INBOUND_RECEIPT_STOCK_ADVICE_CREATED_AT = 'inboundReceipt.stockAdvice.createdAt',
    INBOUND_RECEIPT_STOCK_ADVICE_EXPECTED_AT = 'inboundReceipt.stockAdvice.expectedAt',
    INBOUND_RECEIPT_STOCK_ADVICE_CHANGED_AT = 'inboundReceipt.stockAdvice.changedAt',
    INBOUND_RECEIPT_STOCK_ADVICE_COUNT_OF_ITEMS = 'inboundReceipt.stockAdvice.countOfItems',
    INBOUND_RECEIPT_STOCK_ADVICE_COUNT_OF_SKU = 'inboundReceipt.stockAdvice.countOfSku',
    INBOUND_RECEIPT_STOCK_ADVICE_SUM_OF_QUANTITY = 'inboundReceipt.stockAdvice.sumOfQuantity',
    INBOUND_RECEIPT_STOCK_ADVICE_SUM_OF_SUPPLIED_QUANTITY = 'inboundReceipt.stockAdvice.sumOfSuppliedQuantity',
    INBOUND_RECEIPT_STOCK_ADVICE_PACKAGING_UNIT = 'inboundReceipt.stockAdvice.packagingUnit',
    INBOUND_RECEIPT_STOCK_ADVICE_COUNT_OF_UNITS = 'inboundReceipt.stockAdvice.countOfUnits',
    INBOUND_RECEIPT_STOCK_ADVICE_STATUS = 'inboundReceipt.stockAdvice.status',
    INBOUND_RECEIPT_STOCK_ADVICE_MANUAL_INPUT = 'inboundReceipt.stockAdvice.manualInput',
    INBOUND_RECEIPT_STOCK_ADVICE_INTERNAL_ID = 'inboundReceipt.stockAdvice.internalId',
    INBOUND_RECEIPT_STOCK_ADVICE_WMS_INTERNAL_ID = 'inboundReceipt.stockAdvice.wmsInternalId',
    INBOUND_RECEIPT_STOCK_ADVICE_NOTE = 'inboundReceipt.stockAdvice.note',
    INBOUND_RECEIPT_STOCK_ADVICE_USER = 'inboundReceipt.stockAdvice.user',
    INBOUND_RECEIPT_STOCK_ADVICE_SUPPLIER = 'inboundReceipt.stockAdvice.supplier',
    INTERNAL_STOCK_CHANGE_NAME = 'internalStockChange.name',
    ORGANISATION = 'organisation',
    ORGANISATION_NAME = 'organisation.name',
    WMS = 'wms',
    WMS_NAME = 'wms.name',
    EXPEDITION = 'expedition',
    EXPEDITION_STATUS = 'expedition.status',
    EXPEDITION_ORDER_NUMBER = 'expedition.orderNumber',
    EXPEDITION_REQUIRED_DELIVERY_DATE = 'expedition.requiredDeliveryDate',
    EXPEDITION_EMAIL = 'expedition.email',
    EXPEDITION_VALUE = 'expedition.value',
    EXPEDITION_CREATED_AT = 'expedition.createdAt',
    EXPEDITION_PRIORITY = 'expedition.priority',
    EXPEDITION_REF_1 = 'expedition.ref1',
    EXPEDITION_REF_2 = 'expedition.ref2',
    EXPEDITION_REF_3 = 'expedition.ref3',
    SERIAL_NUMBERS = 'serialNumbers',
}

export enum Sorter {
    PRODUCT = 'product',
    MOVEMENT_TYPE = 'movementType',
    MOVEMENT_SUB_TYPE = 'movementSubType',
    ORGANISATION = 'organisation',
    WAREHOUSE = 'warehouse',
    WMS = 'wms',
    INBOUND_RECEIPT = 'inboundReceipt',
    OUTBOUND_RECEIPT = 'outboundReceipt',
    EXPEDITION = 'expedition',
    EXPEDITION_ITEM = 'expeditionItem',
    STOCK_CHANGE = 'stockChange',
    STOCK_CHANGE_ITEM = 'stockChangeItem',
    INTERNAL_STOCK_CHANGE = 'internalStockChange',
    INTERNAL_STOCK_CHANGE_ITEM = 'internalStockChangeItem',
    TRANSFER = 'transfer',
    TRANSFER_ITEM = 'transferItem',
    EAN = 'ean',
    SERIAL_NUMBER = 'serialNumber',
    QUANTITY = 'quantity',
    LOT = 'lot',
    LOT_DATE = 'lotDate',
    WARRANTY = 'warranty',
    CREATED_AT = 'createdAt',
    MOVED_AT = 'movedAt',
    WMS_INTERNAL_ID = 'wmsInternalId',
    SERIAL_NUMBERS = 'serialNumbers',
    PRODUCT_PRODUCT_SKU = 'product.productSku',
    PRODUCT_INTERNAL_SKU = 'product.internalSku',
    PRODUCT_NAME = 'product.name',
    PRODUCT_REFERENCE_NUMBERS = 'product.referenceNumbers',
    PRODUCT_HS_CODE = 'product.hsCode',
    PRODUCT_TYPE = 'product.type',
    PRODUCT_CHILDREN_PRODUCTS = 'product.childrenProducts',
    PRODUCT_CUSTOMS_DESCRIPTION = 'product.customsDescription',
    PRODUCT_CHANGED_AT = 'product.changedAt',
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
    WMS_NAME = 'wms.name',
    WMS_CHANGED_AT = 'wms.changedAt',
    EXPEDITION_ORDER_NUMBER = 'expedition.orderNumber',
    EXPEDITION_BILLING_FIRST_NAME = 'expedition.billingFirstName',
    EXPEDITION_BILLING_LAST_NAME = 'expedition.billingLastName',
    EXPEDITION_BILLING_DEGREE = 'expedition.billingDegree',
    EXPEDITION_BILLING_COMPANY = 'expedition.billingCompany',
    EXPEDITION_BILLING_STREET = 'expedition.billingStreet',
    EXPEDITION_BILLING_HOUSE_NR = 'expedition.billingHouseNr',
    EXPEDITION_BILLING_ZIP = 'expedition.billingZip',
    EXPEDITION_BILLING_CITY = 'expedition.billingCity',
    EXPEDITION_BILLING_EMAIL = 'expedition.billingEmail',
    EXPEDITION_BILLING_PHONE = 'expedition.billingPhone',
    EXPEDITION_BILLING_REGISTRATION_NUMBER = 'expedition.billingRegistrationNumber',
    EXPEDITION_BILLING_VAT_NUMBER = 'expedition.billingVatNumber',
    EXPEDITION_DIFFERENT_DELIVERY_ADDRESS = 'expedition.differentDeliveryAddress',
    EXPEDITION_DELIVERY_FIRST_NAME = 'expedition.deliveryFirstName',
    EXPEDITION_DELIVERY_LAST_NAME = 'expedition.deliveryLastName',
    EXPEDITION_DELIVERY_DEGREE = 'expedition.deliveryDegree',
    EXPEDITION_DELIVERY_COMPANY = 'expedition.deliveryCompany',
    EXPEDITION_DELIVERY_STREET = 'expedition.deliveryStreet',
    EXPEDITION_DELIVERY_HOUSE_NR = 'expedition.deliveryHouseNr',
    EXPEDITION_DELIVERY_ZIP = 'expedition.deliveryZip',
    EXPEDITION_DELIVERY_CITY = 'expedition.deliveryCity',
    EXPEDITION_DELIVERY_EMAIL = 'expedition.deliveryEmail',
    EXPEDITION_DELIVERY_PHONE = 'expedition.deliveryPhone',
    EXPEDITION_REQUIRED_EXPEDITION_DATE = 'expedition.requiredExpeditionDate',
    EXPEDITION_CARRIER_NOTE = 'expedition.carrierNote',
    EXPEDITION_TRACKING_NUMBER = 'expedition.trackingNumber',
    EXPEDITION_TRACKING_URL = 'expedition.trackingUrl',
    EXPEDITION_GENERIC_TRACKING_URL = 'expedition.genericTrackingUrl',
    EXPEDITION_EXTERNAL_TRACKING_NUMBER = 'expedition.externalTrackingNumber',
    EXPEDITION_EXTERNAL_PACKAGE_NUMBER = 'expedition.externalPackageNumber',
    EXPEDITION_PACKAGES_COUNT = 'expedition.packagesCount',
    EXPEDITION_STATUS = 'expedition.status',
    EXPEDITION_EXPEDITED_COMPLETELY = 'expedition.expeditedCompletely',
    EXPEDITION_VALUE = 'expedition.value',
    EXPEDITION_CURRENCY = 'expedition.currency',
    EXPEDITION_FRAGILE = 'expedition.fragile',
    EXPEDITION_COD = 'expedition.cod',
    EXPEDITION_COD_VALUE = 'expedition.codValue',
    EXPEDITION_COD_CURRENCY = 'expedition.codCurrency',
    EXPEDITION_COD_VARIABLE_SYMBOL = 'expedition.codVariableSymbol',
    EXPEDITION_CUSTOMER_GROUP = 'expedition.customerGroup',
    EXPEDITION_ESHOP_ORDER_DATE = 'expedition.eshopOrderDate',
    EXPEDITION_CREATED_AT = 'expedition.createdAt',
    EXPEDITION_COUNT_OF_ITEMS = 'expedition.countOfItems',
    EXPEDITION_COUNT_OF_SKU = 'expedition.countOfSku',
    EXPEDITION_SUM_OF_QUANTITY = 'expedition.sumOfQuantity',
    EXPEDITION_PACKED_AT = 'expedition.packedAt',
    EXPEDITION_SENT_AT = 'expedition.sentAt',
    EXPEDITION_DELIVERED_AT = 'expedition.deliveredAt',
    EXPEDITION_WAIT_BEFORE_PROCESSING = 'expedition.waitBeforeProcessing',
    EXPEDITION_EDIT_BEFORE_PROCESSING = 'expedition.editBeforeProcessing',
    EXPEDITION_PRIORITY = 'expedition.priority',
    EXPEDITION_REF_1 = 'expedition.ref1',
    EXPEDITION_REF_2 = 'expedition.ref2',
    EXPEDITION_REF_3 = 'expedition.ref3',
    EXPEDITION_FOREIGN_PRICE = 'expedition.foreignPrice',
    EXPEDITION_CONVERSION_DATE = 'expedition.conversionDate',
    EXPEDITION_MODIFIED_AT = 'expedition.modifiedAt',
    EXPEDITION_REMOVED_VIRTUAL_PRODUCTS = 'expedition.removedVirtualProducts',
    EXPEDITION_IGNORE_ADDRESS_VALIDATION = 'expedition.ignoreAddressValidation',
    EXPEDITION_ADDRESS_VALIDATION_EXECUTED = 'expedition.addressValidationExecuted',
    EXPEDITION_B_2_B = 'expedition.b2b',
    EXPEDITION_DELIVERY_COST = 'expedition.deliveryCost',
    EXPEDITION_DELIVERY_COST_CURRENCY = 'expedition.deliveryCostCurrency',
    EXPEDITION_INVOICE_NUMBER = 'expedition.invoiceNumber',
    EXPEDITION_CHANGED_AT = 'expedition.changedAt',
    EXPEDITION_ITEM_POSITION = 'expeditionItem.position',
    EXPEDITION_ITEM_EXPEDITED = 'expeditionItem.expedited',
    EXPEDITION_ITEM_PRODUCT_VALUE = 'expeditionItem.productValue',
    EXPEDITION_ITEM_PRODUCT_VALUE_CURRENCY = 'expeditionItem.productValueCurrency',
    EXPEDITION_ITEM_EXPIRATION_OFFSET = 'expeditionItem.expirationOffset',
    EXPEDITION_ITEM_QUANTITY = 'expeditionItem.quantity',
    EXPEDITION_ITEM_BOOKED = 'expeditionItem.booked',
    EXPEDITION_ITEM_MISSING = 'expeditionItem.missing',
    EXPEDITION_ITEM_LOT = 'expeditionItem.lot',
    EXPEDITION_ITEM_ASSIGNED_LOT = 'expeditionItem.assignedLot',
    EXPEDITION_ITEM_LIFO = 'expeditionItem.lifo',
    EXPEDITION_ITEM_REF_1 = 'expeditionItem.ref1',
    EXPEDITION_ITEM_REF_2 = 'expeditionItem.ref2',
    EXPEDITION_ITEM_REF_3 = 'expeditionItem.ref3',
    EXPEDITION_ITEM_CREATED_AT = 'expeditionItem.createdAt',
    EXPEDITION_ITEM_CHANGED_AT = 'expeditionItem.changedAt',
    STOCK_CHANGE_WMS_INTERNAL_ID = 'stockChange.wmsInternalId',
    STOCK_CHANGE_RECEIVED_AT = 'stockChange.receivedAt',
    STOCK_CHANGE_CREATED_AT = 'stockChange.createdAt',
    STOCK_CHANGE_COUNT_OF_ITEMS = 'stockChange.countOfItems',
    STOCK_CHANGE_COUNT_OF_SKU = 'stockChange.countOfSku',
    STOCK_CHANGE_SUM_OF_QUANTITY = 'stockChange.sumOfQuantity',
    STOCK_CHANGE_STATUS = 'stockChange.status',
    STOCK_CHANGE_TYPE = 'stockChange.type',
    STOCK_CHANGE_ITEM_POSITION = 'stockChangeItem.position',
    STOCK_CHANGE_ITEM_EXPEDITED = 'stockChangeItem.expedited',
    STOCK_CHANGE_ITEM_QUANTITY = 'stockChangeItem.quantity',
    STOCK_CHANGE_ITEM_BOOKED = 'stockChangeItem.booked',
    STOCK_CHANGE_ITEM_MISSING = 'stockChangeItem.missing',
    STOCK_CHANGE_ITEM_LOT = 'stockChangeItem.lot',
    STOCK_CHANGE_ITEM_ASSIGNED_LOT = 'stockChangeItem.assignedLot',
    STOCK_CHANGE_ITEM_LIFO = 'stockChangeItem.lifo',
    STOCK_CHANGE_ITEM_REF_1 = 'stockChangeItem.ref1',
    STOCK_CHANGE_ITEM_REF_2 = 'stockChangeItem.ref2',
    STOCK_CHANGE_ITEM_REF_3 = 'stockChangeItem.ref3',
    INTERNAL_STOCK_CHANGE_NAME = 'internalStockChange.name',
    INTERNAL_STOCK_CHANGE_RECEIVED_AT = 'internalStockChange.receivedAt',
    INTERNAL_STOCK_CHANGE_CREATED_AT = 'internalStockChange.createdAt',
    INTERNAL_STOCK_CHANGE_COUNT_OF_ITEMS = 'internalStockChange.countOfItems',
    INTERNAL_STOCK_CHANGE_COUNT_OF_SKU = 'internalStockChange.countOfSku',
    INTERNAL_STOCK_CHANGE_SUM_OF_QUANTITY = 'internalStockChange.sumOfQuantity',
    INTERNAL_STOCK_CHANGE_STATUS = 'internalStockChange.status',
    INTERNAL_STOCK_CHANGE_TYPE = 'internalStockChange.type',
    INTERNAL_STOCK_CHANGE_ORIGIN = 'internalStockChange.origin',
    INTERNAL_STOCK_CHANGE_ITEM_POSITION = 'internalStockChangeItem.position',
    INTERNAL_STOCK_CHANGE_ITEM_QUANTITY = 'internalStockChangeItem.quantity',
    INTERNAL_STOCK_CHANGE_ITEM_BOOKED = 'internalStockChangeItem.booked',
    INTERNAL_STOCK_CHANGE_ITEM_MISSING = 'internalStockChangeItem.missing',
    INTERNAL_STOCK_CHANGE_ITEM_LOT = 'internalStockChangeItem.lot',
    INTERNAL_STOCK_CHANGE_ITEM_ASSIGNED_LOT = 'internalStockChangeItem.assignedLot',
    INTERNAL_STOCK_CHANGE_ITEM_LIFO = 'internalStockChangeItem.lifo',
    INTERNAL_STOCK_CHANGE_ITEM_REF_1 = 'internalStockChangeItem.ref1',
    INTERNAL_STOCK_CHANGE_ITEM_REF_2 = 'internalStockChangeItem.ref2',
    INTERNAL_STOCK_CHANGE_ITEM_REF_3 = 'internalStockChangeItem.ref3',
    TRANSFER_INTERNAL_NUMBER = 'transfer.internalNumber',
    TRANSFER_REQUIRED_TRANSFER_DATE = 'transfer.requiredTransferDate',
    TRANSFER_TYPE = 'transfer.type',
    TRANSFER_STATUS = 'transfer.status',
    TRANSFER_CREATED_AT = 'transfer.createdAt',
    TRANSFER_COUNT_OF_ITEMS = 'transfer.countOfItems',
    TRANSFER_COUNT_OF_SKU = 'transfer.countOfSku',
    TRANSFER_SUM_OF_QUANTITY = 'transfer.sumOfQuantity',
    TRANSFER_CHANGED_AT = 'transfer.changedAt',
    TRANSFER_ITEM_POSITION = 'transferItem.position',
    TRANSFER_ITEM_QUANTITY = 'transferItem.quantity',
    TRANSFER_ITEM_BOOKED = 'transferItem.booked',
    TRANSFER_ITEM_MISSING = 'transferItem.missing',
    TRANSFER_ITEM_LOT = 'transferItem.lot',
    TRANSFER_ITEM_ASSIGNED_LOT = 'transferItem.assignedLot',
    TRANSFER_ITEM_LIFO = 'transferItem.lifo',
    TRANSFER_ITEM_REF_1 = 'transferItem.ref1',
    TRANSFER_ITEM_REF_2 = 'transferItem.ref2',
    TRANSFER_ITEM_REF_3 = 'transferItem.ref3',
}

export default class MailstepGetStockMovementListBatch extends AMailstepListBatch<
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
    /* eslint-disable @typescript-eslint/naming-convention */
    id: string;
    product: string;
    movementType: string;
    movementSubType: string;
    organisation: string;
    warehouse: string;
    wms: string;
    inboundReceipt: string;
    outboundReceipt: string;
    expedition: string;
    expeditionItem: string;
    stockChange: string;
    stockChangeItem: string;
    internalStockChange: string;
    internalStockChangeItem: string;
    transfer: string;
    transferItem: string;
    ean: number;
    serialNumber: string;
    quantity: number;
    lot: string;
    lotDate: string;
    warranty: string;
    createdAt: string;
    movedAt: string;
    reported: boolean;
    wmsInternalId: string;
    serialNumbers: string[];
    'productProductGroup.id': string;
    'productProductGroup.name': string;
    /* eslint-enable @typescript-eslint/naming-convention */
}
