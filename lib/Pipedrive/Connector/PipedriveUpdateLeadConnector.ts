import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'pipedrive-update-lead-connector';

export default class PipedriveUpdateLeadConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { id, ...body } = dto.getJsonData();

        return dto.setJsonData((await this.getSender().send<IResponse>(
            await this.getApplication().getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.PATCH,
                `/leads/${id}`,
                body,
            ),
            [200],
        )).getJsonBody().data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string;
    is_archived: boolean;
    title?: string;
    person_id?: number;
    organization_id?: number;
    label_ids?: string[];
    owner_id?: number;
    value?: unknown;
    expected_close_date?: Date;
    visible_to?: 1 | 3 | 5 | 7;
    was_seen?: boolean;
}

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
    data: IOutput;
}

/* eslint-enable @typescript-eslint/naming-convention */
