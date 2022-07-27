import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'go-balik-order-list-connector';

export default class GObalikOrderListConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const { from, to, id } = dto.jsonData as IInput;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `order?${from}=&${to}=&${id}=`,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  from: string,
  to: string,
  id: string
}

export interface IOutput {
  hash: string,
  id: string,
  pack_number: string,
  price: number,
  pick_up_date: string,
  carrier_name: string,
  reference_number: string
}
/* eslint-enable @typescript-eslint/naming-convention */
