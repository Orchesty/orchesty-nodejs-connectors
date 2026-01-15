import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'woo-commerce-get-payment-gateways';

export default class WooCommerceGetPaymentGateways extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            'wp-json/wc/v3/payment_gateways',
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export type IOutput = IPaymentMethod[];

/* eslint-disable @typescript-eslint/naming-convention */
export interface IPaymentMethod {
    id: string;
    title: string;
    description: string;
    order: number;
    enabled: boolean;
    method_title: string;
    method_description: string;
    method_supports: string[];
    settings: {
        title: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
        };
        instructions: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
        };
    };
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
