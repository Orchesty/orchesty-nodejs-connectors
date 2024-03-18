import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'raynet-crm-get-contact-persons';
export const LIMIT = 1000;

export default class RaynetCRMGetContactPersons extends ABatchNode {

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
            `person?offset=${page}&limit=${this.limit}${email ? `&contactInfo.email=${email}` : ''}`,
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
        titleBefore: string;
        firstName: string;
        lastName: string;
        titleAfter: string;
        primaryRelationship: {
            id: number;
            type: string;
            company: {
                id: number;
                name: string;
            };
        };
        owner: {
            id: number;
            fullName: string;
        };
        contactInfo: {
            email: string;
            email2: string;
            tel1: string;
            tel1Type: string;
            tel2?: unknown;
            tel2Type?: unknown;
            www?: unknown;
            otherContact?: unknown;
        };
        privateAddress: {
            city: string;
            country: string;
            countryCode: string;
            province?: unknown;
            street: string;
            zipCode: string;
        };
        category: {
            id: number;
            value: string;
        };
        personClassification1: {
            id: number;
            value: string;
        };
        personClassification2: {
            id: number;
            value: string;
        };
        personClassification3: {
            id: number;
            value: string;
        };
        salutation: string;
        birthday: string;
        language: {
            id: number;
            value: string;
        };
        maritalStatus: {
            id: number;
            value: string;
        };
        gender: string;
        companyAddress: {
            address: {
                id: number;
                city: string;
                country: string;
                countryCode: string;
                province?: unknown;
                street: string;
                zipCode: string;
            };
            territory?: unknown;
        };
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
        notice: string;
        activeUserAccount: boolean;
        keyman: boolean;
        tags: unknown[];
        _version: number;
        inlineGdpr: {
            id: number;
            validFrom: string;
            validTill: string;
            legalTitle: string;
            templateName: string;
            gdprTemplate: number;
        }[];
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention */
