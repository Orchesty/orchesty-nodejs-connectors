import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PRODUCT_ID } from '../MallApplication';

export const NAME = 'mall-get-product-detail-connector';

export default class MallGetProductDetailConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const productId = appInstall.getSettings()[AUTHORIZATION_FORM][PRODUCT_ID];
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `products/${productId}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;
    dto.jsonData = response.data;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse{
  result: {
    code: number,
    status: string
  },
  data: IOutput
}

export interface IOutput {
  id: string,
  title: string,
  shortdesc: string,
  longdesc: string,
  priority: number,
  barcode: number,
  price: number,
  rrp: number,
  media: [
    {
      url: string,
      main: boolean,
      switch: string,
      energy_label: boolean,
      information_list: boolean
    }
  ],
  promotions: [
    {
      price: number,
      from: string,
      to: string
    }
  ],
  labels: [
    {
      label: string,
      from: string,
      to: string
    }
  ],
  parameters: {
    COLOR: string,
    SIZE: string
  },
  dimensions: {
    weight: number,
    width: number,
    length: number,
    height: number
  },
  availability: {
    status: string,
    in_stock: number
  },
  recommended: string[],
  delivery_delay: number,
  free_delivery: boolean,
  package_size: string,
  mallbox_allowed: boolean,
  article_id: number,
  url: string,
  overrides: {
    label: [
      {
        value: string,
        valid_from: string,
        valid_to: string
      }
    ],
    priority: [
      {
        value: number,
        valid_from: string,
        valid_to: string
      }
    ]
  },
  category_id: string,
  vat: number,
  variants: [
    {
      article_id: number,
      url: string,
      overrides: {
        label: [
          {
            value: string,
            valid_from: string,
            valid_to: string
          }
        ],
        priority: [
          {
            value: number,
            valid_from: string,
            valid_to: string
          }
        ]
      },
      id: string,
      title: string,
      shortdesc: string,
      longdesc: string,
      priority: number,
      barcode: number,
      price: number,
      rrp: number,
      media: [
        {
          url: string,
          main: boolean,
          switch: string,
          energy_label: boolean,
          information_list: boolean
        }
      ],
      promotions: [
        {
          price: number,
          from: string,
          to: string
        }
      ],
      labels: [
        {
          label: string,
          from: string,
          to: string
        }
      ],
      parameters: {
        COLOR: string,
        SIZE: string
      },
      dimensions: {
        weight: number,
        width: number,
        length: number,
        height: number
      },
      availability: {
        status: string,
        in_stock: number
      },
      recommended: string[],
      delivery_delay: number,
      free_delivery: boolean,
      package_size: string,
      mallbox_allowed: boolean
    }
  ],
  variable_parameters: string[],
  partner_title: string,
  brand_id: string,
  weee_fee: number,
  stage: string
}
/* eslint-enable @typescript-eslint/naming-convention */
