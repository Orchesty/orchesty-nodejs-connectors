import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'quick-books-update-item-connector';

export default class QuickBooksUpdateItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto<IInput>): Promise<ProcessDto> {
    const dto = _dto;

    dto.jsonData = (await this._sender.send<IResponse>(
      await this._application.getRequestDto(
        dto,
        await this._getApplicationInstallFromProcess(dto),
        HttpMethods.POST,
        '/item',
        dto.jsonData,
      ),
      [200],
    )).jsonBody.Item;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  Id: string,
  SyncToken: string,
  Name: string,
  Type?: string,
  QtyOnHand?: number,
  TrackQtyOnHand?: boolean,
  InvStartDate?: string,
  IncomeAccountRef: {
    name: string,
    value: string
  },
  AssetAccountRef?: {
    name: string,
    value: string
  },
  ExpenseAccountRef?: {
    name: string,
    value: string
  },
  PurchaseCost?: number,
  Taxable?: boolean,
  Active?: boolean,
  UnitPrice?: number,
  PurchaseDesc?: string,
  Description?: string
}

export interface IOutput {
  FullyQualifiedName: string,
  domain: string,
  Id: string,
  Name: string,
  TrackQtyOnHand: boolean,
  UnitPrice: number,
  PurchaseCost: number,
  QtyOnHand: number,
  IncomeAccountRef: {
    name: string,
    value: string
  },
  AssetAccountRef: {
    name: string,
    value: string
  },
  Taxable: boolean,
  sparse: boolean,
  Active: boolean,
  SyncToken: string,
  InvStartDate: string,
  Type: string,
  ExpenseAccountRef: {
    name: string,
    value: string
  },
  MetaData: {
    CreateTime: string,
    LastUpdatedTime: string
  }
}

interface IResponse {
  Item: IOutput,
  time: string
}
/* eslint-enable @typescript-eslint/naming-convention */