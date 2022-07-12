import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'quick-books-create-item-connector';

export default class QuickBooksCreateItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = JSON.stringify({ data: dto.jsonData });

    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, '/item', body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IRecordResp;

    return dto;
  }
}

export interface IRecordResp {
  /* eslint-disable @typescript-eslint/naming-convention */
  TrackQtyOnHand: true,
  Name: number,
  QtyOnHand: string,
  IncomeAccountRef: {
    name: string,
    value: string
  },
  AssetAccountRef: {
    name: string,
    value: string
  },
  InvStartDate: string,
  Type: string,
  ExpenseAccountRef: {
    name: string,
    value: string
    /* eslint-enable @typescript-eslint/naming-convention */
  }
}
