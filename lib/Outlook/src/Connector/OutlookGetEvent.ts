import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { StatusCodes } from 'http-status-codes';
import { IInput as IEvent } from './OutlookCreateEvent';

export const NAME = 'outlook-get-event';

export default class OutlookGetEvent extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IEvent>> {
        const { id } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `/me/events/${id}`,
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IEvent>(req, [200, 404]);
        if (resp.getResponseCode() === StatusCodes.NOT_FOUND) {
            return dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Event not found');
        }

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    id?: string;
}
