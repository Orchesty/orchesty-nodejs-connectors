import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch, { IFilter } from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-outbound-receipt-list-batch`;

export const LAST_RUN_KEY = 'outbound-receipt/list';

export enum Select {
    ID = 'id',
    EXPEDITION = 'expedition',
    WMS = 'wms',
    ORGANISATION = 'organisation',
    WAREHOUSE = 'warehouse',
    WMS_INTERNAL_ID = 'wmsInternalId',
    ISSUED_AT = 'issuedAt',
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
    EXPEDITION = 'expedition',
    EXPEDITION_ORDER_NUMBER = 'expedition.orderNumber',
    EXPEDITION_NOTE = 'expedition.note',
    EXPEDITION_CARRIER_NOTE = 'expedition.carrierNote',
    EXPEDITION_TRACKING_NUMBER = 'expedition.trackingNumber',
    EXPEDITION_TRACKING_URL = 'expedition.trackingUrl',
    EXPEDITION_EXTERNAL_TRACKING_NUMBER = 'expedition.externalTrackingNumber',
    EXPEDITION_PACKAGES_COUNT = 'expedition.packagesCount',
    EXPEDITION_STATUS = 'expedition.status',
    EXPEDITION_VALUE = 'expedition.value',
    EXPEDITION_CURRENCY = 'expedition.currency',
    EXPEDITION_FRAGILE = 'expedition.fragile',
    EXPEDITION_COD = 'expedition.cod',
    EXPEDITION_COD_VALUE = 'expedition.codValue',
    EXPEDITION_COD_CURRENCY = 'expedition.codCurrency',
    EXPEDITION_COD_VARIABLE_SYMBOL = 'expedition.codVariableSymbol',
    EXPEDITION_CUSTOMER_GROUP = 'expedition.customerGroup',
    EXPEDITION_REQUIRED_DELIVERY_DATE = 'expedition.requiredDeliveryDate',
    EXPEDITION_EXPEDITION_DATE = 'expedition.expeditionDate',
    EXPEDITION_ESHOP_ORDER_DATE = 'expedition.eshopOrderDate',
    EXPEDITION_CREATED_AT = 'expedition.createdAt',
    EXPEDITION_CHANGED_AT = 'expedition.changedAt',
    EXPEDITION_BILLING_FIRST_NAME = 'expedition.billingFirstName',
    EXPEDITION_BILLING_LAST_NAME = 'expedition.billingLastName',
    EXPEDITION_BILLING_DEGREE = 'expedition.billingDegree',
    EXPEDITION_BILLING_COMPANY = 'expedition.billingCompany',
    EXPEDITION_BILLING_STREET = 'expedition.billingStreet',
    EXPEDITION_BILLING_HOUSE_NR = 'expedition.billingHouseNr',
    EXPEDITION_BILLING_ZIP = 'expedition.billingZip',
    EXPEDITION_BILLING_CITY = 'expedition.billingCity',
    EXPEDITION_BILLING_COUNTRY = 'expedition.billingCountry',
    EXPEDITION_BILLING_COUNTRY_NAME = 'expedition.billingCountry.name',
    EXPEDITION_BILLING_COUNTRY_CODE = 'expedition.billingCountry.code',
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
    EXPEDITION_DELIVERY_COUNTRY = 'expedition.deliveryCountry',
    EXPEDITION_DELIVERY_COUNTRY_NAME = 'expedition.deliveryCountry.name',
    EXPEDITION_DELIVERY_COUNTRY_CODE = 'expedition.deliveryCountry.code',
    EXPEDITION_DELIVERY_EMAIL = 'expedition.deliveryEmail',
    EXPEDITION_DELIVERY_PHONE = 'expedition.deliveryPhone',
    EXPEDITION_CARRIER = 'expedition.carrier',
    EXPEDITION_CARRIER_NAME = 'expedition.carrier.name',
    EXPEDITION_CARRIER_CODE = 'expedition.carrier.code',
    EXPEDITION_CARRIER_SERVICE = 'expedition.carrierService',
    EXPEDITION_CARRIER_SERVICE_NAME = 'expedition.carrierService.name',
    EXPEDITION_CARRIER_SERVICE_CODE = 'expedition.carrierService.code',
    EXPEDITION_CARRIER_PICKUP_PLACE = 'expedition.carrierPickupPlace',
    EXPEDITION_CARRIER_PICKUP_PLACE_NAME = 'expedition.carrierPickupPlace.name',
    EXPEDITION_CARRIER_PICKUP_PLACE_CODE = 'expedition.carrierPickupPlace.code',
    EXPEDITION_CARRIER_PICKUP_PLACE_ADDRESS = 'expedition.carrierPickupPlace.address',
    EXPEDITION_USER = 'expedition.user',
    EXPEDITION_USER_FIRST_NAME = 'expedition.user.firstName',
    EXPEDITION_USER_LAST_NAME = 'expedition.user.lastName',
    EXPEDITION_USER_EMAIL = 'expedition.user.email',
    EXPEDITION_USER_PHONE = 'expedition.user.phone',
    EXPEDITION_ESHOP = 'expedition.eshop',
    EXPEDITION_ESHOP_NAME = 'expedition.eshop.name',
    EXPEDITION_ESHOP_ORGANISATION = 'expedition.eshop.organisation',
    EXPEDITION_WAREHOUSE = 'expedition.warehouse',
    EXPEDITION_WAREHOUSE_NAME = 'expedition.warehouse.name',
    EXPEDITION_WMS = 'expedition.wms',
    EXPEDITION_WMS_NAME = 'expedition.wms.name',
    MOVEMENTS_LOT = 'movements.lot',
    MOVEMENTS_PRODUCT_ID = 'movements.product.id',
    MOVEMENTS_PRODUCT_NAME = 'movements.product.name',
    MOVEMENTS_PRODUCT_PRODUCT_SKU = 'movements.product.productSku',
    MOVEMENTS_PRODUCT_INTERNAL_SKU = 'movements.product.internalSku',
    MOVEMENTS_PRODUCT_REFERENCE_NUMBER = 'movements.product.referenceNumbers',
}

export enum Sorter {
    EXPEDITION = 'expedition',
    WMS = 'wms',
    ORGANISATION = 'organisation',
    WAREHOUSE = 'warehouse',
    WMS_INTERNAL_ID = 'wmsInternalId',
    ISSUED_AT = 'issuedAt',
    CREATED_AT = 'createdAt',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    STATUS = 'status',
    TYPE = 'type',
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

export default class MailstepGetOutboundReceiptListBatch extends AMailstepListBatch<
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
    expedition: string;
    wms: string;
    organisation: string;
    warehouse: string;
    wmsInternalId: string;
    issuedAt: string;
    createdAt: string;
    countOfItems: number;
    countOfSku: number;
    sumOfQuantity: number;
    status: string;
}
