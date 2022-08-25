import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { SUBDOMAIN } from '../WorkableApplication';

export const NAME = 'workable-get-accounts-batch';

export default class WorkableGetAccountsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const subdomain = appInstall.getSettings()[AUTHORIZATION_FORM][SUBDOMAIN];
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${subdomain}.workable.com/spi/v3/accounts`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.accounts ?? []);
        dto.removeBatchCursor();

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    accounts: IOutput[];

}

export interface IOutput {
    id: string;
    name: string;
    subdomain: string;
    description: string;
    summary: string;
    website_url: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
