import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'ceska-posta-get-send-parcels-connector';

export default class CeskaPostaGetSendParcelsConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { idTransaction } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `sendParcels/idTransaction/${idTransaction}`,
      dto.jsonData,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    idTransaction: string
}

export interface IOutput {
    StatusResponseList: {
        responseCode: number,
        responseText: string
    }[],
    ResultSendParcelsList: {
        recordNumber: string,
        parcelCode: string,
        parcelStateResponse: {
            responseCode: number,
            responseText: string
        }[]
    }[]
}

/* eslint-enable @typescript-eslint/naming-convention */
