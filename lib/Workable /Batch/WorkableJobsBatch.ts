import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { SUBDOMAIN } from '../WorkableApplication';

export const NAME = 'workable-jobs-batch';

export default class WorkableJobsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const subdomain = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SUBDOMAIN];
        const url = dto.getBatchCursor(`${subdomain}.workable.com/spi/v3/jobs?state=published`);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.jobs ?? []);
        if (response.paging?.next) {
            dto.setBatchCursor(response.paging.next);
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    subdomain: string;
}

interface IResponse {
    jobs: IOutput[];
    paging: {
        next: string;
    };
}

interface IOutput {
    id: string;
    title: string;
    full_title: string;
    shortcode: string;
    code: string;
    state: string;
    department: string;
    department_hierarchy:
    {
        id: number;
        name: string;
    }[];
    url: string;
    application_url: string;
    shortlink: string;
    location: {
        location_str: string;
        country: string;
        country_code: string;
        region: string;
        region_code: string;
        city: string;
        zip_code: string;
        telecommuting: boolean;
    };
    created_at: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
