import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import GoogleCalendarApplication from '../GoogleCalendarApplication';

const GOOGLE_CALENDAR_ADD_EVENT = '/calendar/v3/calendars/calendar.id/events';

interface IGoogleCalendarEvent {
    start: string;
    end: string;
    timeZone: string;
    summary: string;
    calenderId: string;
}

export const NAME = 'google-calendar-add-event';

export default class GoogleCalendarAddEventConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IGoogleCalendarEvent>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['start', 'end', 'timeZone', 'summary', 'calenderId'],
        );

        const {
            start,
            end,
            timeZone,
            summary,
            calenderId,
        } = dto.getJsonData();

        const application = this.getApplication<GoogleCalendarApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

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

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}
