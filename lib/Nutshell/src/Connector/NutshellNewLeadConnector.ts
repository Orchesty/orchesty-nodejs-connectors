import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';

export const NAME = 'nutshell-new-lead-connector';

export default class NutshellNewLeadConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const data = {
            jsonrpc: '2.0',
            method: 'newLead',
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

export interface IOutput {
    id: number;
    entityType: string;
    rev: string;
    modifiedTime: string;
    createdTime: string;
    name: string;
    description: string;
    htmlUrl: string;
    htmlUrlPath: string;
    avatarUrl: string;
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
    primaryAccount: {
        stub: boolean;
        id: number;
        rev: string;
        entityType: string;
        modifiedTime: string;
        createdTime: string;
        name: string;
        regions: string[];
        relationship: null;
        description: null;
    };
    milestone: null;
    stageset: {
        stub: boolean;
        id: number;
        entityType: string;
        modifiedTime: string;
        name: string;
    };
    activitiesCount: {
        '0': number;
        '1': number;
        '2': number;
        '-1': number;
    };
    status: number;
    confidence: number;
    completion: number;
    urgency: string;
    isOverdue: boolean;
    lastContactedDate: null;
    market: {
        stub: boolean;
        id: number;
        rev: string;
        entityType: string;
        name: string;
    };
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
    sources: [];
    competitors: [];
    products: [
        {
            stub: boolean;
            id: number;
            rev: string;
            entityType: string;
            modifiedTime: string;
            createdTime: string;
            name: string;
            relationship: string;
            price: {
                currency: string;
                amount: number;
            };
            quantity: number;
        }];
    contacts: [];
    accounts: [];
    tags: string[];
    priority: number;
    dueTime: string;
    value: {
        currency: string;
        amount: number;
    };
    normalizedValue: {
        currency: string;
        amount: number;
    };
    processes: [];
    notes: [
        {
            stub: number;
            id: number;
            rev: string;
            entityType: string;
            createdTime: string;
            note: string;
            noteMarkup: string;
            noteHtml: string;
            user: {
                stub: boolean;
                id: number;
                rev: string;
                entityType: string;
                modifiedTim: string;
                createdTime: string;
                name: string;
                emails: string[];
                isEnabled: boolean;
                isAdministrator: boolean;
            };
            originId: number;
            date: string;
        }];
    estimatedValue: {
        currency: string;
        amount: number;
    };
}

export interface IInput {
    lead: {
        primaryAccount?: { id: string };
        dueTime?: string;
        market?: { id: string };
        tags?: string[];
        description?: string;
        accounts?: [
            {
                id?: number;
            },
        ];
        contacts?: [
            {
                id?: number;
            },
        ];
        products?: [
            {
                relationship?: string;
                quantity?: number;
                price?: {
                    currency_shortname?: string;
                    amount?: string;
                };
                id?: number;
            },
        ];
        competitors?: [
            {
                status?: number;
                relationship?: string;
                id?: number;
            },
        ];
        sources?: [
            { id?: number },
        ];
        confidence?: number;
        assignee?: {
            entityType?: string;
            id?: number;
        };
        customFields?: {
            'Tracking #'?: string;
            Discount?: {
                currency_shortname?: string;
                amount?: string;
            };
        };
        note?: string[];
        priority?: number;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
