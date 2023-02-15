import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { COMPANY_ID } from '../PohodaApplication';
import { PohodaInvoiceType } from '../Types/Invoice';
import { PohodaResponseState } from '../Types/Response';
import { convertPohodaResponseToUtf8, xmlBuilder, xmlParser } from '../xmlHelper';

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

        const responseJson = xmlParser.parse(convertPohodaResponseToUtf8(resp.getBuffer())) as IOutput;

        return dto.setNewJsonData<IOutput>(responseJson);
    }

    private getXmlData(companyId: string, application: string, filter: RequestFilter = {}): string {
        /* eslint-disable @typescript-eslint/naming-convention */
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
                            'ftr:filter': {
                                'ftr:lastChanges': filter.dateLastChange,
                                'ftr:dateFrom': filter.dateRangeFrom,
                                'ftr:dateTill': filter.dateRangeTo,
                                'ftr:selectedCompanys': {
                                    'ftr:company': filter.companyName,
                                },
                                'ftr:selectedIco': {
                                    'ftr:ico': filter.companyId,
                                },
                            },
                        },
                    },
                },
            },

        };
        /* eslint-enable @typescript-eslint/naming-convention */

        return xmlBuilder.build(xml);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
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
    '@_version': string;
    'invoiceHeader': {
        'id': number;
        'invoiceType': PohodaInvoiceType;
        'number': {
            'numberRequested': number;
        };
        'symVar': number;
        'date': string;
        'dateTax': string;
        'dateAccounting': string;
        'dateDue': string;
        'accounting': {
            'id': number;
            'ids': string;
            'accountingType': string;
        };
        'classificationVAT': {
            'id': number;
            'ids': string;
            'classificationVATType': string;
        };
        'text': string;
        'partnerIdentity': {
            'id': number;
            'address': {
                'company': string;
                'name': string;
                'city': string;
                'street': string;
                'zip': string;
                'ico': string;
                'did': string;
            };
            'shipToAddress': {
                'company'?: string;
                'name'?: string;
                'city'?: string;
                'street'?: string;
            };
        };
        'myIdentity': {
            'address': {
                'company': string;
                'surname': string;
                'name': string;
                'city': string;
                'street': string;
                'number': string;
                'zip': string;
                'ico': string;
                'dic': string;
                'phone': string;
                'mobilPhone': string;
                'fax': string;
                'email': string;
                'www': string;
            };
        };
        'priceLevel': {
            'id': number;
            'ids': string;
        };
        'paymentType': {
            'id': number;
            'ids': string;
            'paymentType': string;
        };
        'account': {
            'id': number;
            'ids': string;
        };
        'symConst': number;
        'liquidation': {
            'amountHome': number;
        };
    };
    'invoiceSummary': {
        'roundingDocument': string;
        'roundingVAT': string;
        'homeCurrency': {
            'priceNone': number;
            'priceLow': number;
            'priceLowVAT': number;
            'priceLowSum': number;
            'priceHigh': number;
            'priceHighVAT': number;
            'priceHighSum': number;
            'round': {
                'priceRound': number;
            };
        };
    };

}

export interface IOutput {
    '?xml': { '@_version': string; '@_encoding': string };
    'rsp:responsePack': {
        '@_id': string;
        '@_state': PohodaResponseState;
        '@_version': string;
        'rsp:responsePackItem': {
            '@_state': PohodaResponseState;
            '@_version': string;
            '@_note'?: string;
            'lStk:listStock'?: {
                '@_dateTimeStamp': string;
                '@_dateValidFrom': string;
                '@_state': PohodaResponseState;
                '@_version': string;
                'lst:invoice': IListInvoiceItem[];
            };
        };
    };
}
