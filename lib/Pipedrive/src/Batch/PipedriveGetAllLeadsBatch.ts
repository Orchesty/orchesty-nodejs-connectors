import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'pipedrive-get-all-leads-batch';

export default class PipedriveGetAllLeadsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const params = new URLSearchParams();
        params.set('start', dto.getBatchCursor('0'));
        params.set('limit', '100');

        const response = (
            await this.getSender().send<IResponse>(
                await this.getApplication().getRequestDto(
                    dto,
                    await this.getApplicationInstallFromProcess(dto),
                    HttpMethods.GET,
                    `/leads?${params}`,
                ),
                [200],
            )
        ).getJsonBody();

        dto.setItemList(response.data);

        if (response.additional_data.pagination.more_items_in_collection) {
            dto.setBatchCursor(
                response.additional_data.pagination.next_start.toString(),
            );
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: string;
    title: string;
    owner_id: number;
    creator_id: number;
    label_ids: string[];
    value: unknown;
    expected_close_date: Date;
    person_id: number;
    organization_id: number;
    is_archived: boolean;
    source_name: string;
    was_seen: boolean;
    next_activity_id: number;
    add_time: Date;
    update_time: Date;
    visible_to: string;
    cc_email: string;
}

interface IResponse {
    success: boolean;
    data: IOutput[];
    additional_data: {
        pagination: {
            start: number;
            limit: number;
            next_start: number;
            more_items_in_collection: boolean;
        };
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
