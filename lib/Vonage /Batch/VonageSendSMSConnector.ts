import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { API_KEY } from '../VonageApplication';

export const NAME = 'vonage-send-sms-connector';

export default class VonageSendSMSConnector extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const { from, to } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const apiKey = appInstall.getSettings()[AUTHORIZATION_FORM][API_KEY];
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      `sms/:format?api_key=${apiKey}&from=${from}&to=${to}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.messages ?? []);
    dto.removeBatchCursor();
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

}
/* eslint-enable @typescript-eslint/naming-convention */
