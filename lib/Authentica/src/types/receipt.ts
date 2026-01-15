/* eslint-disable */
interface AuthenticaReceipt {
    id: number;
    status: string;
    externalId: string;
    incomingDate: number;
    customerNote: string | null;
    customerType: string | null;
    supplier: {
        firstName: string | null;
        lastName: string | null;
        companyName: string;
        addressLine1: string;
        addressLine2: string | null;
        addressLine3: string | null;
        city: string;
        zip: string;
        country: string;
        state: string | null;
    },
    items: {
        productId: number;
        receivedAmount: number | null;
        expectedAmount: number;
        expectedLot: unknown | null;
        expectedExpirationDate: unknown | null;
    }[];
    trackingNumbers: string[];
    shipments: number[];
}
