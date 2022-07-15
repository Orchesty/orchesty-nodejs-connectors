import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'quick-books-create-item-connector';

export default class QuickBooksCreateItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      '/item',
dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput {
  /* eslint-disable @typescript-eslint/naming-convention */
  TrackQtyOnHand: true,
  Name: string,
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
export interface IOutput{
  /* eslint-disable @typescript-eslint/naming-convention */
  Item: {
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
  },
  time: string
  /* eslint-enable @typescript-eslint/naming-convention */
}
