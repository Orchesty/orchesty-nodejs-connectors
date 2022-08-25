import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'clickup-get-user-connector';

export default class ClickupGetUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { teamId, userId } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `team/${teamId}/user/${userId}`,
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    teamId: number;
    userId: number;
}

export interface IOutput {
    member: {
        user: {
            id: number;
            username: string;
            email: string;
            initials: string;
            role: number;
            last_active: string;
            date_joined: string;
            date_invited: string;
        };
        invited_by: {
            id: number;
            username: string;
            color: string;
            email: string;
            initials: string;
            profilePicture: string;
        };
        shared: {
            tasks: [];
            lists: [];
            folders: [];
        };
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
