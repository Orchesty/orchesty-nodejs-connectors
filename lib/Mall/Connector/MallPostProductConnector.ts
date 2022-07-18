import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'mall-post-product-connector';

export default class MallPostProductConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'products',
      { data: dto.jsonData as IInput },
    );
    const resp = await this._sender.send(req, [200]);

    const records = resp.jsonBody as IResponse;
    dto.jsonData = records.data;

    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse{
  result: {
    code: number,
    status: string
  },
  data: IInput

}

export interface IInput {
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
  category_id: string,
  vat: number,
  variants: [
    {
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
  weee_fee: number
}
/* eslint-enable @typescript-eslint/naming-convention */
