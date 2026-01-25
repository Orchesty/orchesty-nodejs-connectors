import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { NAME as WFLOW_APP_NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-put-document-connector`;

export default class WflowPutDocumentConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const app = this.getApplication();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { externalId, ignoreLock, setAsFilled } = dto.getJsonData();

        const query = new URLSearchParams();
        if (externalId) query.set('externalId', externalId);
        if (ignoreLock) query.set('ignoreLock', ignoreLock.toString());
        if (setAsFilled) query.set('setAsFilled', setAsFilled.toString());

        const organization: string | undefined
            = appInstall.getSettings()[ORGANIZATION_FORM]?.[ORGANIZATION];

        const request = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `/${organization}/documents${query.size ? `?${query}` : ''}`,
            dto.getJsonData(),
        );

        await this.getSender().send(request);

        return dto;
    }

}

interface UpdateRegister {
    id: string;
    externalId: string;
    code: string;
}

export interface IInput {
    id: string;
    externalId?: string;
    ignoreLock?: boolean;
    setAsFilled?: boolean;
    type?: {
        id?: string;
        kind?: 'IncomingInvoice' | 'OutgoingInvoice' | 'ExpenditureCashSlip' | 'SupplierOrder' | 'CustomerOrder' | 'Other' | 'Contract' | 'IncomeCashReceipt';
    };
    number?: string;
    internalCode?: string;
    vatDocumentCode?: string;
    variableSymbol?: string;
    constantSymbol?: string;
    specificSymbol?: string;
    issueDate?: string;
    dueDate?: string;
    vatDate?: string;
    acceptDate?: string;
    caseDate?: string;
    validFrom?: string;
    validTo?: string;
    effectiveFrom?: string;
    effectiveTo?: string;
    signatureDate?: string;
    reviewDate?: string;
    accountTerm?: string;
    vatTerm?: string;
    totalAmount?: number;
    roundingAmount?: number;
    totalAmountFC?: number;
    advanceAmount?: number;
    currency?: string;
    partnerIC?: string;
    partnerVAT?: string;
    partnerLocalVAT?: string;
    partnerName?: string;
    partnerAddress?: string;
    partnerEmail?: string;
    accountNo?: string;
    bankCode?: string;
    iban?: string;
    bic?: string;
    meIC?: string;
    exchangeRate?: number;
    exchangeRateUnits?: number;
    tag?: string;
    orderNo?: string;
    description?: string;
    contactPersonName?: string;
    contactPersonEmail?: string;
    invoiceType?: 'TaxInvoice' | 'CreditNote' | 'DebitNote' | 'Proforma' | 'TaxInvoicePayment';
    expectedDeliveryDate?: string;
    deliveryLocation?: UpdateRegister;
    series?: string;
    serie?: UpdateRegister;
    accountCode?: string;
    doNotPay?: boolean;
    partner?: {
        id: string;
    };
    vaTs?: {
        type: 'Exempt' | 'FirstReduced' | 'SecondReduced' | 'Basic';
        rate?: number;
        base?: number;
        tax?: number;
    }[];
    lines?: {
        id?: string;
        totalAmount?: number;
        totalAmountFC?: number;
        accountCode?: string;
        currency?: string;
        description?: string;
        quantity?: number;
        unitPrice?: number;
        measureUnit?: string;
        order?: number;
    }[];
    accounting?: {
        businessItemCode?: string;
        accountingRule?: UpdateRegister;
        activity?: UpdateRegister;
        businessCase?: UpdateRegister;
        cardDocumentType?: UpdateRegister;
        cashDocumentType?: UpdateRegister;
        cashRegister?: UpdateRegister;
        contraAccount?: UpdateRegister;
        contract?: UpdateRegister;
        costCenter?: UpdateRegister;
        employee?: UpdateRegister;
        paymentMethod?: UpdateRegister;
        project?: UpdateRegister;
        vatControlStatementLine?: UpdateRegister;
        vatReturnLine?: UpdateRegister;
        vatReverseChargeCode?: UpdateRegister;
        vehicle?: UpdateRegister;
        vatSupplyModeCode?: 'Normal' | 'TravelService' | 'UsedGoods';
        vatApplyReductionCoefficient?: boolean;
        vatFixedAssets?: boolean;
        vatMode?: 'Standard' | 'ReverseChargeDomestic' | 'ReverseCharge' | 'Excluded' | 'InForeignCurrency';
    }
}

export type IOutput = IInput;
