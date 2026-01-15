import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { DateTime } from 'luxon';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default abstract class AShoptetList<ResponseData> extends ABatchNode {

    protected abstract endpoint: string;

    protected abstract fromParamKey: string;

    protected abstract lastRunKey: string;

    protected lastRunOffset = 60; // seconds

    protected abstract processResult(responseDto: ResponseDto<ResponseData>, batchProcessDto: BatchProcessDto): IPaging;

    public async processAction(dto: BatchProcessDto<{ from: string }>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        await this.saveInProgress(appInstall);
        const { page, dateFrom } = JSON.parse(dto.getBatchCursor('{ "page": 1, "dateFrom": null }')) as ICursor;

        let querySeparator = '?';
        if (this.endpoint.includes('?')) {
            querySeparator = '&';
        }

        let url = `${this.endpoint}${querySeparator}itemsPerPage=1000`;

        let creationTimeFrom = dateFrom ?? from;
        if (!creationTimeFrom) {
            const lastRun = appInstall.getNonEncryptedSettings()[this.lastRunKey];
            if (lastRun) {
                const lastRunWithOffset = DateTime.fromISO(lastRun).minus({ second: this.lastRunOffset }).toISO();
                if (lastRunWithOffset) {
                    creationTimeFrom = ShoptetPremiumApplication.shoptetDateISO(lastRunWithOffset);
                }
            }
        }

        if (!creationTimeFrom) {
            creationTimeFrom = this.getDefaultLastRun();
        }

        if (page) {
            url = `${url}&page=${page}`;
        }

        if (creationTimeFrom) {
            url = `${url}&${this.fromParamKey}=${creationTimeFrom}`;
        }

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );

        const res = await this.getSender().send<ResponseData>(
            requestDto,
            { success: 200, stopAndFail: 422 },
        );
        const paginator = this.processResult(res, dto);

        if (paginator.pageCount > page) {
            dto.setBatchCursor(JSON.stringify({ page: page + 1, dateFrom: creationTimeFrom }));
        } else {
            await this.saveLastRunKey(appInstall);
        }

        return dto;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async saveInProgress(appInstall: ApplicationInstall): Promise<void> {}

    protected async saveLastRunKey(appInstall: ApplicationInstall): Promise<void> {
        appInstall.addNonEncryptedSettings({ [this.lastRunKey]: new Date() });
        await this.getDbClient().getApplicationRepository().update(appInstall);
    }

    protected getDefaultLastRun(): string {
        return '';
    }

}

export interface IPaging {
    totalCount: number;
    page: number;
    pageCount: number;
    itemsOnPage: number;
    itemsPerPage: number;
}

export interface ICursor {
    page: number;
    dateFrom?: string;
}
