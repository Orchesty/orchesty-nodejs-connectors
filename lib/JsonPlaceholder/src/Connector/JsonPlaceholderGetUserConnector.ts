import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import JsonPlaceholderApplication, { NAME as JSON_PLACEHOLDER_APP } from '../JsonPlaceholderApplication';

export const NAME = `${JSON_PLACEHOLDER_APP}-get-user-connector`;

export default class JsonPlaceholderGetUserConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { id } = dto.getJsonData();
        const request
            = this.getApplication<JsonPlaceholderApplication>().getRequestDtoWithoutInstallation(
                dto,
                HttpMethods.GET,
                `/users/${id}`,
            );
        const user = (await this.getSender().send<IOutput>(request)).getJsonBody();

        return dto.setNewJsonData(user);
    }

}

export interface IInput {
    id: number;
}

export interface IOutput {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}
