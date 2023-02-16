import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { COMPANY_ID } from '../PohodaApplication';
import { hasResponseErrorMessage } from '../Service/pohodaService';
import { convertPohodaResponseToUtf8, xmlBuilder, xmlParser } from '../Service/xmlService';
import { PohodaInvoiceType } from '../Types/Invoice';
import { IResponse, PohodaResponseState } from '../Types/Response';

export const NAME = 'pohoda-get-invoices-conector';

export default class PohodaGetInvoicesConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const data = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const companyId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][COMPANY_ID];
        const xmlData = this.getXmlData(companyId, data.application, data.filter);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'xml',
            xmlData,
        );

        const resp = await this.getSender().send(req, [200]);

        const responseJson = xmlParser.parse(convertPohodaResponseToUtf8(resp.getBuffer())) as IResponse;

        const errorMessage = hasResponseErrorMessage(responseJson);

        if (errorMessage) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, errorMessage);
        }

        return dto.setNewJsonData<IOutput>(responseJson.responsePack.responsePackItem.listStock as IOutput);
    }

    private getXmlData(companyId: string, application: string, filter: RequestFilter = {}): string {
        /* eslint-disable @typescript-eslint/naming-convention */

        const requestFilter: Record<string, unknown> = {};

        if (filter.dateLastChange) requestFilter['ftr:lastChanges'] = `${filter.dateLastChange}T00:00:00`;

        if (filter.dateRangeFrom) requestFilter['ftr:dateFrom'] = filter.dateRangeFrom;

        if (filter.dateRangeTo) requestFilter['ftr:dateTill'] = filter.dateRangeTo;

        if (filter.companyName) {
            requestFilter['ftr:selectedCompanys'] = {
                'ftr:company': filter.companyName,
            };
        }

        if (filter.companyId) {
            requestFilter['ftr:selectedIco'] = {
                'ftr:ico': filter.companyId,
            };
        }

        const xml = {
            '?xml': { '@_version': '1.0', '@_encoding': 'utf-8' },
            'dat:dataPack': {
                '@_id': '001',
                '@_ico': companyId,
                '@_application': application,
                '@_version': '2.0',
                '@_note': 'Požadavek na export výběru faktur',
                '@_xmlns:dat': 'http://www.stormware.cz/schema/version_2/data.xsd',
                '@_xmlns:typ': 'http://www.stormware.cz/schema/version_2/type.xsd',
                '@_xmlns:ftr': 'http://www.stormware.cz/schema/version_2/filter.xsd',
                '@_xmlns:lst': 'http://www.stormware.cz/schema/version_2/list.xsd',
                'dat:dataPackItem': {
                    '@_id': 'li1',
                    '@_version': '2.0',
                    'lst:listInvoiceRequest': {
                        '@_version': '2.0',
                        '@_invoiceType': 'issuedInvoice',
                        '@_invoiceVersion': '2.0',
                        'lst:requestInvoice': {
                            'ftr:filter': requestFilter,
                        },
                    },
                },
            },

        };
        /* eslint-enable @typescript-eslint/naming-convention */

        return xmlBuilder.build(xml);
    }

}

interface RequestFilter {
    dateRangeFrom?: string;
    dateRangeTo?: string;
    dateLastChange?: string;
    companyName?: string;
    companyId?: string;
}

export interface IInput {
    application: string;
    filter?: RequestFilter;
}
// todo check types
interface IListInvoiceItem {
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
            accountingType: string;
        };
        classificationVAT: {
            id: number;
            ids: string;
            classificationVATType: string;
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
                ico: string;
                did: string;
            };
            shipToAddress: {
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
                ico: string;
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
        homeCurrency: {
            priceNone: number;
            priceLow: number;
            priceLowVAT: number;
            priceLowSum: number;
            priceHigh: number;
            priceHighVAT: number;
            priceHighSum: number;
            round: {
                priceRound: number;
            };
        };
    };

}

export interface IOutput {
    dateTimeStamp: string;
    dateValidFrom: string;
    state: PohodaResponseState;
    version: string;
    invoice: IListInvoiceItem[];
}
