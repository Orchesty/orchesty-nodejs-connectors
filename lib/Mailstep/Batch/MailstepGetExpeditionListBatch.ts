import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';
import AMailstepListBatch, { IFilter } from './AMailstepListBatch';

export const NAME = `${APPLICATION_NAME}-get-expedition-list-batch`;

export const LAST_RUN_KEY = 'expedition/list';

export enum Select {
    ID = 'id',
    USER = 'user',
    ESHOP = 'eshop',
    WAREHOUSE = 'warehouse',
    WMS = 'wms',
    PARTNER = 'partner',
    ORDER_NUMBER = 'orderNumber',
    NOTE = 'note',
    BILLING_FIRST_NAME = 'billingFirstName',
    BILLING_LAST_NAME = 'billingLastName',
    BILLING_DEGREE = 'billingDegree',
    BILLING_COMPANY = 'billingCompany',
    BILLING_STREET = 'billingStreet',
    BILLING_HOUSE_NR = 'billingHouseNr',
    BILLING_ZIP = 'billingZip',
    BILLING_CITY = 'billingCity',
    BILLING_COUNTRY = 'billingCountry',
    BILLING_STATE = 'billingState',
    BILLING_EMAIL = 'billingEmail',
    BILLING_PHONE = 'billingPhone',
    BILLING_REGISTRATION_NUMBER = 'billingRegistrationNumber',
    BILLING_VAT_NUMBER = 'billingVatNumber',
    DIFFERENT_DELIVERY_ADDRESS = 'differentDeliveryAddress',
    DELIVERY_FIRST_NAME = 'deliveryFirstName',
    DELIVERY_LAST_NAME = 'deliveryLastName',
    DELIVERY_DEGREE = 'deliveryDegree',
    DELIVERY_COMPANY = 'deliveryCompany',
    DELIVERY_STREET = 'deliveryStreet',
    DELIVERY_HOUSE_NR = 'deliveryHouseNr',
    DELIVERY_ZIP = 'deliveryZip',
    DELIVERY_CITY = 'deliveryCity',
    DELIVERY_COUNTRY = 'deliveryCountry',
    DELIVERY_STATE = 'deliveryState',
    DELIVERY_EMAIL = 'deliveryEmail',
    DELIVERY_PHONE = 'deliveryPhone',
    REQUIRED_EXPEDITION_DATE = 'requiredExpeditionDate',
    CARRIER = 'carrier',
    CARRIER_SERVICE = 'carrierService',
    CARRIER_PICKUP_PLACE = 'carrierPickupPlace',
    EXTERNAL_CARRIER_PICKUP_PLACE = 'externalCarrierPickupPlace',
    CARRIER_NOTE = 'carrierNote',
    TRACKING_NUMBER = 'trackingNumber',
    TRACKING_URL = 'trackingUrl',
    GENERIC_TRACKING_URL = 'genericTrackingUrl',
    EXTERNAL_TRACKING_NUMBER = 'externalTrackingNumber',
    EXTERNAL_PACKAGE_NUMBER = 'externalPackageNumber',
    PACKAGES_COUNT = 'packagesCount',
    STATUS = 'status',
    EXPEDITED_COMPLETELY = 'expeditedCompletely',
    VALUE = 'value',
    CURRENCY = 'currency',
    FRAGILE = 'fragile',
    COD = 'cod',
    COD_VALUE = 'codValue',
    COD_CURRENCY = 'codCurrency',
    COD_VARIABLE_SYMBOL = 'codVariableSymbol',
    CUSTOMER_GROUP = 'customerGroup',
    ESHOP_ORDER_DATE = 'eshopOrderDate',
    CREATED_AT = 'createdAt',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    PACKED_AT = 'packedAt',
    SENT_AT = 'sentAt',
    DELIVERED_AT = 'deliveredAt',
    WAIT_BEFORE_PROCESSING = 'waitBeforeProcessing',
    EDIT_BEFORE_PROCESSING = 'editBeforeProcessing',
    PRIORITY = 'priority',
    REF_1 = 'ref1',
    REF_2 = 'ref2',
    REF_3 = 'ref3',
    FOREIGN_PRICE = 'foreignPrice',
    CONVERSION_DATE = 'conversionDate',
    MODIFIED_AT = 'modifiedAt',
    REMOVED_VIRTUAL_PRODUCTS = 'removedVirtualProducts',
    IGNORE_ADDRESS_VALIDATION = 'ignoreAddressValidation',
    ADDRESS_VALIDATION_EXECUTED = 'addressValidationExecuted',
    B_2_B = 'b2b',
    CARRIER_OPTIONS = 'carrierOptions',
    DELIVERY_COST = 'deliveryCost',
    DELIVERY_COST_CURRENCY = 'deliveryCostCurrency',
    INVOICE_NUMBER = 'invoiceNumber',
    SERVICES = 'services',
    CHANGED_AT = 'changedAt'
}

