import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'pipedrive-get-lead-connector';

export default class PipedriveGetLeadConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(
        dto: ProcessDto<IInput>,
    ): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        return dto.setNewJsonData(
            (
                await this.getSender().send<IResponse>(
                    await this.getApplication().getRequestDto(
                        dto,
                        await this.getApplicationInstallFromProcess(dto),
                        HttpMethods.GET,
                        `/leads/${id}`,
                    ),
                    [200],
                )
            ).getJsonBody().data,
        );
    }

}

export interface IInput {
    id: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: string;
    title: string;
    owner_id: number;
    creator_id: number;
    label_ids: string[];
    person_id: number;
    organization_id: number;
    source_name: string;
    origin: string;
    origin_id: number;
    channel: number;
    channel_id: string;
    is_archived: boolean;
    was_seen: boolean;
    value: {
        amount: number;
        currency: string;
    };
    expected_close_date: Date;
    next_activity_id: number;
    add_time: string;
    update_time: string;
    visible_to: string;
    cc_email: string;
}

interface IResponse {
    success: boolean;
    data: IOutput;
}
/* eslint-enable @typescript-eslint/naming-convention */
