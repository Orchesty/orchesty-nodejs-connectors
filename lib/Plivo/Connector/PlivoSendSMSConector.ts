import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { AUTH_ID } from '../PlivoApplication';

export const NAME = 'plivo-send-sms-conector';

export default class PlivoSendSMSConector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const id = appInstall.getSettings()[AUTHORIZATION_FORM][AUTH_ID];
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      `Account/${id}/Message/`,
      dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [202]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
  src: string,
  dst: string,
  text: string,
  url: string
}

export interface IOutput {
  message: string,
  'message_uuid': string[],
  'api_id': string
}

/* eslint-enable @typescript-eslint/naming-convention */
