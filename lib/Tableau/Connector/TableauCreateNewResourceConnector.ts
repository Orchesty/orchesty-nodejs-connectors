import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'tableau-create-new-resource-connector';

export default class TableauCreateNewResourceConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
        dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);
    return dto;
  }
}

export interface IInput {
    user: {
        name: string,
        siteRole: string
    }
}
