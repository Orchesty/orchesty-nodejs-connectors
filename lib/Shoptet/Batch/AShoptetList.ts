import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default abstract class AShoptetList<ResponseData> extends ABatchNode {

    protected abstract endpoint: string;

    protected abstract fromParamKey: string;

    protected abstract lastRunKey: string;

    protected forceLastRun = false;

    protected abstract processResult(responseDto: ResponseDto<ResponseData>, batchProcessDto: BatchProcessDto): IPaging;

    public async processAction(dto: BatchProcessDto<{ from: string }>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const page = Number(dto.getBatchCursor('1'));

        let url = `${this.endpoint}?itemsPerPage=100`;

        let creationTimeFrom = from || ShoptetPremiumApplication.shoptetDateISO(
            appInstall.getNonEncryptedSettings()[this.lastRunKey],
        );

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

        const res = await this.getSender().send<ResponseData>(requestDto, [200]);
        const paginator = this.processResult(res, dto);

        if (paginator.pageCount > page) {
            dto.setBatchCursor((page + 1).toString());
        } else {
            appInstall.addNonEncryptedSettings({ [this.lastRunKey]: new Date() });
            await (await this.getDbClient().getApplicationRepository()).update(appInstall);
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
