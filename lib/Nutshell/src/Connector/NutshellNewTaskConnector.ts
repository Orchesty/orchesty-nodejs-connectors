import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';

export const NAME = 'nutshell-new-task-connector';

export default class NutshellNewTaskConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const data = {
            jsonrpc: '2.0',
            method: 'newTask',
            params: dto.getJsonData(),
            id: crypto.randomBytes(4).toString('hex'),
        };
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            undefined,
            data,
        );

        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        return dto.setNewJsonData(response.result);
    }

}

interface IResponse {
    result: IOutput;
    id: string;
    jsonrpc: string;
}

export interface IOutput {
    title: string;
    id: number;
    entityType: string;
    rev: string;
    createdTime: string;
    description: string;
    dueTime: string;
    completedTime: null;
    completedUser: null;
    assignee: {
        stub: boolean;
        id: number;
        rev: string;
        entityType: string;
        modifiedTime: string;
        createdTime: string;
        name: string;
        emails: string[];
        isEnabled: boolean;
        isAdministrator: boolean;
    };
    entity: {
        stub: boolean;
        id: number;
        rev: string;
        entityType: string;
        modifiedTime: string;
        createdTime: string;
        name: string;
        regions: string[];
    };
    creator: {
        stub: boolean;
        id: number;
        rev: string;
        entityType: string;
        modifiedTime: string;
        createdTime: string;
        name: string;
        emails: string[];
        isEnabled: boolean;
        isAdministrator: boolean;
    };

}

export interface IInput {
    task: {
        title: string;
        description?: string;
        dueTime?: string;
        assignee?: {
            entityType?: string;
            id?: number;
        };
        entity?: {
            entityType?: string;
            id?: number;
        };
    };

}
