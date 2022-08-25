import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'calendly-invite-user-connector';

export default class CalendlyInviteUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { uuid, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `organizations/${uuid}/invitations`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    uuid: string;
    email: string;
}

export interface IOutput {
    resource: {
        created_at: Date;
        email: string;
        last_sent_at: Date;
        organization: string;
        status: 'accepted' | 'declined' | 'pending';
        updated_at: Date;
        uri: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
