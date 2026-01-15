import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseServantSoapConnector from './ABaseServantSoapConnector';

export const NAME = 'servant-get-carriers';

export default class ServantGetCarriers extends ABaseServantSoapConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput[]>> {
        return this.callSOAP<IOutput[]>(
            dto,
            'GetCarriers',
            'carrierItems',
            null,
            true,
        );
    }

}

export interface IOutput {
    id: string;
    name: string;
}
