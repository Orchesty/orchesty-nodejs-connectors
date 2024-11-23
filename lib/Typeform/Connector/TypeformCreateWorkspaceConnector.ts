import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'typeform-create-workspace-connector';

export default class TypeformCreateWorkspaceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'workspaces';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    name: string;
}

export interface IOutput {
    forms: {
        count: number;
        href: string;
    };
    id: string;
    name: string;
    self: {
        href: string;
    };
    shared: boolean;
    account_id: string;
    members: {
        email: string;
        name: string;
        role: string;
    }[];
}
