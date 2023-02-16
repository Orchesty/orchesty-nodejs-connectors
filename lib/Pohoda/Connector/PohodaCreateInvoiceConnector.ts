import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { COMPANY_ID } from '../PohodaApplication';

export const NAME = 'pohoda-create-invoice-conector';

export default class PohodaCreateInvoiceConnector extends AConnector {

    private readonly windowsTextDecoder = new TextDecoder('windows-1250');

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const companyId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][COMPANY_ID];
        const xmlData = this.createXml(dto.getJsonData(), companyId);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'xml',
            xmlData,
        );

        const resp = await this.getSender().send(req, [200]);

        const parser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true, removeNSPrefix: true, attributeNamePrefix: '' });
        const responseJson = parser.parse(this.convertResponseToUtf8(resp.getBuffer())) as IResponse;

        const errorMessage = this.checkResponseForErrors(responseJson);

        if (errorMessage) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, errorMessage);
        }

        return dto.setNewJsonData<IOutput>(responseJson.responsePack.responsePackItem.invoiceResponse as IOutput);
    }

    private createXml(input: IInput, companyId: string): string {
        const builder = new XMLBuilder({ attributeNamePrefix: '@_', ignoreAttributes: false });

        /* eslint-disable @typescript-eslint/naming-convention */
        const invoiceItems = input.invoiceItems?.map((item) => ({
            'inv:invoiceItem': {
                'inv:text': item.text,
                'inv:note': item.note,
                'inv:quantity': item.quantity,
                'inv:payVAT': item.payVat,
                'inv:rateVAT': item.rateVat,
                'inv:homeCurrency': {
                    'typ:unitPrice': item.unitPrice,
                    'typ:price': item.price,
                    'typ:priceVAT': item.priceVat,
                },
            },
        })) || [];

        const invoice = {
            '?xml': { '@_version': '1.0', '@_encoding': 'utf-8' },
            'dat:dataPack': {
                '@_xmlns:dat': 'http://www.stormware.cz/schema/version_2/data.xsd',
                '@_xmlns:typ': 'http://www.stormware.cz/schema/version_2/type.xsd',
                '@_xmlns:inv': 'http://www.stormware.cz/schema/version_2/invoice.xsd',
                '@_version': '2.0',
                '@_id': 'Usr1',
                '@_application': 'POHODA',
                '@_note': 'New invoice',
                '@_ico': companyId,
                'dat:dataPackItem': {
                    '@_version': '2.0',
                    '@_id': 'Usr1',
                    'inv:invoice': {
                        '@_version': '2.0',
                        'inv:invoiceHeader': {
                            'inv:invoiceType': input.invoiceType,
                            'inv:number': {
                                'typ:numberRequested': input.invoiceNumber,
                            },
                            'inv:date': input.createdAt,
                            'inv:dateDue': input.dueDate,
                            'inv:dateTax': input.taxDate,
                            'inv:dateAccounting': input.accountingDate,
                            'inv:text': input.text,
                            'inv:paymentType': {
                                'typ:paymentType': input.paymentType,
                            },
                            'inv:partnerIdentity': {
                                'typ:address': {
                                    'typ:company': input.partnerIdentity.company,
                                    'typ:city': input.partnerIdentity.city,
                                    'typ:street': input.partnerIdentity.street,
                                    'typ:zip': input.partnerIdentity.zip,
                                    'typ:dic': input.partnerIdentity.dic,
                                },
                            },
                        },
                        'inv:invoiceDetail': invoiceItems,
                    },
                },
            },
        };
        /* eslint-enable @typescript-eslint/naming-convention */

        return builder.build(invoice);
    }

    private checkResponseForErrors(response: IResponse): string | null {
        const responseStatus = response.responsePack.responsePackItem;

        if (responseStatus.state === 'error') {
            return responseStatus.note as string;
        }

        const responseItems = (responseStatus.invoiceResponse as IOutput).importDetails.detail;

        for (const responseItem of responseItems) {
            if (responseItem.state === 'error') {
                return responseItem.note;
            }
        }

        return null;
    }

    private convertResponseToUtf8(bufferedText: Buffer): string {
        return this.windowsTextDecoder.decode(bufferedText);
    }

}

type PohodaVatRate = 'high' | 'low' | 'none' | 'third'; // 21% | 15% | 0% | 10%
type PohodaInvoiceType = 'issuedInvoice' | 'receivedInvoice';
type PohodaPaymentType = 'advance' | 'cash' | 'cheque' | 'compensation' | 'creditcard' | 'delivery' | 'draft' | 'encashment' | 'postal';

interface PartnerIdentity {
    company: string;
    name: string;
    city: string;
    street: string;
    zip: string;
    dic: string;
    ico: string;
}

interface IInvoiceItem {
    text: string;
    note: string;
    quantity: number;
    payVat: boolean;
    unitPrice: number;
    price: number;
    rateVat: PohodaVatRate;
    priceVat?: number;
}

export interface IInput {
    invoiceType: PohodaInvoiceType;
    invoiceNumber: string;
    dueDate: string;
    taxDate: string;
    accountingDate: string;
    createdAt: string;
    text: string;
    paymentType: PohodaPaymentType;
    partnerIdentity: PartnerIdentity;
    invoiceItems: IInvoiceItem[];
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponseImportDetail {
    state: 'error' | 'warning';
    errno: number;
    note: string;
    XPath: string;
    valueProduced?: string;
    valueRequested?: string;
}

export interface IOutput {
    importDetails: {
        detail: IResponseImportDetail[];
    };
    producedDetails: {
        id: string;
        number: string;
        actionType: string;
        itemDetails: {
            item: {
                actionType: string;
                producedItem: {
                    id: string;
                };
            };
        };
    };
}

interface IResponse {
    responsePack: {
        responsePackItem: {
            invoiceResponse?: IOutput;
            state: string;
            note?: string;
        };
    };
}
