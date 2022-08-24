import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default abstract class AShoptetList extends ABatchNode {

    protected abstract endpoint: string;

    protected abstract lastRunKey: string;

    protected abstract processResult(responseDto: ResponseDto, batchProcessDto: BatchProcessDto): IPaging;

    public async processAction(dto: BatchProcessDto<{ from: string }>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const page = Number(dto.getBatchCursor('0'));

        let url = `${this.endpoint}?itemsPerPage=100`;

        const creationTimeFrom = from || ShoptetPremiumApplication.shoptetDateISO(
            appInstall.getNonEncryptedSettings()[this.lastRunKey],
        );

        if (page) {
            url = `${url}&page=${page}`;
        }

        if (creationTimeFrom) {
            url = `${url}&creationTimeFrom=${creationTimeFrom}`;
        }

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );

        const res = await this.getSender().send(requestDto, [200]);
        const paginator = this.processResult(res, dto);

        if (paginator.pageCount !== page) {
            dto.setBatchCursor((page + 1).toString());
        } else {
            appInstall.addNonEncryptedSettings({ [this.lastRunKey]: new Date() });
            await (await this.getDbClient().getApplicationRepository()).update(appInstall);
        }

        return dto;
    }

}

export interface IPaging {
    totalCount: number;
    page: number;
    pageCount: number;
    itemsOnPage: number;
    itemsPerPage: number;
}
