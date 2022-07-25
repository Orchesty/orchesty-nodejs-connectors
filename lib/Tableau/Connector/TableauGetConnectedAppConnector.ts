import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'tableau-get-connected-app-connector';

export default class TableauGetConnectedAppConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { siteId, clientId } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `sites/${siteId}/connected-applications/${clientId}`,
      dto.jsonData,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput {
    siteId: string,
    clientId: string
}

export interface IResponse {
    connectedApplication: IOutput,
    secret: {
        id: string,
        createdAt: string
    }

}

export interface IOutput {
    name: string,
    enabled: true,
    clientId: string,
    projectId: string,
    createdAt: string,
    unrestrictedEmbedding: false
}
