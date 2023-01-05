import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BASE_URL } from '../HubSpotApplication';

export default class HubSpotAddEmailToListConnector extends AConnector {

    public getName(): string {
        return 'hub-spot-add-email-to-list';
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { listId, ...data } = dto.getJsonData();

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/contacts/v1/lists/${listId}/add`,
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [200, 409]);

        dto.setData(response.getBody());

        return dto;
    }

}

export interface IInput {
    listId: number;
    emails?: string[];
    vids?: number[];
}
