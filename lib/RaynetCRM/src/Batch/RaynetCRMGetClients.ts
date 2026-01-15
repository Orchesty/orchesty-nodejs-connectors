import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'raynet-crm-get-clients';
export const LIMIT = 1000;

export default class RaynetCRMGetClients extends ABatchNode {

    protected limit = LIMIT;

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const email = this.getData(dto);
        const page = Number(dto.getBatchCursor('0'));

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `company?offset=${page}&limit=${this.limit}${email ? `&primaryAddress-contactInfo.email=${email}` : ''}`,
        );

        return this.processResponse(dto, await this.getSender().send<IResponse>(req, [200]), page);
    }

    protected getData(dto: BatchProcessDto<IInput>): string {
        return dto.getJsonData().email ?? '';
    }

    protected processResponse(dto: BatchProcessDto, resp: ResponseDto<IResponse>, page: number): BatchProcessDto {
        const { totalCount } = resp.getJsonBody();

        if (totalCount && totalCount > this.limit * (page + 1)) {
            dto.setBatchCursor(String(page + 1));
        }

        return dto.setItemList(resp.getJsonBody().data);
    }

}

export interface IInput {
    email?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    success: string;
    totalCount: number;
    data: {
        id: number;
        name: string;
        titleBefore?: unknown;
        firstName?: unknown;
        lastName?: unknown;
        titleAfter?: unknown;
        person: boolean;
        role: string;
        state: string;
        rating: string;
        owner: {
            id: number;
            fullName: string;
        };
        regNumber: string;
        taxNumber: string;
        taxNumber2?: unknown;
        taxPayer: string;
        bankAccount?: unknown;
        databox?: unknown;
        court?: unknown;
        primaryAddress: {
            id: number;
            primary: boolean;
            contactAddress: boolean;
            address: {
                id: number;
                city: string;
                country: string;
                name: string;
                province: string;
                street: string;
                zipCode: string;
                lat: number;
                lng: number;
            };
            territory: {
                id: number;
                value: string;
            };
            contactInfo: {
                email: string;
                email2: string;
                primary: boolean;
                tel1: string;
                tel1Type: string;
                tel2: string;
                tel2Type: string;
                www: string;
                otherContact?: unknown;
            };
            extIds?: unknown;
        };
        contactAddress: {
            id: number;
            primary: boolean;
            contactAddress: boolean;
            address: {
                id: number;
                city: string;
                country: string;
                name: string;
                province: string;
                street: string;
                zipCode: string;
                lat?: unknown;
                lng?: unknown;
            };
            territory: {
                id: number;
                value: string;
            };
            contactInfo: {
                email: string;
                email2?: unknown;
                primary: boolean;
                tel1: string;
                tel1Type: string;
                tel2: string;
                tel2Type: string;
                www?: unknown;
                otherContact?: unknown;
            };
            extIds?: unknown;
        };
        category: {
            id: number;
            value: string;
        };
        turnover: {
            id: number;
            value: string;
        };
        economyActivity: {
            id: number;
            value: string;
        };
        companyClassification1: {
            id: number;
            value: string;
        };
        companyClassification2: {
            id: number;
            value: string;
        };
        companyClassification3: {
            id: number;
            value: string;
        };
        paymentTerm: {
            id: number;
            value: string;
        };
        contactSource: {
            id: number;
            value: string;
        };
        birthday?: unknown;
        notice: string;
        tags: string[];
        customFields?: unknown;
        'rowInfo.createdAt': string;
        'rowInfo.createdBy': string;
        'rowInfo.updatedAt': string;
        'rowInfo.updatedBy': string;
        'rowInfo.rowAccess'?: unknown;
        'rowInfo.rowState'?: unknown;
        securityLevel: {
            id: number;
            name: string;
        };
        inlineGdpr: {
            id: number;
            validFrom: string;
            validTill: string;
            legalTitle: string;
            templateName: string;
            gdprTemplate: number;
        }[];
        _version: number;
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention */
