import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'katana-list-products-batch';
const LIMIT = 50;

export default class KatanaListProductsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const offset = Number(dto.getBatchCursor('1'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `products?offset=${offset}&limit=${LIMIT}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.total_records >= LIMIT) {
      dto.setBatchCursor((offset + LIMIT).toString());
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    data: IOutput[];
    total_records: number;
}

export interface IOutput {
    id: number,
    name: string,
    uom: string,
    category_name: string,
    is_producible: boolean,
    default_supplier_id: number,
    is_purchasable: boolean,
    type: string,
    purchase_uom: string,
    purchase_uom_conversion_rate: number,
    batch_tracked: boolean,
    variants: {
        id: number,
        sku: string,
        sales_price: number,
        product_id: number,
        purchase_price: number,
        type: string,
        created_at: string,
        updated_at: string,
        config_attributes: {
            config_name: string,
            config_value: string
        }[],
        internal_barcode: string,
        registered_barcode: string,
        supplier_item_codes: string[]
    }[],
    configs: {
        id: number,
        name: string,
        values: string[],
        product_id: number
    }[],
    additional_info: string,
    created_at: string,
    updated_at: string
}
/* eslint-enable @typescript-eslint/naming-convention */
