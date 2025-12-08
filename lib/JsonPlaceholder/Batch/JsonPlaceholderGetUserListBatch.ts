import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { IOutput } from '../Connector/JsonPlaceholderGetUserConnector';
import JsonPlaceholderApplication, { filterToQueryParamString, NAME as JSON_PLACEHOLDER_APP } from '../JsonPlaceholderApplication';

export const NAME = `${JSON_PLACEHOLDER_APP}-get-user-list-batch`;

export default class JsonPlaceholderGetUserListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(
        dto: BatchProcessDto<IInput>,
    ): Promise<BatchProcessDto> {
        const filter = dto.getJsonData();
        const params = filterToQueryParamString(
            ['id', 'name', 'username', 'email', 'phone', 'website'],
            filter as Record<string, string | number | boolean>,
        );

        const request
            = this.getApplication<JsonPlaceholderApplication>().getRequestDtoWithoutInstallation(
                dto,
                HttpMethods.GET,
                `/users${params}`,
            );
        const users = (
            await this.getSender().send<IOutput[]>(request)
        ).getJsonBody();

        return this.resultAsBatch ? dto.addItem(users) : dto.setItemList(users);
    }

}

export interface IInput {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    website?: string;
}
