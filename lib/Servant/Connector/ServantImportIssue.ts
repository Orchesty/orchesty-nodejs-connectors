import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseServantSoapConnector from './ABaseServantSoapConnector';
import { IImportActivity, IImportItemId, IImportItemIdDetails, IOutput } from './ServantImportProducts';

export const NAME = 'servant-import-issue';

export default class ServantImportIssue extends ABaseServantSoapConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        return this.callSOAP<IOutput>(
            dto,
            'ImportIssue',
            'importRequestResult',
            dto.getJsonData(),
        );
    }

}

export interface IInput {
    warehouse: string;
    issue: IImportIssue;
    files: IImportFile[];
}

export interface IImportIssue {
    partner: IImportPartner;
    details: IImportDetails;
    delivery: IImportDelivery;
    items: IImportItem[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Activities: IImportActivity[];
}

interface IImportPartner {
    code: string;
    title: string;
    name: string;
    surname: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ic_rc: string;
    dic: string;
    street: string;
    city: string;
    zipCode: string;
    countryCode: string;
    phone: string;
    mobile: string;
    email: string;
    note: string;
}

interface IImportDetails {
    order: string;
    invoice: string;
    note: string;
    notePrint: string;
    scannerCheck: boolean;
    carrier: string;
    carrierName: string;
}

interface IImportDelivery {
    dispatch: Date;
    delivery: Date;
    leaveCustomsArea: boolean;
    currency: string;
    insurancePrice: number;
    paymentMethod: string;
    price: number;
    variableSymbol: string;
}

export interface IImportItem {
    id: IImportItemId;
    idDetails: IImportItemIdDetails;
    activities: IImportActivity[];
    count: number;
}

interface IImportFile {
    type: string;
    name: string;
    encodedContent: string;
}
