import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'go-balik-create-order-connector';

export default class GObalikCreateOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'order/',
            dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    hash: string
}

export interface IOutput {
    sender: [
        {
            first_name: string,
            last_name: string,
            company: string,
            street: string,
            city: string,
            zip: string,
            state: string,
            email: string,
            phone: string
        }
    ],
    recipient: [
        {
            first_name: string,
            last_name: string,
            company: string,
            street: string,
            city: string,
            zip: string,
            state: string,
            email: string,
            phone: string
        }
    ],
    pick_up_date: string,
    deliver_id: number,
    reference_number: string,
    postponed: boolean,
    note: string,
    cod: number,
    cod_bank_account: string,
    cod_bank_code: string,
    cod_bank_account_eur: string,
    cod_bank_code_eur: string,
    cod_bank_vs: string,
    insurance: number,
    dispensing_point: string,
    delivery_point: string,
    weight: number,
    width: number,
    height: number,
    length: number
}
/* eslint-enable @typescript-eslint/naming-convention */
