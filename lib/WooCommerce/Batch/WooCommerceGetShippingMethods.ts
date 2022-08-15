import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import WooCommerceApplication, { NAME as BASE_NAME } from '../WooCommerceApplication';

export const NAME = `${BASE_NAME.toLowerCase()}-get-shipping-methods`;

export default class WooCommerceGetShippingMethods extends ABatchNode {
  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const pageNumber = dto.getBatchCursor('1');
    const app = this._application as WooCommerceApplication;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `wp-json/wc/v3/shipping_methods?per_page=100&page=${pageNumber}`,
    );

    const res = await this._sender.send<IShippingMethod[]>(requestDto, [200, 404]);
    const totalPages = res.headers.get('x-wp-totalpages');
    if (Number(totalPages) > Number(pageNumber)) {
      dto.setBatchCursor((Number(pageNumber) + 1).toString());
    }
    dto.setItemList(res.jsonBody);
    return dto;
  }

  public getName = (): string => NAME;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IShippingMethod {
  id: string;
  title: string;
  description: string;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}
/* eslint-enable @typescript-eslint/naming-convention */
