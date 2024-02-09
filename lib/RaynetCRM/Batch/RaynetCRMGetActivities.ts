import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'raynet-crm-get-activities';
export const LAST_RUN_KEY = 'lastRunListActivities';
export const LIMIT = 1000;

export default class RaynetCRMGetActivities extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = await appInstall.getNonEncryptedSettings()[LAST_RUN_KEY];
        const lastRunDate = lastRun ? new Date(lastRun) : new Date(0);
        const formattedDate = `${lastRunDate.getFullYear()}-${lastRunDate.getMonth() + 1}-${lastRunDate.getDate()}%20${lastRunDate.getHours()}:${lastRunDate.getMinutes()}`;

        const page = Number(dto.getBatchCursor('0'));

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `activity?offset=${page}&limit=${LIMIT}&rowInfo.lastModifiedAt[GE]=${formattedDate}&dateFormat=ISO8601${from ? `&scheduledFrom=${from}` : ''}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const { totalCount } = resp.getJsonBody();

        if (totalCount && totalCount > LIMIT * (page + 1)) {
            dto.setBatchCursor(String(page + 1));
        } else {
            appInstall.addNonEncryptedSettings({
                [LAST_RUN_KEY]: new Date().toISOString(),
            });
            await this.getDbClient().getApplicationRepository().update(appInstall);
        }

        return dto.setItemList(resp.getJsonBody().data);
    }

}

export interface IInput {
    from?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    success: boolean;
    totalCount: number;
    data: IOutput[];
}

export interface IOutput {
    _entityName: string;
    id: number;
    title: string;
    personal: boolean;
    status: string;
    priority: string;
    scheduledFrom: string;
    scheduledTill: string;
    description: string;
    tags: unknown[];
    'rowInfo.createdAt': string;
    'rowInfo.createdBy': string;
    'rowInfo.updatedAt': string;
    securityLevel: {
        id: number;
        name: string;
    };
    _version: number;
    customFields: unknown;
    participants: {
        owner: boolean;
        role: string;
        name: string;
        person: number;
    }[];
    meetingPlace: string;
    companyAddress: unknown;
}

/* eslint-enable @typescript-eslint/naming-convention */
