import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShopifyApplication from '../../Shopify/ShopifyApplication';

const LIST_PAGE_ENDPOINT = 'api/v2/products';

export const NAME = 'upgates-get-products';

export default class UpgatesGetProducts extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const app = this._application as ShopifyApplication;
    const { userName } = dto.jsonData as IInputJson;
    const pageNumber = dto.getBatchCursor('0');
    const url = `${LIST_PAGE_ENDPOINT}?page${pageNumber}`;
    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

    const res = await this._sender.send(requestDto);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { number_of_pages, products } = res.jsonBody as IResponseJson;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    if (Number(pageNumber) < number_of_pages) {
      dto.setBatchCursor((Number(pageNumber) + 1).toString());
    }

    dto.jsonData = products;

    return dto;
  }
}

interface IInputJson {
  userName: string
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponseJson extends IProductJson{
  number_of_pages: number,
  number_of_items: number,
}

interface IProductJson {
  products: [{
    code: string,
    code_supplier: string,
    ean: string,
    product_id: number,
    active_yn: boolean,
    archived_yn: boolean,
    replacement_product_code: string,
    can_add_to_basket_yn: boolean,
    adult_yn: boolean,
    descriptions: IProductDescription[]
    manufacturer: string,
    stock: number,
    stock_position: number,
    availability: string,
    availability_type: AvailabilityTypeEnum,
    weight: number,
    shipment_group: string,
    images: IProductImage[]
    categories: IProductCategories
    groups: number[],
    prices: IProductPrice[],
    vats: Record<string, number>,
    parameters: IProductParameters[],
    labels: IProductLabel[],
    variants: IProductVariant[],
    related: string[],
    accessories: string[],
    alternative: string[],
    gifts: string[],
    sets: string[],
    metas: IProductVariantMeta[],
    admin_url: string
  }]
}

interface IProductDescription {
  language: string,
  title: string,
  short_description: string,
  long_description: string,
  url: string,
  unit: string
}

interface IProductImage {
  url: string,
  main_yn: boolean,
  list_yn: boolean,
  position: number,
  titles: IProductImageTitle[]
}

interface IProductImageTitle {
  language: string,
  title: string
}

interface IProductCategories {
  category_id: number,
  code: string,
  main_yn: boolean,
  position: number,
  name: string
}

interface IProductPrice {
  language: string,
  currency: string,
  pricelists: IProductPricePriceList[]
}

interface IProductPricePriceList {
  name: string,
  price_original: number,
  product_discount: number,
  product_discount_real: number,
  price_sale: number,
  price_with_vat: number,
  price_without_vat: number
}

interface IProductParameters {
  name: Record<string, string>,
  values: Record<string, string>
}

interface IProductLabel {
  name: Record<string, string>,
  active_yn: boolean,
  active_from: Date,
  active_to: Date
}

interface IProductVariant {
  code: string,
  code_supplier: string,
  ean: string,
  variant_id: number,
  active_yn: boolean,
  can_add_to_basket_yn: boolean,
  stock: number,
  stock_position: string,
  availability: string,
  availability_type: AvailabilityTypeEnum,
  weight: string,
  image: string,
  prices: IProductPrice[],
  parameters: IProductParameters[],
  labels: IProductLabel[],
  metas: IProductVariantMeta[]
}

interface IProductVariantMeta {
  key: string,
  type: MetaTypeEnum,
  value: string,
  values: IProductVariantMetaValues[]
}

interface IProductVariantMetaValues {
  language: string,
  value: string
}

enum AvailabilityTypeEnum {
  ON_REQUEST = 'OnRequest',
  NOT_AVAILABLE = 'NotAvailable',
  IN_STOCK = 'InStock',
  CUSTOM = 'Custom'
}

enum MetaTypeEnum {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  INPUT = 'input',
  DATE = 'date',
  EMAIL = 'email',
  NUMBER = 'number',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  TEXTAREA = 'textarea',
  FORMATTED = 'formatted'
}
