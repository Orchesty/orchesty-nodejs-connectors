import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'clickup-create-task-connector';

export default class ClickupCreateTaskConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { listId, ...body } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `list/${listId}/task`,
            body,
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    listId: number;
    name: string;
    description: string;
    assignees?: number[];
    tags?: string[];
    status: string;
    priority: number;
    due_date?: number;
    due_date_time?: boolean;
    time_estimate?: number;
    start_date?: number;
    start_date_time?: boolean;
    notify_all?: boolean;
    check_required_custom_fields?: boolean;
    custom_fields?: {
        id: string;
        value: number;
    }[];
}

export interface IOutput {
    id: string;
    name: string;
    text_content: string;
    description: string;
    status: {
        status: string;
        color: string;
        orderindex: number;
        type: string;
    };
    orderindex: string;
    date_created: string;
    date_updated: string;
    creator: {
        id: number;
        username: string;
        color: string;
        profilePicture: string;
    };
    assignees: [];
    checklists: [];
    tags: [];
    custom_fields: {
        id: string;
        name: string;
        type: string;
        type_config: {
            single_user: boolean;
            include_groups: boolean;
            include_guests: boolean;
            include_team_members: boolean;
        };
        date_created: string;
        hide_from_guests: false;
        required: false;
    }[];
    list: {
        id: string;
    };
    folder: {
        id: string;
    };
    space: {
        id: string;
    };
    url: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