export enum Filter {
    ID = 'id',
    ORDER_NUMBER = 'orderNumber',
    NOTE = 'note',
    CARRIER_NOTE = 'carrierNote',
    TRACKING_NUMBER = 'trackingNumber',
    TRACKING_URL = 'trackingUrl',
    EXTERNAL_TRACKING_NUMBER = 'externalTrackingNumber',
    EXTERNAL_PACKAGE_NUMBER = 'externalPackageNumber',
    PACKAGES_COUNT = 'packagesCount',
    STATUS = 'status',
    VALUE = 'value',
    CURRENCY = 'currency',
    FRAGILE = 'fragile',
    COD = 'cod',
    COD_VALUE = 'codValue',
    COD_CURRENCY = 'codCurrency',
    COD_VARIABLE_SYMBOL = 'codVariableSymbol',
    CUSTOMER_GROUP = 'customerGroup',
    REQUIRED_EXPEDITION_DATE = 'requiredExpeditionDate',
    ESHOP_ORDER_DATE = 'eshopOrderDate',
    PACKED_AT = 'packedAt',
    DELIVERED_AT = 'deliveredAt',
    SENT_AT = 'sentAt',
    CREATED_AT = 'createdAt',
    CHANGED_AT = 'changedAt',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    PRIORITY = 'priority',
    REF_1 = 'ref1',
    REF_2 = 'ref2',
    REF_3 = 'ref3',
    MODIFIED_AT = 'modifiedAt',
    DELIVERY_COST_CURRENCY = 'deliveryCostCurrency',
    DELIVERY_COST = 'deliveryCost',
    INVOICE_NUMBER = 'invoiceNumber',
    BILLING_FIRST_NAME = 'billingFirstName',
    BILLING_LAST_NAME = 'billingLastName',
    BILLING_DEGREE = 'billingDegree',
    BILLING_COMPANY = 'billingCompany',
    BILLING_STREET = 'billingStreet',
    BILLING_STATE = 'billingState',
    BILLING_HOUSE_NR = 'billingHouseNr',
    BILLING_ZIP = 'billingZip',
    BILLING_CITY = 'billingCity',
    BILLING_COUNTRY = 'billingCountry',
    BILLING_COUNTRY_NAME = 'billingCountry.name',
    BILLING_COUNTRY_CODE = 'billingCountry.code',
    BILLING_EMAIL = 'billingEmail',
    BILLING_PHONE = 'billingPhone',
    BILLING_REGISTRATION_NUMBER = 'billingRegistrationNumber',
    BILLING_VAT_NUMBER = 'billingVatNumber',
    DIFFERENT_DELIVERY_ADDRESS = 'differentDeliveryAddress',
    DELIVERY_FIRST_NAME = 'deliveryFirstName',
    DELIVERY_LAST_NAME = 'deliveryLastName',
    DELIVERY_DEGREE = 'deliveryDegree',
    DELIVERY_COMPANY = 'deliveryCompany',
    DELIVERY_STREET = 'deliveryStreet',
    DELIVERY_STATE = 'deliveryState',
    DELIVERY_HOUSE_NR = 'deliveryHouseNr',
    DELIVERY_ZIP = 'deliveryZip',
    DELIVERY_CITY = 'deliveryCity',
    DELIVERY_COUNTRY = 'deliveryCountry',
    DELIVERY_COUNTRY_NAME = 'deliveryCountry.name',
    DELIVERY_COUNTRY_CODE = 'deliveryCountry.code',
    DELIVERY_EMAIL = 'deliveryEmail',
    DELIVERY_PHONE = 'deliveryPhone',
    INVOICE_NAME = 'invoice.name',
    INVOICE_ORIGINAL_NAME = 'invoice.originalName',
    INVOICE_SIZE = 'invoice.size',
    INVOICE_MIME_TYPE = 'invoice.mimeType',
    CARRIER = 'carrier',
    CARRIER_NAME = 'carrier.name',
    CARRIER_CODE = 'carrier.code',
    CARRIER_SERVICE = 'carrierService',
    CARRIER_SERVICE_NAME = 'carrierService.name',
    CARRIER_SERVICE_CODE = 'carrierService.code',
    CARRIER_PICKUP_PLACE = 'carrierPickupPlace',
    CARRIER_PICKUP_PLACE_NAME = 'carrierPickupPlace.name',
    CARRIER_PICKUP_PLACE_CODE = 'carrierPickupPlace.code',
    CARRIER_PICKUP_PLACE_ADDRESS = 'carrierPickupPlace.address',
    USER = 'user',
    USER_FIRST_NAME = 'user.firstName',
    USER_LAST_NAME = 'user.lastName',
    USER_EMAIL = 'user.email',
    USER_PHONE = 'user.phone',
    ESHOP = 'eshop',
    ESHOP_NAME = 'eshop.name',
    ESHOP_ORGANISATION = 'eshop.organisation',
    WAREHOUSE = 'warehouse',
    WAREHOUSE_NAME = 'warehouse.name',
    WMS = 'wms',
    WMS_NAME = 'wms.name',
    EXPEDITED_COMPLETELY = 'expeditedCompletely',
    B_2_B = 'b2b',
    WITH_INVOICE = 'withInvoice',
    WITH_COMPLAINT = 'withComplaint',
}

