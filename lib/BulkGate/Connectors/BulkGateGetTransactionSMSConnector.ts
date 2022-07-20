import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'bulk-gate-get-transaction-sms-connector';

export default class BulkGateGetTransactionSMSConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      'transactional',
        dto.jsonData as IInput,
    );

    const resp = await this._sender.send(req, [200]);
    dto.jsonData = (resp.jsonBody as IResponse).data;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    data: IOutput,
    response: [
        {
            status: string,
            sms_id: string,
            price: number,
            credit: number,
            number: string
        },
        {
            status: string,
            sms_id: string,
            price: number,
            credit: number,
            number: string
        },
        {
            status: string,
            code: number,
            error: string,
            number: string
        }
    ]

}

export interface IInput {
    number: string,
    text: string,
    unicode: boolean,
    sender_id: string,
    sender_id_value: string,
    country: string
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

    }
}
/* eslint-enable @typescript-eslint/naming-convention */
