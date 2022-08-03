import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'ceska-posta-parcel-status-connector';

export default class CeskaPostaParcelStatusConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'parcelStatus',
            dto.jsonData as IInput,
    );

    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    parcelIds: string [],
    language: string
}

export interface IOutput {
    detail: {
        idParcel: string,
        parcelType: string,
        weight: string,
        amount: string,
        currency: string,
        parcelsQuantity: string,
        depositTo: string,
        timeDeposit: string,
        countryOfOrigin: string,
        countryOfDestination: string,
        parcelStatuses: {
            id: string,
            date: string,
            text: string,
            postCode: string,
            name: string
        }[]
    } []
}

/* eslint-enable @typescript-eslint/naming-convention */
