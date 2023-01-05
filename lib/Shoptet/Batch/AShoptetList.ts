import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default abstract class AShoptetList<ResponseData> extends ABatchNode {

    protected abstract endpoint: string;

    protected abstract fromParamKey: string;

    protected abstract lastRunKey: string;

    protected abstract processResult(responseDto: ResponseDto<ResponseData>, batchProcessDto: BatchProcessDto): IPaging;

    public async processAction(dto: BatchProcessDto<{ from: string }>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { page, dateFrom } = JSON.parse(dto.getBatchCursor('{ "page": 1, "dateFrom": null }')) as ICursor;

        let querySeparator = '?';
        if (this.endpoint.includes('?')) {
            querySeparator = '&';
        }

        let url = `${this.endpoint}${querySeparator}itemsPerPage=100`;

        let creationTimeFrom = dateFrom ?? (from || ShoptetPremiumApplication.shoptetDateISO(
            appInstall.getNonEncryptedSettings()[this.lastRunKey],
        ));

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

        if (page === 1) {
            appInstall.addNonEncryptedSettings({ [this.lastRunKey]: new Date() });
            await this.getDbClient().getApplicationRepository().update(appInstall);
        }

        if (paginator.pageCount > page) {
            dto.setBatchCursor(JSON.stringify({ page: page + 1, dateFrom: creationTimeFrom }));
        }

        return dto;
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
