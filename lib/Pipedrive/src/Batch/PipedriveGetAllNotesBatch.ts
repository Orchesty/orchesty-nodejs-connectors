import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'pipedrive-get-all-notes-batch';

export default class PipedriveGetAllNotesBatch extends ABatchNode {

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
                    `/notes?${params}`,
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
    id: number;
    active_flag: boolean;
    add_time: string;
    content: string;
    deal: {
        title: string;
    };
    lead_id: string;
    deal_id: number;
    last_update_user_id: number;
    org_id: number;
    organization: {
        name: string;
    };
    person: {
        name: string;
    };
    person_id: number;
    project_id: number;
    project: {
        title: string;
    };
    pinned_to_lead_flag: boolean;
    pinned_to_deal_flag: boolean;
    pinned_to_organization_flag: boolean;
    pinned_to_person_flag: boolean;
    pinned_to_project_flag: boolean;
    update_time: string;
    user: {
        email: string;
        icon_url: string;
        is_you: boolean;
        name: string;
    };
    user_id: number;
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
