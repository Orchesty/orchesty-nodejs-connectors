import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkErrorInResponse, ICO, jsonToXml, xmlToJson } from '../PohodaApplication';
import { IListInvoiceItem } from '../Types/Invoice';
import { IResponse, PohodaResponseState } from '../Types/Response';

export const NAME = 'pohoda-get-invoices-conector';

export default class PohodaGetInvoicesConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const data = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const companyId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ICO];
        const xmlData = this.getXmlData(companyId, data.application, data.filter);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'xml',
            xmlData,
        );

        const resp = await this.getSender().send(req, [200]);

        const responseJson = xmlToJson<IResponse>(resp.getBuffer());
        checkErrorInResponse(responseJson);

        const { responsePack } = responseJson;
        checkErrorInResponse(responsePack);

        const { responsePackItem } = responsePack;
        checkErrorInResponse(responsePackItem);

        return dto.setNewJsonData<IOutput>(responsePackItem.listInvoice as IOutput);
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

        return jsonToXml(xml);
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

export interface IOutput {
    dateTimeStamp: string;
    dateValidFrom: string;
    state: PohodaResponseState;
    version: string;
    invoice: IListInvoiceItem[];
}
