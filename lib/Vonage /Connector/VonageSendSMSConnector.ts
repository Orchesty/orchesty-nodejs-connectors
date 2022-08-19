import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { API_KEY, API_SECRET } from '../VonageApplication';

export const NAME = 'vonage-send-sms-connector';

export default class VonageSendSMSConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { from, to, text } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const apiKey = appInstall.getSettings()[AUTHORIZATION_FORM][API_KEY];
    const apiSecret = appInstall.getSettings()[AUTHORIZATION_FORM][API_SECRET];
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      `sms/json?api_key=${apiKey}&api_secret=${apiSecret}&from=${from}&to=${to}&type=text&text=${text}`,
    );
    const resp = await this._sender.send(req, [200]);
    const data = resp.jsonBody as IResponse;
    dto.jsonData = data.messages;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse{
  'message-count': string,
  messages: IOutput[]
}

export interface IOutput{
  to: string,
  'message-id': string,
  status: string,
  'remaining-balance': string,
  'message-price': string,
  network: string,
  'client-ref': string,
  'account-ref': string
}

export interface IInput{
  from: string
  to: string
  text: string

}
/* eslint-enable @typescript-eslint/naming-convention */
