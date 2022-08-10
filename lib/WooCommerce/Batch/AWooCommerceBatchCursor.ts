import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import WooCommerceApplication from '../WooCommerceApplication';

export default abstract class AWooCommerceBatchCursor<T> extends ABatchNode {
  protected abstract _endpoint: string;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const pageNumber = dto.getBatchCursor('1');
    const app = this._application as WooCommerceApplication;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `${this._endpoint}${pageNumber}`,
    );

    const res = await this._sender.send(requestDto, [200, 404]);
    const totalPages = res.headers.get('x-wp-totalpages');
    if (Number(totalPages) > Number(pageNumber)) {
      dto.setBatchCursor((Number(pageNumber) + 1).toString());
    } else {
      dto.removeBatchCursor();
    }
    dto.setItemList(res.jsonBody as T[]);
    return dto;
  }
}
