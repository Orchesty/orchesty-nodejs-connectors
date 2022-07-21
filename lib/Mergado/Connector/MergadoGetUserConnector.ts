import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mergado-get-user-connector';

export default class MergadoGetUserConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { id } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `users/${id}/`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.GET, url);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    id: string;
}

export interface IOutput {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    username: string;
    email: string;
    city: string;
    company: string;
    country: string;
    dic: string;
    ico: string;
    invoice_months: number;
    last_access: Date;
    locale: string;
    postcode: string;
    registered_at: Date;
    street: string;
    timezone: string;
    send_summary: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
