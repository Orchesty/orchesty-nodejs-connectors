import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { IOutput } from '../Connector/JsonPlaceholderGetPostConnector';
import JsonPlaceholderApplication, { filterToQueryParamString, NAME as JSON_PLACEHOLDER_APP_NAME } from '../JsonPlaceholderApplication';

export const NAME = `${JSON_PLACEHOLDER_APP_NAME}-get-post-list-batch`;

export default class JsonPlaceholderGetPostListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(
        dto: BatchProcessDto<IInput>,
    ): Promise<BatchProcessDto> {
        const filter = dto.getJsonData();
        const params = filterToQueryParamString(
            ['id', 'userId', 'title'],
            filter as Record<string, string | number | boolean>,
        );

        const request
            = this.getApplication<JsonPlaceholderApplication>().getRequestDtoWithoutInstallation(
                dto,
                HttpMethods.GET,
                `/posts${params}`,
            );
        const posts = (
            await this.getSender().send<IOutput[]>(request)
        ).getJsonBody();

        return this.resultAsBatch ? dto.addItem(posts) : dto.setItemList(posts);
    }

}

export interface IInput {
    id?: number;
    userId?: number;
    title?: string;
}
