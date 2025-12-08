import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { IOutput } from '../Connector/JsonPlaceholderGetCommentConnector';
import JsonPlaceholderApplication, { filterToQueryParamString, NAME as JSON_PLACEHOLDER_APP } from '../JsonPlaceholderApplication';

export const NAME = `${JSON_PLACEHOLDER_APP}-get-comment-list-batch`;

export default class JsonPlaceholderGetCommentListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(
        dto: BatchProcessDto<IInput>,
    ): Promise<BatchProcessDto> {
        const filter = dto.getJsonData();
        const params = filterToQueryParamString(
            ['id', 'postId', 'name', 'email'],
            filter as Record<string, string | number | boolean>,
        );

        const request
            = this.getApplication<JsonPlaceholderApplication>().getRequestDtoWithoutInstallation(
                dto,
                HttpMethods.GET,
                `/comments${params}`,
            );

        const comments = (
            await this.getSender().send<IOutput[]>(request)
        ).getJsonBody();

        return this.resultAsBatch
            ? dto.addItem(comments)
            : dto.setItemList(comments);
    }

}

export interface IInput {
    id?: number;
    postId?: number;
    name?: string;
    email?: string;
}
