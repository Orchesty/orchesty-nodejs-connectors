import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'clickup-create-space-connector';

export default class ClickupCreateSpaceConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { teamId, ...body } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `team/${teamId}/space`,
            body,
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    teamId: number;
    name: string;
    multiple_assignees: boolean;
    features: {
        due_dates: {
            enabled: boolean;
            start_date: boolean;
            remap_due_dates: boolean;
            remap_closed_due_date: boolean;
        };
        time_tracking: {
            enabled: boolean;
        };
        tags: {
            enabled: boolean;
        };
        time_estimates: {
            enabled: boolean;
        };
        checklists: {
            enabled: boolean;
        };
        custom_fields: {
            enabled: boolean;
        };
        remap_dependencies: {
            enabled: boolean;
        };
        dependency_warning: {
            enabled: boolean;
        };
        portfolios: {
            enabled: boolean;
        };
    };
}

export interface IOutput {
    id: string;
    name: string;
    private: boolean;
    statuses: {
        id: string;
        status: string;
        type: string;
        orderindex: number;
        color: string;
    }[];
    multiple_assignees: boolean;
    features: {
        due_dates: {
            enabled: boolean;
            start_date: boolean;
            remap_due_dates: boolean;
            remap_closed_due_date: boolean;
        };
        sprints: {
            enabled: boolean;
        };
        points: {
            enabled: boolean;
        };
        custom_items: {
            enabled: boolean;
        };
        tags: {
            enabled: boolean;
        };
        time_estimates: {
            enabled: boolean;
        };
        checklists: {
            enabled: boolean;
        };
        zoom: {
            enabled: boolean;
        };
        milestones: {
            enabled: boolean;
        };
        custom_fields: {
            enabled: boolean;
        };
        remap_dependencies: {
            enabled: boolean;
        };
        dependency_warning: {
            enabled: boolean;
        };
        multiple_assignees: {
            enabled: boolean;
        };
        portfolios: {
            enabled: boolean;
        };
        emails: {
            enabled: boolean;
        };
    };
    archived: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
