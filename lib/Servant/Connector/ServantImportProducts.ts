import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseServantSoapConnector from './ABaseServantSoapConnector';

export const NAME = 'servant-import-products';

export default class ServantImportProducts extends ABaseServantSoapConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        return this.callSOAP<IOutput>(
            dto,
            'ImportProducts',
            'importRequestResult',
            dto.getJsonData(),
        );
    }

}

export interface IInput {
    warehouse: string;
    products: IImportProduct[];
}

export interface IImportProduct {
    id: IImportItemId;
    details: IImportProductItemDetails;
    eans: IImportProductEan[];
    activities: IImportProductActivity[];
}

export interface IImportItemId {
    code: string;
    attributes: string[];
}

interface IImportProductItemDetails {
    name: string;
    shortName: string;
    description: string;
    unit: string;
    type: string;
    group: string;
    note: string;
    notePrint: string;
    fifo: boolean;
    supplierCode: string;
}

interface IImportProductEan {
    ean: string;
    count: number;
    eanCount: number;
    countToPlacement: number;
    expandability: number;
    weight: number;
    dimension: {
        x: number;
        y: number;
        z: number;
    };
    velocity: number;
    primary: boolean;
}

interface IImportProductActivity {
    idDetails: IImportItemIdDetails;
    activity: IImportActivity;
}

export interface IImportItemIdDetails {
    expiration: Date;
    batch: string;
}

export interface IImportActivity {
    checkExpiration: boolean;
    checkBatch: boolean;
    checkSerialNumbers: boolean;
    printLabel: boolean;
    labels: {
        type: number;
        specification: string;
    }[];
    services: string[];
    documentsType: string;
}

export interface IOutput {
    transactionId: string;
    success: true;
    resultCode: number;
    result: string;
    infoText: string;
}
