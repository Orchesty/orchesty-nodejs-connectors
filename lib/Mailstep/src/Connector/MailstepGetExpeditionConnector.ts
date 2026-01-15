import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { NAME as APPLICATION_NAME } from '../MailstepApplication';

export const NAME = `${APPLICATION_NAME}-get-expedition-connector`;

export default class MailstepGetExpeditionConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `expedition/${id}`,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, [StatusCodes.OK]);

        return dto.setNewJsonData(responseDto.getJsonBody());
    }

}

export interface IInput {
    id: string;
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
    carrierPickupPlaceCode?: string;
    externalCarrierPickupPlace?: string;
    externalCarrierPickupPlaceCode?: string;
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
    invoice?: {
        name?: string;
        originalName?: string;
        mimeType?: string;
        size?: number;
    };
    eshopOrderDate?: string;
    createdAt?: string;
    items?: {
        id: string;
        product: string;
        expedition: string;
        quantity: number;
        position?: number;
        bookStockAdvices?: {
            id: string;
            createdAt?: string;
            stockAdviceItem?: string;
            quantity?: number;
        }[];
        expedited?: number;
        productValue?: number;
        productValueCurrency?: string;
        productLabel?: string;
        booked?: number;
        missing?: number;
        lot?: string;
        assignedLot?: string;
        lifo?: boolean;
        ref1?: string;
        ref2?: string;
        ref3?: string;
        createdAt?: string;
        changedAt?: string;
    }[];
    audits?: {
        id: string;
        statusTo: string;
        createdAt?: string;
        updatedBy?: string;
    }[];
    parcels?: {
        expedition?: object;
        createdAt?: string;
        extPackageNumber?: string;
        trackingUrl?: string;
        extPackageTrackingNumber?: string;
        extCarrierTrackingNumber?: string;
        changedAt?: string;
    }[];
    countOfItems?: number;
    countOfSku?: number;
    sumOfQuantity?: number;
    errors?: {
        message?: string;
        propertyPath?: string;
        code?: string;
        parameters?: object;
    }[];
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
    dcCodeOfOrigin?: string;
    invoiceUrl?: string;
    invoiceOriginalName?: string;
    withComplaint?: string;
}
