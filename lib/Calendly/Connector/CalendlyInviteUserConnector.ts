import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'calendly-invite-user-connector';

export default class CalendlyInviteUserConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { uuid, ...body } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `organizations/${uuid}/invitations`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
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
        status: 'pending' | 'accepted' | 'declined';
        updated_at: Date;
        uri: string;
    }
}

/* eslint-enable @typescript-eslint/naming-convention */
