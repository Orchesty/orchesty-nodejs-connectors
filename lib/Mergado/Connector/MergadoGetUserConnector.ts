import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'mergado-get-user-connector';

export default class MergadoGetUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `users/${id}/`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    id: string;
}

export interface IOutput {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    username: string;
    email: string;
    city: string;
    company: string;
    country: string;
    dic: string;
    ico: string;
    invoice_months: number;
    last_access: Date;
    locale: string;
    postcode: string;
    registered_at: Date;
    street: string;
    timezone: string;
    send_summary: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
