import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'ceska-posta-parcel-printing-connector';

export default class CeskaPostaParcelPrintingConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'parcelPrinting',
          dto.jsonData as IInput,
    );

    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;
    return dto;

    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    printingHeader: {
        customerID: string,
        contractNumber: string,
        idForm: number,
        shiftHorizontal: number,
        shiftVertical: number,
        position: number
    },
    printingData: string []
}

export interface IOutput {
    printingHeaderResult: {
        printingHeader: {
            customerID: string,
            contractNumber: string,
            idForm: number,
            shiftHorizontal: number,
            shiftVertical: number,
            position: number
        },
        printingStatusResponse: {
            responseCode: number,
            responseText: string
        }
    },
    printingDataResult: string
}
