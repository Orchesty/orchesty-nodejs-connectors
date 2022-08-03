import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export default abstract class AShoptetConnector extends AConnector {
  protected async _doRequest(url: string, dto: ProcessDto): Promise<unknown> {
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const requestDto = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const resp = await this._sender.send(requestDto, [200]);

    return resp.jsonBody;
  }
}
