import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import { BASE_URL } from '../HubSpotApplication';

export default class HubSpotCreateContactConnector extends AConnector {
  public getName = (): string => 'hub-spot-create-contact';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const applicationInstall = await this._getApplicationInstallFromProcess(dto);

    const request = await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${BASE_URL}/crm/v3/objects/contacts`,
      dto.data,
    );

    const response = await this._sender.send(request, [201, 409]);

    if (response.responseCode === 409) {
      const email = dto.jsonData as {properties: {email: string} };
      logger.error(`Contact "${email}" already exist.`, dto);
    }

    dto.data = response.body;
    return dto;
  }
}
