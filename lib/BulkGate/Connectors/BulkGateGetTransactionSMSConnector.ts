import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'bulk-gate-get-transaction-sms-connector';

export default class BulkGateGetTransactionSMSConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto<IInput>): Promise<ProcessDto> {
    const dto = _dto;

    dto.jsonData = (await this._sender.send<IResponse>(
      await this._application.getRequestDto(
        dto,
        await this._getApplicationInstallFromProcess(dto),
        HttpMethods.POST,
        'transactional',
        dto.jsonData,
      ),
      [200],
    )).jsonBody.data;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  number: string;
  text: string;
  sender_id?: string;
  sender_id_value?: string;
  country?: string;
  unicode?: boolean;
}

export interface IOutput {
  status: string;
  part_id: string[];
  number: string;
  channel: string;
  sms_id: string;
  price: number;
  credit: number;
}

interface IResponse {
  data: IOutput;
}
/* eslint-enable @typescript-eslint/naming-convention */
