import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mall-put-orders-connector';

export default class MallPutOrdersConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { id, ...body } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      `orders/${id}`,
      body,
    );
    await this._sender.send(req, [200]);
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput{
  id: string,
  confirmed: boolean,
  status: string,
  first_delivery_attempt: string,
  delivered_at: string,
  tracking_number: string,
  tracking_url: string

}
/* eslint-enable @typescript-eslint/naming-convention */
