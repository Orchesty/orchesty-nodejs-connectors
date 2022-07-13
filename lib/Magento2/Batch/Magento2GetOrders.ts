import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import Magento2Application, { MAGENTO_URL } from '../Magento2Application';
import { IOrderJson } from '../Connector/Magento2GetOrder';

// eslint-disable-next-line max-len
export const GET_ORDERS_ENDPOINT = 'index.php/rest/default/V1/orders?searchCriteria[page_size]={items_per_page}&searchCriteria[currentPage]={current_page}';

const ITEMS_PER_PAGE = 100;

export default class Magento2GetOrders extends ABatchNode {
  public getName = (): string => 'shoptet-get-order-pages';

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const app = this._application as Magento2Application;
    const currentPage = Number(dto.getBatchCursor('1'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const host = appInstall.getSettings()[AUTHORIZATION_FORM][MAGENTO_URL];
    const url = `${host}/${GET_ORDERS_ENDPOINT}`
      .replace('{items_per_page}', ITEMS_PER_PAGE.toString())
      .replace('{current_page}', currentPage.toString());

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );

    const res = await this._sender.send(requestDto, [200, 404]);
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      total_count,
      items,
    } = res.jsonBody as IResponseJson;

    if (currentPage < total_count) {
      dto.setBatchCursor((currentPage + 1).toString());
    }
    dto.setItemList(items);

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponseJson {
  items: IOrderJson[],
  total_count: number
}

/* eslint-enable @typescript-eslint/naming-convention */
