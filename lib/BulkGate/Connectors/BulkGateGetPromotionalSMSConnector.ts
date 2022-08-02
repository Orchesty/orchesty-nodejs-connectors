import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'bulk-gate-get-promotional-sms-connector';

export default class BulkGateGetPromotionalSMSConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'promotional',
            dto.jsonData as IInput,
    );

    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    number: string,
    text: string,
    unicode: boolean,
    sender_id: string,
    sender_id_value: string,
    country: string,
    schedule: string
}

export interface IOutput {
    data: {
        total: {
            price: number,
            status: {
                sent: number,
                accepted: number,
                scheduled: number,
                error: number
            }
        },
        response:
            {
                status: string,
                sms_id: string,
                price: number,
                credit: number,
                number: string
            }[],
    }
}

/* eslint-enable @typescript-eslint/naming-convention */
