import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import GoogleCalendarApplication from '../GoogleCalendarApplication';

const GOOGLE_CALENDAR_ADD_EVENT = '/calendar/v3/calendars/calendar.id/events';

interface IGoogleCalendarEvent {
  start: string,
  end: string,
  timeZone: string,
  summary: string,
  calenderId: string,
}

export default class GoogleDriveUploadFileConnector extends AConnector {
  public getName = (): string => 'google-calendar-add-event';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
        dto.jsonData as Record<string, unknown>,
        ['start', 'end', 'timeZone', 'summary', 'calenderId'],
    );

    const {
      start,
      end,
      timeZone,
      summary,
      calenderId,
    } = dto.jsonData as IGoogleCalendarEvent;

    const application = this._application as GoogleCalendarApplication;
    const applicationInstall = await this._getApplicationInstall(dto.user);

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
