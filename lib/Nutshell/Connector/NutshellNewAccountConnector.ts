import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';

export const NAME = 'nutshell-new-account-connector';

export default class NutshellNewAccountConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const data = {
            jsonrpc: '2.0',
            method: 'newAccount',
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
    account: {
        name: string;
        owner?: {
            entityType?: string;
            id?: number;
        };
        industryId?: string;
        accountTypeId?: string;
        territoryId?: string;
        url?: string[];
        phone?: string[];
        leads?: [
            {
                relationship?: string;
                id?: number;
            },
        ];
        contacts?: [
            {
                relationship?: string;
                id?: number;
            },
        ];
        address?: [
            {
                address_1?: string;
                address_2?: string;
                address_3?: string;
                city?: string;
                state?: string;
                postalCode?: string;
                country?: string;
            },
        ];
        customFields?: {
            Number_of_Employees?: string;
        };

    };
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
    owner: {
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
    tags: [];
    lastContactedDate: string;
    contacts: [
        {
            stub: boolean;
            id: number;
            rev: string;
            entityType: string;
            modifiedTime: string;
            createdTime: string;
            name: string;
            jobTitle: string;
            relationship: string;
        }];
    description: null;
    legacyId: null;
    phone: {
        '0': {
            countryCode: string;
            number: string;
            extension: null;
            numberFormatted: string;
            E164: string;
            countryCodeAndNumber: string;
        };
        '1': {
            countryCode: string;
            number: string;
            extension: null;
            numberFormatted: string;
            E164: string;
            countryCodeAndNumber: string;
        };
        '2': {
            countryCode: string;
            number: string;
            extension: null;
            numberFormatted: string;
            E164: string;
            countryCodeAndNumber: string;
        };
        '--primary': {
            countryCode: string;
            number: string;
            extension: null;
            numberFormatted: string;
            E164: string;
            countryCodeAndNumber: string;
        };
    };
    url: {
        '0': string;
        '1': string;
        '--primary': string;
    };
    address: {
        '0': {
            name: null;
            location: null;
            locationAccuracy: null;
            address_1: string;
            address_2: string;
            address_3: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            timezone: null;
        };
        '--primary': {
            name: null;
            location: null;
            locationAccuracy: null;
            address_1: string;
            address_2: string;
            address_3: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            timezone: null;
        };
    };
    notes: [];
    leads: [];
}

/* eslint-enable @typescript-eslint/naming-convention */
