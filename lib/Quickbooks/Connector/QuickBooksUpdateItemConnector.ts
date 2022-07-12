import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { REALM_ID } from '../QuickbooksApplication';

export const NAME = 'quick-books-update-item-connector';

export default class QuickBooksUpdateItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const realmId = appInstall.getSettings()[AUTHORIZATION_FORM][REALM_ID];
    const url = `${realmId}/item`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput {
  /* eslint-disable @typescript-eslint/naming-convention */
  FullyQualifiedName: string,
  domain: string,
  Id: string,
  Name: string,
  TrackQtyOnHand: boolean,
  Type: string,
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
  MetaData: {
    CreateTime: string,
    LastUpdatedTime: string
  },
  sparse: boolean,
  Active: boolean,
  SyncToken: string,
  InvStartDate: string,
  UnitPrice: number,
  ExpenseAccountRef: {
    name: string,
    value: string
  },
  PurchaseDesc: string,
  Description: string
  /* eslint-enable @typescript-eslint/naming-convention */
}
export interface IOutput{
  /* eslint-disable @typescript-eslint/naming-convention */
  Item: {
    FullyQualifiedName: string,
    domain: string,
    Id: string,
    Name: string,
    TrackQtyOnHand: boolean,
    Type: string,
    PurchaseCost: number,
    QtyOnHand: number,
    IncomeAccountRef: {
      name: string,
      value: string,
    },
    AssetAccountRef: {
      name: string,
      value: string
    },
    Taxable: boolean,
    MetaData: {
      CreateTime: string,
      LastUpdatedTime: string
    },
    sparse: boolean,
    Active: boolean,
    SyncToken: string,
    InvStartDate: string,
    UnitPrice: number,
    ExpenseAccountRef: {
      name: string,
      value: string
    },
    PurchaseDesc: string,
    Description: string
  },
  time: string
  /* eslint-enable @typescript-eslint/naming-convention */
}
