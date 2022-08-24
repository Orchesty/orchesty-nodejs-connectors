import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';

export const NAME = 'nutshell-get-account-connector';

export default class NutshellGetAccountConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const data = {
            jsonrpc: '2.0',
            method: 'getAccount',
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

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    result: IOutput;
    id: string;
    jsonrpc: string;
}

export interface IInput {
    accountId: number;
}

export interface IOutput {
    id: number;
    entityType: string;
    rev: string;
    modifiedTime: string;
    createdTime: string;
    name: string;
    htmlUrl: string;
    htmlUrlPath: string;
    avatarUrl: string;
    accountType: {
        id: number;
        name: string;
    };
    industry: {
        stub: boolean;
        id: number;
        rev: string;
        entityType: string;
        name: string;
    };
    tags: [];
    lastContactedDate: string;
    contacts: [
        {
            stub: true;
            id: number;
            rev: string;
            entityType: string;
            modifiedTime: string;
            createdTime: string;
            name: string;
            jobTitle: string;
            relationship: null;
        },
    ];
    description: null;
    legacyId: null;
    address: {
        main: {
            name: null;
            location: {
                longitude: number;
                latitude: number;
            };
            locationAccuracy: string;
            address_1: string;
            address_2: null;
            address_3: null;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            timezone: null;
        };
        primary: {
            name: null;
            location: {
                longitude: number;
                latitude: number;
            };
            locationAccuracy: string;
            address_1: string;
            address_2: null;
            address_3: null;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            timezone: null;
        };
    };
    notes: [];
    leads: [
        {
            stub: boolean;
            id: number;
            rev: string;
            entityType: string;
            modifiedTime: string;
            createdTime: string;
            name: string;
            description: string;
            status: number;
            completion: number;
            value: {
                currency: string;
                amount: number;
            };
            primaryAccountName: string;
            primaryContactName: string;
            isOverdue: false;
            lastContactedDate: string;
            dueTime: string;
            closedTime: string;
        },
    ];
}

/* eslint-enable @typescript-eslint/naming-convention */
