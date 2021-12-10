import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import DiscordApplication from '../../Discord/DiscordApplication';

const GOOGLE_CALENDAR_ADD_EVENT = '/calendar/v3/calendars/calendar.id/events';

interface IGoogleCalendarEvent {
  start: string,
  end: string,
  timeZone: string,
  summary: string,
  calenderId: string,
  userName: string,
}

export default class GoogleDriveUploadFileConnector extends AConnector {
  public getName = (): string => 'google-calendar-add-event';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
        dto.jsonData as Record<string, unknown>,
        ['start', 'end', 'timeZone', 'summary', 'userName', 'calenderId'],
    );

    const {
      start,
      end,
      timeZone,
      summary,
      calenderId,
      userName,
    } = dto.jsonData as IGoogleCalendarEvent;

    const application = this._application as DiscordApplication;
    const applicationInstall = await this._getApplicationInstall(userName);

    const data = {
      start: {
        dateTime: start,
        timeZone,
      },
      end: {
        dateTime: end,
        timeZone,
      },
      summary,
    };

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      GOOGLE_CALENDAR_ADD_EVENT.replace('calendar.id', calenderId),
      JSON.stringify(data),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
