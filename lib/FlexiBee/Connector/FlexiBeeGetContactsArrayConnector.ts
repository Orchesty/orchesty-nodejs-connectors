import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import FlexiBeeApplication from '../FexiBeeApplication';

export default class FlexiBeeGetContactsArrayConnector extends AConnector {
  public getName = (): string => 'flexibee-get-contacts-array';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);

    const application = this._application as FlexiBeeApplication;
    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.GET,
      application.getUrl(applicationInstall, 'kontakt.json'),
    );
    const response = await this._sender.send(request);
    this.evaluateStatusCode(response, dto);
    dto.data = response.body;
    return dto;
  }
}
