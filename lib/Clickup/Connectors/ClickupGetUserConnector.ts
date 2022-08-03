import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'clickup-get-user-connector';

export default class ClickupGetUserConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const { teamId, userId } = dto.jsonData as IInput;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `team/${teamId}/user/${userId}`,
    );

    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    teamId: number,
    userId: number
}

export interface IOutput {
    member: {
        user: {
            id: number,
            username: string,
            email: string,
            initials: string,
            role: number,
            last_active: string,
            date_joined: string,
            date_invited: string
        },
        invited_by: {
            id: number,
            username: string,
            color: string,
            email: string,
            initials: string,
            profilePicture: string
        },
        shared: {
            tasks: [],
            lists: [],
            folders: []
        }
    }
}
/* eslint-enable @typescript-eslint/naming-convention */
