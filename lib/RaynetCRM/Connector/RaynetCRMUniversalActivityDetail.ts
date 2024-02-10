import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'raynet-crm-universal-activity-detail';

export function getEntityType(entityName: string): string {
    return `${entityName.charAt(0).toLowerCase()}${entityName.slice(1)}`;
}

export default class RaynetCRMUniversalActivityDetail extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IActivityData>> {
        const data = dto.getJsonData();
        const { entityName, entityId } = data.data;
        const entityType = getEntityType(entityName);

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `${entityType}/${entityId}?dateFormat=ISO8601`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData({ ...resp.getJsonBody().data, _entityName: entityName });
    }

}

export interface IInput {
    eventId: string;
    createdAt: string;
    type: string;
    author: string;
    source: {
        name: string;
        description: string;
    };
    data: {
        entityName: string;
        entityId: number;
        extIds: string[];
    };
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    success: string;
    data: IActivityData;
}

export interface IActivityData {
    id: number;
    title: string;
    completed: string;
    campaignName: string;
    source: string;
    externalOverviewUrl: string;
    externalThumbnailUrl: string;
    _version: number;
    stats: {
        sent: string;
        clicked: string;
        opened: string;
        unsubscribed: string;
    };
    category: {
        id: number;
        value: string;
    };
    priority: string;
    status: string;
    personal: boolean;
    owner: number;
    resolver: number;
    company: {
        id: number;
        name: string;
    };
    scheduledFrom: string;
    scheduledTill: string;
    description: string;
    solution: string;
    tags: undefined[];
    'rowInfo.createdAt': string;
    'rowInfo.createdBy': string;
    'rowInfo.updatedAt': string;
    'rowInfo.updatedBy': string;
    securityLevel: {
        id: number;
        name: string;
    };
    customFields: unknown;
    participants: {
        id: number;
        owner: boolean;
        name: string;
        person: number;
        company: number;
    }[];
    recurrence: {
        id: number;
        count: number;
        interval: string;
        recurrenceDay: number;
        startDate: string;
    };
    deadline: string;
    meetingPlace: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
