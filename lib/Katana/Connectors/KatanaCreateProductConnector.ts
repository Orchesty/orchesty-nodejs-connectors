import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'katana-create-product-connector';

export default class KatanaCreateProductConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'products',
        dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    name: string,
    uom: string,
    category_name: string,
    is_producible: boolean,
    is_purchasable: boolean,
    default_supplier_id: number,
    additional_info: string,
    batch_tracked: boolean,
    purchase_uom: string,
    purchase_uom_conversion_rate: number,
    configs: {
        name: string
        values: string[]
    }[],
    variants: {
        sku: string,
        purchase_price: number,
        sales_price: number,
        config_attributes: {
            config_name: string
            config_value: string
        }[],
        internal_barcode: string,
        registered_barcode: string,
        supplier_item_codes: string[]
    }[]
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
