import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'paypal-create-product-connector';

export default class PaypalCreateProductConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'v1/catalogs/products';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    name: string;
    description: string;
    type: string;
    category: string;
    image_url: string;
    home_url: string;
}

export interface IOutput {
    id: string;
    name: string;
    description: string;
    type: string;
    category: string;
    image_url: string;
    home_url: string;
    create_time: Date;
    update_time: Date;
    links: {
        href: string;
        rel: string;
        method: string;
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
