export type PohodaInvoiceVatRate = 'high' | 'low' | 'none' | 'third'; // 21% | 15% | 0% | 10%
export type PohodaInvoiceType = 'issuedInvoice' | 'receivedInvoice';
export type PohodaInvoicePaymentType = 'advance' | 'cash' | 'cheque' | 'compensation' | 'creditcard' | 'delivery' | 'draft' | 'encashment' | 'postal';

interface IInvoiceDetailItem {
    id: number;
    text: string;
    quantity: number;
    unit: string;
    coefficient: number;
    payVAT: false;
    rateVAT: PohodaInvoiceVatRate;
    discountPercentage: number;
    homeCurrency: {
        unitPrice: number;
        price: number;
        priceVAT: number;
        priceSum: number;
    };
    code: string;
    guarantee: number;
    guaranteeType: string;
    stockItem: {
        store: {
            id: number;
            ids: string;
        };
        stockItem: {
            id: number;
            ids: string;
            // eslint-disable-next-line @typescript-eslint/naming-convention
            PLU: number;
        };
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PDP: boolean;
    linkedDocument: {
        sourceAgenda: string;
        sourceDocument: {
            id: number;
            number: number;
        };
        sourceDocumentItem: {
            sourceItemId: number;
        };
    };
}
interface IInvoiceLinkedDocumentLink {
    sourceAgenda: string;
    sourceDocument: {
        id: number;
        number: number;
    };
}
export interface IListInvoiceItem {
    version: string;
    invoiceHeader: {
        id: number;
        invoiceType: PohodaInvoiceType;
        number: {
            numberRequested: number;
        };
        symVar: number;
        date: string;
        dateTax: string;
        dateAccounting: string;
        dateDue: string;
        accounting: {
            id: number;
            ids: string;
            accountingType?: string;
        };
        classificationVAT: {
            id: number;
            ids: string;
            classificationVATType?: string;
        };
        text: string;
        partnerIdentity: {
            id: number;
            address: {
                company: string;
                name: string;
                city: string;
                street: string;
                zip: string;
                ico: number;
                did: string;
            };
            shipToAddress?: {
                company?: string;
                name?: string;
                city?: string;
                street?: string;
            };
        };
        myIdentity: {
            address: {
                company: string;
                surname: string;
                name: string;
                city: string;
                street: string;
                number: string;
                zip: string;
                ico: number;
                dic: string;
                phone: string;
                mobilPhone: string;
                fax: string;
                email: string;
                www: string;
            };
        };
        priceLevel: {
            id: number;
            ids: string;
        };
        paymentType: {
            id: number;
            ids: string;
            paymentType: string;
        };
        account: {
            id: number;
            ids: string;
        };
        symConst: number;
        liquidation: {
            amountHome: number;
        };
    };
    invoiceSummary: {
        roundingDocument: string;
        roundingVAT: string;
        calculateVAT: boolean;
        typeCalculateVATInclusivePrice: string;
        homeCurrency: {
            priceNone: number;
            priceLow: number;
            priceLowVAT: number;
            priceLowSum: number;
            priceHigh: number;
            priceHighVAT: number;
            priceHighSum: number;
            price3: number;
            price3VAT: number;
            price3Sum: number;
            round: {
                priceRound: number;
            };
        };
    };
    invoiceDetail?: {
        invoiceItem: IInvoiceDetailItem[];
    };
    linkedDocuments?: {
        link: IInvoiceLinkedDocumentLink[];
    };
}
