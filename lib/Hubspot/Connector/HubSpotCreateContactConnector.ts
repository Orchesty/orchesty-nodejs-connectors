import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { BASE_URL } from '../HubSpotApplication';

export default class HubSpotCreateContactConnector extends AConnector {

    public getName(): string {
        return 'hub-spot-create-contact';
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = dto.getJsonData();

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/crm/v3/objects/contacts`,
            JSON.stringify({
                properties: {
                    company: data['properties']?.['company'],
                    email: data['properties']?.['email'],
                    firstname: data['properties']?.['firstname'],
                    lastname: data['properties']?.['lastname'],
                    phone: data['properties']?.['phone'],
                },
            }),
        );

        const response = await this.getSender().send(request, [201, 409]);

        if (response.getResponseCode() === StatusCodes.CONFLICT) {
            const email = dto.getData();
            logger.error(`Contact "${email}" already exist.`, dto);
        }

        dto.setData(response.getBody());

        return dto;
    }

}

export interface IInput {
    properties: {
        email: string;
    };
}
