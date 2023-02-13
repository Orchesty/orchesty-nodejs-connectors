import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { COMPANY_ID } from '../PohodaApplication';

export const NAME = 'pohoda-create-invoice-conector';

export default class PohodaCreateInvoiceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const xmlData = this.createXml(dto.getJsonData());

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const companyId = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][COMPANY_ID];
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'xml',
            xmlData,
        );
        const resp = await this.getSender().send(req, [200]);

        const parser = new XMLParser();
        const responseJson = parser.parse(resp.getBody()) as IOutput;

        // todo check for pohoda validation error
        const error = this.checkResponseForErrors(responseJson);

        if (error) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, error.note);
        }

        return dto.setNewJsonData<IOutput>(responseJson);
    }

    private createXml(input: IInput): string {
        const builder = new XMLBuilder({});

        // todo prepend ico - companyId
        // <?xml version="1.0" encoding="Windows-1250"?>
        // <dat:dataPack xmlns:dat="http://www.stormware.cz/schema/version_2/data.xsd" xmlns:typ="http://www.stormware.cz/schema/version_2/type.xsd" xmlns:inv="http://www.stormware.cz/schema/version_2/invoice.xsd" version="2.0" id="Usr1" application="POHODA" ico="12345678" note="Nova faktura">
        //   <dat:dataPackItem version="2.0" id="Usr1">

        // todo append
        // </dat:dataPackItem>
        // </dat:dataPack>

        /* eslint-disable @typescript-eslint/naming-convention */
        const invoiceItems = input.invoiceItems.map((item) => ({
            'inv:text': item.text,
            'inv:note': item.note,
            'inv:quantity': item.quantity,
            'inv:payVAT': item.payVat,
            'inv:homeCurrency': {
                'typ:unitPrice': item.unitPrice,
                'typ:price': item.price,
                'typ:priceVat': item.priceVat,
            },
        }));

        const invoice = {
            'inv:invoice': {
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
        };
        /* eslint-enable @typescript-eslint/naming-convention */

        return builder.build(invoice);
    }

    private checkResponseForErrors(response: IOutput): IResponseImportDetail | null {
        const responseItems = response.responsePack.responsePackItem.invoiceResponse.importDetails.detail;

        for (const responseItem of responseItems) {
            if (responseItem.state === 'error') {
                return responseItem;
            }
        }

        return null;
    }

}

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
    rateVAT: 'high' | 'low' | 'none' | 'third'; // 21% | 15% | 0% | 10%
    priceVat?: number;
}

export interface IInput {
    invoiceType: 'issuedInvoice' | 'receivedInvoice';
    invoiceNumber: string;
    dueDate: string;
    taxDate: string;
    accountingDate: string;
    createdAt: string;
    text: string;
    paymentType: 'cash';
    partnerIdentity: PartnerIdentity;
    invoiceItems: IInvoiceItem[];
}

interface IResponseImportDetail {
    state: 'error' | 'warning';
    errno: number;
    note: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XPath: string;
    valueProduced?: string;
    valueRequested?: string;
}

export interface IOutput {
    responsePack: {
        responsePackItem: {
            invoiceResponse: {
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
            };
        };
    };
}
