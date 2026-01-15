import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import JsonPlaceholderApplication, { NAME as JSON_PLACEHOLDER_APP } from '../JsonPlaceholderApplication';

export const NAME = `${JSON_PLACEHOLDER_APP}-get-post-connector`;

export default class JsonPlaceholderGetPostConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { id } = dto.getJsonData();
        const request
            = this.getApplication<JsonPlaceholderApplication>().getRequestDtoWithoutInstallation(
                dto,
                HttpMethods.GET,
                `/posts/${id}`,
            );
        const post = (await this.getSender().send<IOutput>(request)).getJsonBody();

        return dto.setNewJsonData(post);
    }

}

export interface IInput {
    id: number;
}

export interface IOutput {
    userId: number;
    id: number;
    title: string;
    body: string;
}
