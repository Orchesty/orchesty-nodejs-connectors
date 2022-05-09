import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import logger from 'pipes-nodejs-sdk/dist/lib/Logger/Logger';
import { BASE_URL } from '../HubSpotApplication';

export default class HubSpotCreateContactConnector extends AConnector {
  public getName = (): string => 'hub-spot-create-contact';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);

    const request = await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${BASE_URL}/contacts/v1/contact/`,
      dto.data,
    );
    request.debugInfo = dto;

    const response = await this._sender.send(request);

    const message = response.jsonBody as { validationResults: [{ message: string }] };
    this.evaluateStatusCode(response, dto, message.validationResults[0].message);

    if (response.responseCode === 409) {
      const parsed = response.jsonBody as { identityProfile: { identity: [{ value: string }] } };
      logger.error(`Contact "${parsed.identityProfile.identity[0].value ?? ''}" already exist.`, dto);
    }

    dto.data = response.body;
    return dto;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public processEvent = (dto: ProcessDto): ProcessDto => {
    throw Error('ProcessEvent is not implemented');
  };
}