export enum Sorter {
    USER = 'user',
    ESHOP = 'eshop',
    WAREHOUSE = 'warehouse',
    WMS = 'wms',
    PARTNER = 'partner',
    ORDER_NUMBER = 'orderNumber',
    BILLING_FIRST_NAME = 'billingFirstName',
    BILLING_LAST_NAME = 'billingLastName',
    BILLING_DEGREE = 'billingDegree',
    BILLING_COMPANY = 'billingCompany',
    BILLING_STREET = 'billingStreet',
    BILLING_HOUSE_NR = 'billingHouseNr',
    BILLING_ZIP = 'billingZip',
    BILLING_CITY = 'billingCity',
    BILLING_COUNTRY = 'billingCountry',
    BILLING_STATE = 'billingState',
    BILLING_EMAIL = 'billingEmail',
    BILLING_PHONE = 'billingPhone',
    BILLING_REGISTRATION_NUMBER = 'billingRegistrationNumber',
    BILLING_VAT_NUMBER = 'billingVatNumber',
    DIFFERENT_DELIVERY_ADDRESS = 'differentDeliveryAddress',
    DELIVERY_FIRST_NAME = 'deliveryFirstName',
    DELIVERY_LAST_NAME = 'deliveryLastName',
    DELIVERY_DEGREE = 'deliveryDegree',
    DELIVERY_COMPANY = 'deliveryCompany',
    DELIVERY_STREET = 'deliveryStreet',
    DELIVERY_HOUSE_NR = 'deliveryHouseNr',
    DELIVERY_ZIP = 'deliveryZip',
    DELIVERY_CITY = 'deliveryCity',
    DELIVERY_COUNTRY = 'deliveryCountry',
    DELIVERY_STATE = 'deliveryState',
    DELIVERY_EMAIL = 'deliveryEmail',
    DELIVERY_PHONE = 'deliveryPhone',
    REQUIRED_EXPEDITION_DATE = 'requiredExpeditionDate',
    CARRIER = 'carrier',
    CARRIER_SERVICE = 'carrierService',
    CARRIER_PICKUP_PLACE = 'carrierPickupPlace',
    EXTERNAL_CARRIER_PICKUP_PLACE = 'externalCarrierPickupPlace',
    CARRIER_NOTE = 'carrierNote',
    TRACKING_NUMBER = 'trackingNumber',
    TRACKING_URL = 'trackingUrl',
    GENERIC_TRACKING_URL = 'genericTrackingUrl',
    EXTERNAL_TRACKING_NUMBER = 'externalTrackingNumber',
    EXTERNAL_PACKAGE_NUMBER = 'externalPackageNumber',
    PACKAGES_COUNT = 'packagesCount',
    STATUS = 'status',
    EXPEDITED_COMPLETELY = 'expeditedCompletely',
    VALUE = 'value',
    CURRENCY = 'currency',
    FRAGILE = 'fragile',
    COD = 'cod',
    COD_VALUE = 'codValue',
    COD_CURRENCY = 'codCurrency',
    COD_VARIABLE_SYMBOL = 'codVariableSymbol',
    CUSTOMER_GROUP = 'customerGroup',
    ESHOP_ORDER_DATE = 'eshopOrderDate',
    CREATED_AT = 'createdAt',
    COUNT_OF_ITEMS = 'countOfItems',
    COUNT_OF_SKU = 'countOfSku',
    SUM_OF_QUANTITY = 'sumOfQuantity',
    PACKED_AT = 'packedAt',
    SENT_AT = 'sentAt',
    DELIVERED_AT = 'deliveredAt',
    WAIT_BEFORE_PROCESSING = 'waitBeforeProcessing',
    EDIT_BEFORE_PROCESSING = 'editBeforeProcessing',
    PRIORITY = 'priority',
    REF_1 = 'ref1',
    REF_2 = 'ref2',
    REF_3 = 'ref3',
    FOREIGN_PRICE = 'foreignPrice',
    CONVERSION_DATE = 'conversionDate',
    MODIFIED_AT = 'modifiedAt',
    REMOVED_VIRTUAL_PRODUCTS = 'removedVirtualProducts',
    IGNORE_ADDRESS_VALIDATION = 'ignoreAddressValidation',
    ADDRESS_VALIDATION_EXECUTED = 'addressValidationExecuted',
    B_2_B = 'b2b',
    DELIVERY_COST = 'deliveryCost',
    DELIVERY_COST_CURRENCY = 'deliveryCostCurrency',
    INVOICE_NUMBER = 'invoiceNumber',
    CHANGED_AT = 'changedAt',
    USER_DATE_OF_BIRTH = 'user.dateOfBirth',
    USER_FIRST_NAME = 'user.firstName',
    USER_LAST_NAME = 'user.lastName',
    USER_EMAIL = 'user.email',
    USER_PHONE = 'user.phone',
    USER_CHANGED_AT = 'user.changedAt',
    ESHOP_NAME = 'eshop.name',
    ESHOP_URL_SLUG = 'eshop.urlSlug',
    ESHOP_INTEGRATION_TYPE = 'eshop.integrationType',
    ESHOP_CHANGED_AT = 'eshop.changedAt',
    WAREHOUSE_NAME = 'warehouse.name',
    WAREHOUSE_CUSTOM_ID = 'warehouse.customId',
    WAREHOUSE_CHANGED_AT = 'warehouse.changedAt',
    WMS_NAME = 'wms.name',
    WMS_CHANGED_AT = 'wms.changedAt',
    PARTNER_CODE = 'partner.code',
    PARTNER_NAME = 'partner.name',
    PARTNER_COMPANY_NAME = 'partner.companyName',
    PARTNER_FIRST_NAME = 'partner.firstName',
    PARTNER_LAST_NAME = 'partner.lastName',
    PARTNER_EMAIL = 'partner.email',
    PARTNER_REGISTRATION_NUMBER = 'partner.registrationNumber',
    PARTNER_VAT_NUMBER = 'partner.vatNumber',
    PARTNER_CHANGED_AT = 'partner.changedAt',
    BILLING_COUNTRY_CODE = 'billingCountry.code',
    BILLING_COUNTRY_NAME = 'billingCountry.name',
    BILLING_COUNTRY_CURRENCY_CODE = 'billingCountry.currencyCode',
    BILLING_COUNTRY_CURRENCY_NAME = 'billingCountry.currencyName',
    BILLING_COUNTRY_CUSTOMS_DECLARATION = 'billingCountry.customsDeclaration',
    BILLING_COUNTRY_CHANGED_AT = 'billingCountry.changedAt',
    DELIVERY_COUNTRY_CODE = 'deliveryCountry.code',
    DELIVERY_COUNTRY_NAME = 'deliveryCountry.name',
    DELIVERY_COUNTRY_CURRENCY_CODE = 'deliveryCountry.currencyCode',
    DELIVERY_COUNTRY_CURRENCY_NAME = 'deliveryCountry.currencyName',
    DELIVERY_COUNTRY_CUSTOMS_DECLARATION = 'deliveryCountry.customsDeclaration',
    DELIVERY_COUNTRY_CHANGED_AT = 'deliveryCountry.changedAt',
    CARRIER_NAME = 'carrier.name',
    CARRIER_CODE = 'carrier.code',
    CARRIER_CHANGED_AT = 'carrier.changedAt',
    CARRIER_SERVICE_NAME = 'carrierService.name',
    CARRIER_SERVICE_CODE = 'carrierService.code',
    CARRIER_SERVICE_PICKUP_PLACE_IGNORE = 'carrierService.pickupPlaceIgnore',
    CARRIER_SERVICE_PICKUP_PLACE_MANDATORY = 'carrierService.pickupPlaceMandatory',
    CARRIER_SERVICE_EMAIL_MANDATORY = 'carrierService.emailMandatory',
    CARRIER_SERVICE_PHONE_MANDATORY = 'carrierService.phoneMandatory',
    CARRIER_SERVICE_NAME_MANDATORY = 'carrierService.nameMandatory',
    CARRIER_SERVICE_LEGACY_DISPENSE = 'carrierService.legacyDispense',
    CARRIER_SERVICE_SKIP_DELIVERY_STATUS = 'carrierService.skipDeliveryStatus',
    CARRIER_SERVICE_INVOICE_MANDATORY_OUTSIDE_EU = 'carrierService.invoiceMandatoryOutsideEU',
    CARRIER_SERVICE_CHANGED_AT = 'carrierService.changedAt',
    CARRIER_PICKUP_PLACE_NAME = 'carrierPickupPlace.name',
    CARRIER_PICKUP_PLACE_CODE = 'carrierPickupPlace.code',
    CARRIER_PICKUP_PLACE_CODE_2 = 'carrierPickupPlace.code2',
    CARRIER_PICKUP_PLACE_ADDRESS = 'carrierPickupPlace.address',
    CARRIER_PICKUP_PLACE_STATUS = 'carrierPickupPlace.status',
    CARRIER_PICKUP_PLACE_CHANGED_AT = 'carrierPickupPlace.changedAt',
    EXTERNAL_CARRIER_PICKUP_PLACE_STATUS = 'externalCarrierPickupPlace.status',
}

