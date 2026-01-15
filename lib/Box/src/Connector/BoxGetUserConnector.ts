import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'box-get-user-connector';

export default class BoxGetUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { user_id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `users/${user_id}`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    user_id: string;
}

export interface IOutput {
    id: number;
    type: string;
    address: string;
    avatar_url: string;
    created_at: Date;
    job_title: string;
    language: string;
    login: string;
    max_upload_size: number;
    modified_at: Date;
    name: string;
    notification_email: {
        email: string;
        is_confirmed: boolean;
    };
    phone: number;
    space_amount: number;
    space_used: number;
    status: string;
    timezone: string;
}
