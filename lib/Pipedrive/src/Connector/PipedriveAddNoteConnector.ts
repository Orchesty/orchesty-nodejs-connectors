import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'pipedrive-add-note-connector';

export default class PipedriveAddNoteConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(
        dto: ProcessDto<IInput>,
    ): Promise<ProcessDto<IOutput>> {
        return dto.setNewJsonData(
            (
                await this.getSender().send<IResponse>(
                    await this.getApplication().getRequestDto(
                        dto,
                        await this.getApplicationInstallFromProcess(dto),
                        HttpMethods.POST,
                        '/notes',
                        dto.getJsonData(),
                    ),
                    [200],
                )
            ).getJsonBody().data,
        );
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    content: string;
    lead_id?: string;
    deal_id?: number;
    person_id?: number;
    org_id?: number;
    project_id?: number;
    user_id?: number;
    add_time?: string;
    pinned_to_lead_flag?: 0 | 1;
    pinned_to_deal_flag?: 0 | 1;
    pinned_to_organization_flag?: 0 | 1;
    pinned_to_person_flag?: 0 | 1;
    pinned_to_project_flag?: 0 | 1;
}

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
    data: IOutput;
}

/* eslint-enable @typescript-eslint/naming-convention */