export default class MailstepGetExpeditionListBatch extends AMailstepListBatch<
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
            [Filter.ESHOP]: {
                eq: await this.getEshopId(dto),
            },
        };
    }

}

export interface IOutput {
    id: string;
    eshop: string;
    warehouse: string;
    wms: string;
    orderNumber: string;
    carrier: string;
    carrierService: string;
    status: string;
    value: string;
    currency: string;
    user?: string;
    partner?: string;
    note?: string;
    billingFirstName?: string;
    billingLastName?: string;
    billingDegree?: string;
    billingCompany?: string;
    billingStreet?: string;
    billingHouseNr?: string;
    billingZip?: number;
    billingCity?: string;
    billingCountry?: string;
    billingState?: string;
    billingEmail?: string;
    billingPhone?: string;
    billingRegistrationNumber?: number;
    billingVatNumber?: string;
    differentDeliveryAddress?: boolean;
    deliveryFirstName?: string;
    deliveryLastName?: string;
    deliveryDegree?: string;
    deliveryCompany?: string;
    deliveryStreet?: string;
    deliveryHouseNr?: string;
    deliveryZip?: number;
    deliveryCity?: string;
    deliveryCountry?: string;
    deliveryState?: string;
    deliveryEmail?: string;
    deliveryPhone?: string;
    requiredExpeditionDate?: string;
    carrierPickupPlace?: string;
    externalCarrierPickupPlace?: string;
    carrierNote?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    genericTrackingUrl?: string;
    externalTrackingNumber?: string;
    externalPackageNumber?: string;
    packagesCount?: number;
    expeditedCompletely?: boolean;
    fragile?: boolean;
    cod?: boolean;
    codValue?: number;
    codCurrency?: string;
    codVariableSymbol?: string;
    customerGroup?: string;
    eshopOrderDate?: string;
    createdAt?: string;
    countOfItems?: number;
    countOfSku?: number;
    sumOfQuantity?: number;
    packedAt?: string;
    sentAt?: string;
    deliveredAt?: string;
    waitBeforeProcessing?: boolean;
    editBeforeProcessing?: boolean;
    priority?: number;
    ref1?: string;
    ref2?: string;
    ref3?: string;
    foreignPrice?: {
        amount?: number;
        currency?: string;
    };
    conversionDate?: string;
    modifiedAt?: string;
    removedVirtualProducts?: {
        productId?: string;
        quantity?: number;
    }[];
    ignoreAddressValidation?: boolean;
    addressValidationExecuted?: boolean;
    b2b?: boolean;
    carrierOptions?: {
        recipientIdentificationNumber?: string;
    };
    deliveryCost?: number;
    deliveryCostCurrency?: string;
    invoiceNumber?: string;
    services?: string[];
    changedAt?: string;
    invoiceUrl?: string;
    invoiceOriginalName?: string;
    withComplaint?: string;
}
