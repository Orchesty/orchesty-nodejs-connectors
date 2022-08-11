import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'bulk-gate-get-promotional-sms-connector';

export default class BulkGateGetPromotionalSMSConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto<IInput>): Promise<ProcessDto> {
    const dto = _dto;

    dto.jsonData = (await this._sender.send<IResponse>(
      await this._application.getRequestDto(
        dto,
        await this._getApplicationInstallFromProcess(dto),
        HttpMethods.POST,
        'promotional',
        dto.jsonData,
      ),
      [200],
    )).jsonBody.data.response;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  number: string;
  text: string;
  unicode?: boolean;
  sender_id?: string;
  sender_id_value?: string;
  country?: string;
  schedule?: string;
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
  data: {
    response: IOutput[];
    total: {
      price: number;
      status: {
        accepted: number;
        blacklisted: number;
        error: number;
        invalid_number: number;
        invalid_sender: number;
        scheduled: number;
        sent: number;
      }
    };
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
