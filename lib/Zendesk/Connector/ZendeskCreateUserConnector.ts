import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'zendesk-create-user-connector';

export default class ZendeskCreateUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, '/users.json', body);
        const resp = await this.getSender().send<IResponse>(req, [201]);

        const data = resp.getJsonBody();

        return dto.setNewJsonData(data.user);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    user: IOutput;
}

export interface IOutput {
    custom_role_id: number;
    email: string;
    id: number;
    name: string;
    organization_id: number;
    role: string;
    role_type: number;
}

export interface IInput {
    user: {
        name: string;
        email: string;
        custom_role_id?: number;
        identities?: [
            {
                type: string;
                value: string;
            },
        ];
        organization?: {
            name: string;
        };
        role?: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
