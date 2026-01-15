import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABaseServantSoapBatch from './ABaseServantSoapBatch';

export const NAME = 'servant-get-inventory';

export default class ServantGetInventory extends ABaseServantSoapBatch {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        return this.callSOAP<IOutput[]>(
            dto,
            'GetInventory',
            'inventoryItems',
            {},
        );
    }

    protected processDataAfterRequest(data: IOutput[]|undefined): IOutput[] {
        const processData: IOutput[] = [];
        data?.forEach((item) => {
            const index = processData.findIndex((line) => line.item.code === item.item.code);
            if (index >= 0) {
                processData[index].count += item.count;
            } else {
                processData.push(item);
            }
        });

        return processData;
    }

}

export interface IOutput {
    item: IItem;
    count: number;
    group: string;
    eans: {
        items: IEan[];
    };
    movement: Date;
}

export interface IItem {
    code: string;
    name: string;
    attributes: string[];
    expiration: Date;
    batch: string;
    unit: string;
}

interface IEan {
    ean: string;
    count: number;
    weight: number;
    dimension: {
        x: number;
        y: number;
        z: number;
    };
    velocity: number;
    primary: boolean;
}
