import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import GoogleCalendarApplication from '../../GoogleCalendar/GoogleCalendarApplication';

export const NAME = 'gmail-get-profile';
const GET_PROFILE_ENDPOINT = 'gmail/v1/users/{userId}/profile';

export default class GmailGetProfile extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
          dto.jsonData as Record<string, unknown>,
          ['userId', 'userName'],
    );

    const { userId, userName } = dto.jsonData as { userId: string, userName: string };

    const application = this._application as GoogleCalendarApplication;
    const applicationInstall = await this._getApplicationInstall(userName);

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
