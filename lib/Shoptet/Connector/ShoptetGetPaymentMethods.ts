import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'shoptet-get-payment-methods';

export default class ShoptetGetPaymentMethods extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'api/payment-methods',
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    data: {
        paymentMethods: {
            guid: string;
            name: string;
            description: string;
            submethod: string;
            paymentType: {
                id: number;
                code: string;
                name: string;
            };
            visible: boolean;
            priority: number;
            wholesale: boolean;
            logoUrl: string;
            eetEligible: boolean;
        }[];
        wholesaleActive: boolean;
        defaultRetailMethod: string;
        defaultWholesaleMethod: string;
    };
    errors: {
        errorCode: string;
        message: string;
        instance: string;
    }[];
}
