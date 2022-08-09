import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'box-get-user-connector';

export default class BoxGetUserConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_id } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `users/${user_id}`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.GET, url);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
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
