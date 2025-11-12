import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { BASE_URL, NAME as APPLICATION_NAME } from '../GoogleCloudLoggingApplication';
import { EntryListBatchRequest } from '../types/request.types';
import { EntryListBatchResponse } from '../types/response.types';

export const NAME = `${APPLICATION_NAME}-get-entry-list-batch`;

export default class GoogleCloudLoggingGetEntryListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<EntryListBatchRequest>): Promise<BatchProcessDto> {
        const cursor = dto.getBatchCursor();

        const pageToken = !cursor ? undefined : cursor;

        const body = { ...dto.getJsonData(), pageToken };

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `${BASE_URL}/v2/entries:list`,
            body,
        );

        const responseDto = await this.getSender().send<EntryListBatchResponse>(requestDto, [200]);
        const response = responseDto.getJsonBody();

        const items = response?.entries ?? [];

        dto.setItemList(items);

        const { nextPageToken } = response;

        if (items.length && nextPageToken) {
            dto.setBatchCursor(nextPageToken);
        }

        return dto;
    }

}
