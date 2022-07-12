import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { REALM_ID } from '../QuickbooksApplication';

export const NAME = 'quick-books-create-item-connector';

export default class QuickBooksCreateItemConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const realmId = appInstall.getSettings()[AUTHORIZATION_FORM][REALM_ID];
    const url = `${realmId}/item`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody;

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
