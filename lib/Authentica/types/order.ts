/* eslint-disable */
export interface AuthenticaOrder {
    id: number;
    status: string;
    externalId: string;
    carrierId: number;
    branchId: unknown | null;
    price: string;
    priceCurrency: string;
    cod: boolean;
    codValue: unknown | null;
    codValueCurrency: unknown | null;
    vs: unknown | null;
    companyName: string;
    firstName: unknown | null;
    lastName: unknown | null;
    addressLine1: string;
    addressLine2: string;
    addressLine3: unknown | null;
    city: string;
    zip: string;
    country: string;
    state: unknown | null;
    phone: string;
    email: string;
    processingDate: string;
    printDeliveryNote: boolean;
    orderNumber: unknown | null;
    orderTags: string[];
    packagingInstructions: {
        message: string;
        packagingInstructionType: string;
    }[];
    items: {
        productId: number;
        amount: number;
    }[];
    trackingNumbers: unknown[];
    trackingUrls: string[];
}
