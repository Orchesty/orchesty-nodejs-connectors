import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BASE_URL, STORE_HASH } from '../BigcommerceApplication';

export const NAME = 'big-commerce-create-order';

export default class BigCommerceCreateOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = JSON.stringify({ data: dto.jsonData });

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const storeHash = appInstall.getSettings()[STORE_HASH][STORE_HASH];
    const url = `${BASE_URL}/${storeHash}/v2/orders`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);

    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOrderResp;
    return dto;
  }
}

export interface IOrderResp {
    /* eslint-disable @typescript-eslint/naming-convention */
    billing_address: {
        first_name: string,
        last_name: string,
        street_1: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        country_iso2: string,
        email: string,
    }
    products: [{ name: string, quantity: number, price_inc_tax: number, price_ex_tax: number }]
    /* eslint-enable @typescript-eslint/naming-convention */
}
