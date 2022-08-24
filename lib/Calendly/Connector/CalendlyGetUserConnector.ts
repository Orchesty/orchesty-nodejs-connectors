import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'calendly-get-user-connector';

export default class CalendlyGetUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { uuid } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `users/${uuid}`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    uuid: string;
}

export interface IOutput {
    resource: {
        uri: string;
        name: string;
        slug: string;
        email: string;
        scheduling_url: string;
        timezone: string;
        avatar_url: string;
        created_at: Date;
        updated_at: Date;
        current_organization: string;
    };
}
