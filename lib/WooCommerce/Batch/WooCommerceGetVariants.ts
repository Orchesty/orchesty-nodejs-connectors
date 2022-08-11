import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import WooCommerceApplication, { NAME as BASE_NAME } from '../WooCommerceApplication';

export const NAME = `${BASE_NAME.toLowerCase()}-get-products`;

export default class WooCommerceGetVariants extends ABatchNode {
  protected _endpoint = 'wp-json/wc/v3/products<product_id>/variations/?per_page=100&page=';

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const pageNumber = dto.getBatchCursor('1');
    const app = this._application as WooCommerceApplication;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const product = dto.jsonData as IInput;

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `wp-json/wc/v3/products${product.id}/variations/?per_page=100&page=${pageNumber}`,
    );

    const res = await this._sender.send(requestDto, [200, 404]);
    const totalPages = res.headers.get('x-wp-totalpages');
    if (Number(totalPages) > Number(pageNumber)) {
      dto.setBatchCursor((Number(pageNumber) + 1).toString());
    }
    dto.addHeader('product_name', product.name);
    dto.setItemList(res.jsonBody as IOutput[]);
    return dto;
  }

  public getName = (): string => NAME;
}

export interface IInput {
  id: number;
  name: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    description: string;
    permalink: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from?: Date;
    date_on_sale_from_gmt?: Date;
    date_on_sale_to?: Date;
    date_on_sale_to_gmt?: Date;
    on_sale: boolean;
    status: string;
    purchasable: boolean;
    virtual: boolean;
    downloadable: boolean;
    downloads: undefined[];
    download_limit: number;
    download_expiry: number;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity?: number;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    weight: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    shipping_class: string;
    shipping_class_id: number;
    image: {
      id: number;
      date_created: Date;
      date_created_gmt: Date;
      date_modified: Date;
      date_modified_gmt: Date;
      src: string;
      name: string;
      alt: string;
    };
    attributes: {
      id: number;
      name: string;
      option: string;
    }[];
    menu_order: number;
    meta_data: undefined[];
    _links: {
      self: {
        href: string;
      }[];
      collection: {
        href: string;
      }[];
      up: {
        href: string;
      }[];
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
