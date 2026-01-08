import ACommonConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/ACommonConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { NAME as WFLOW_APP_NAME } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-get-document-connector`;

export default class WflowGetDocumentConnector extends ACommonConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication();
        const { organization, documentId } = dto.getJsonData();

        const request = await app.getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `/${organization}/documents/${documentId}`,
        );

        const response = (await this.getSender().send<IOutput>(request)).getJsonBody();

        return dto.setNewJsonData(response);
    }

}

export interface IInput {
    organization: string;
    documentId: string;
}

export interface IOutput {
    id: string;
    serie: Serie;
    number: string;
    internalCode: string;
    vatDocumentCode: string;
    variableSymbol: string;
    constantSymbol: string;
    specificSymbol: string;
    issueDate: string;
    dueDate: string;
    vatDate: string;
    acceptDate: string;
    caseDate: string;
    validFrom: string;
    validTo: string;
    effectiveFrom: string;
    effectiveTo: string;
    signatureDate: string;
    reviewDate: string;
    accountTerm: string;
    vatTerm: string;
    taxExclusiveAmount: number;
    totalAmount: number;
    roundingAmount: number;
    totalAmountFC: number;
    advanceAmount: number;
    currency: string;
    partnerIC: string;
    partnerVAT: string;
    partnerLocalVAT: string;
    partnerName: string;
    partnerAddress: string;
    partnerEmail: string;
    accountNo: string;
    bankCode: string;
    iban: string;
    bic: string;
    meIC: string;
    exchangeRate: number;
    exchangeRateUnits: number;
    tag: string;
    orderNo: string;
    description: string;
    contactPersonName: string;
    contactPersonEmail: string;
    remainsToDeliverAmount: number;
    invoiceType: string;
    expectedDeliveryDate: string;
    accountCode: string;
    doNotPay: boolean;
    created: string;
    updated: string;
    lastAction: string;
    removed: string;
    locked: boolean;
    approvalStatus: string;
    flowStatus: string;
    payment: {
        paidAmount: number;
        paidDate: string;
        paymentStatus: string;
        paymentOrderAmount: number;
        paymentOrderStatus: string;
        activePaymentRequestDate: string;
    };
    dataSource: string;
    source: string;
    createdBy: string;
    series: string;
    type: {
        id: string;
        name: string;
        kind: string;
        default: boolean;
        erpExclude: boolean;
        filesExtendName: boolean;
        docCreatingMethod: string;
        autoStamp: string;
        serie: Serie;
        sequence: {
            id: string;
            entity: string;
            description: string;
            fixedPart: string;
            counter: string;
        };
        invoiceType: string;
    };
    partner: {
        id: string;
        externalId: string;
        ic: string;
        vat: string;
        name: string;
        address: string;
        localVAT: string;
        note: string;
        phoneNo: string;
        mailAddress: string;
        deliveryPeriod: number;
        minOrderTotal: number;
        toleranceRate: number;
        language: string;
        isValid: boolean;
        businessRegisterRegistration: string;
        customer: boolean;
        supplier: boolean;
    };
    deliveryLocation: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
        address: string;
        contact: string;
    };
    accounting: Accounting;
    vaTs: {
        rate: number;
        type: string;
        base: number;
        tax: number;
    }[];
    lines: {
        id: string;
        totalAmount: number;
        totalAmountFC: number;
        accountCode: string;
        currency: string;
        description: string;
        quantity: number;
        unitPrice: number;
        measureUnit: string;
        vatType: string;
        vatRate: number;
        order: number;
        approval: {
            level: number;
            team: {
                id: string
                name: string
                description: string
                system: boolean
            };
            identity: {
                login: string
                firstName: string
                lastName: string
                fullName: string
            };
            date: string;
            status: string;
        };
        changedAfterApprove: boolean;
        accounting: Accounting;
        code: string;
        costCenter: CostCenter;
        contract: Contract;
        activity: Activity;
    }[];
    transactionId: string;
    expenseCardId: string;
}

interface Serie {
    id: string;
    externalId: string;
    code: string;
    description: string;
    isValid: boolean;
    kind: string;
    invoiceType: string;
}

interface Accounting {
    businessItemCode: string;
    accountingRule: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
        kind: string;
    };
    activity: Activity;
    businessCase: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    cardDocumentType: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    cashDocumentType: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    cashRegister: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    contraAccount: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    contract: Contract;
    costCenter: CostCenter;
    employee: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    paymentMethod: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
        kind: string;
    };
    project: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    vatControlStatementLine: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    vatReturnLine: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
        reverseCharge: boolean;
    };
    vatReverseChargeCode: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    vehicle: {
        id: string;
        externalId: string;
        code: string;
        description: string;
        isValid: boolean;
    };
    vatSupplyModeCode: string;
    vatApplyReductionCoefficient: boolean;
    vatFixedAssets: boolean;
    vatMode: string;
}

interface CostCenter {
    id: string;
    externalId: string;
    code: string;
    description: string;
    isValid: boolean;
}

export interface Contract {
    id: string;
    externalId: string;
    code: string;
    description: string;
    isValid: boolean;
}

export interface Activity {
    id: string;
    externalId: string;
    code: string;
    description: string;
    isValid: boolean;
}
