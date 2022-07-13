import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import GmailApplication from '../GmailApplication';

export const NAME = 'gmail-get-profile';
const GET_PROFILE_ENDPOINT = 'gmail/v1/users/{userId}/profile';

export default class GmailGetProfile extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
          dto.jsonData as Record<string, unknown>,
          ['userId'],
    );

    const { userId } = dto.jsonData as { userId: string };

    const application = this._application as GmailApplication;
    const applicationInstall = await this._getApplicationInstallFromProcess(dto);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.GET,
      GET_PROFILE_ENDPOINT.replace('{userId}', userId),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
