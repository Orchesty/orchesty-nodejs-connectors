import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'quick-books-update-item-connetcor';

export default class QuickBooksUpdateItemConnetcor extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = JSON.stringify({ dta: dto.jsonData });

    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, '/item', body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IInput;

    return dto;
  }
}

export interface IInput {
  name: string,
}
