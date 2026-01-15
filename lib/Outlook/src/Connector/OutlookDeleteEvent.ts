import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'outlook-delete-event';

export default class OutlookDeleteEvent extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<{ id: string }>): Promise<ProcessDto> {
        const { id } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.DELETE,
            `/me/events/${id}`,
        );
        const resp = await this.getSender().send(req, [204]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}
