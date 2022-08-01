import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'calendly-get-user-connector';

export default class CalendlyGetUserConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { uuid } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `users/${uuid}`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.GET, url);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
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
