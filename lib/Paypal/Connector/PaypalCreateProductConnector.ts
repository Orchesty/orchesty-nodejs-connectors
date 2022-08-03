import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'paypal-create-product-connector';

export default class PaypalCreateProductConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'v1/catalogs/products';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    name: string;
    description: string;
    type: string;
    category: string;
    image_url: string;
    home_url: string;
}

export interface IOutput {
    id: string;
    name: string;
    description: string;
    type: string;
    category: string;
    image_url: string;
    home_url: string;
    create_time: Date;
    update_time: Date;
    links: {
        href: string;
        rel: string;
        method: string;
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
