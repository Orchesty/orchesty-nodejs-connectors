import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';

export default abstract class AShoptetList extends ABatchNode {
  abstract endpoint: string;

  abstract lastRunKey: string;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const { from } = dto.jsonData as { from: string };
    const appInstall = await this._getApplicationInstallFromProcess(dto);
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

    const requestDto = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );

    const res = await this._sender.send(requestDto, [200]);
    const paginator = this._processResult(res, dto);

    if (paginator.pageCount !== page) {
      dto.setBatchCursor((page + 1).toString());
    } else {
      appInstall.addNonEncryptedSettings({ [this.lastRunKey]: new Date() });
      await (await this._dbClient.getApplicationRepository()).update(appInstall);
    }

    return dto;
  }

  protected abstract _processResult (responseDto: ResponseDto, batchProcessDto: BatchProcessDto): IPaging;
}

export interface IPaging {
  totalCount: number,
  page: number,
  pageCount: number,
  itemsOnPage: number,
  itemsPerPage: number
}
