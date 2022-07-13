import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'zendesk-create-user-connector';

export default class ZendeskCreateUserConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, '/users.json', body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
  user: {
    custom_role_id: number,
    email: string,
    id: number,
    name: string,
    organization_id: number,
    role: string,
    role_type: number

  }
}

export interface IInput {
  user: {
    name: string,
    email: string,
    custom_role_id?: number,
    identities?: [
      {
        type: string,
        value: string
      }
    ],
    organization?: {
      name: string
    },
    role?: string
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
