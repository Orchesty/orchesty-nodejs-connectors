import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'go-balik-order-deatil-connector';

export default class GObalikOrderDetailConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const { hash } = dto.jsonData as IInput;
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `order/${hash}`,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput{
  hash: string
}

export interface IOutput {
  hash: string,
  id: string,
  pack_number: string,
  price: number,
  pick_up_date: string,
  sender: {
    first_name: string,
    last_name: string,
    company: string,
    street: string,
    city: string,
    zip: string,
    state: string,
    email: string,
    phone: string
  }[],
  recipient: {
    first_name: string,
    last_name: string,
    company: string,
    street: string,
    city: string,
    zip: string,
    state: string,
    email: string,
    phone: string
  }[],
  COD: number,
  additional_insurance: number,
  carrier_name: string,
  reference_number: string,
  note: string,
  packet: {
    weight: number,
    width: number,
    height: number,
    length: number
  }[],
  tracker_url: string
}
/* eslint-enable @typescript-eslint/naming-convention */
