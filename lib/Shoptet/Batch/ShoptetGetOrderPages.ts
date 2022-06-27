import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ShoptetPremiumApplication, { SHOPTET_API_HOST } from '../ShoptetPremiumApplication';

export const GET_ORDER_PAGES_ENDPOINT = 'api/orders';
const LAST_RUN = 'lastRunOrder';

export default class ShoptetGetOrderPages extends AConnector {
  public getName = (): string => 'shoptet-get-order-pages';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as ShoptetPremiumApplication;
    const {
      userName,
      from,
    } = dto.jsonData as { userName: string, from: string };
    const appInstall = await this._getApplicationInstall(userName);

    let url = `${SHOPTET_API_HOST}/${GET_ORDER_PAGES_ENDPOINT}`;

    const creationTimeFrom = from || ShoptetPremiumApplication.shoptetDateISO(
      appInstall.getNonEncryptedSettings()[LAST_RUN],
    );

    if (creationTimeFrom) {
      url = `${url}?creationTimeFrom=${creationTimeFrom}`;
    }

    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );

    const res = await this._sender.send(requestDto, [200, 404]);
    const { pageCount } = (res.jsonBody as IResponseJson).data.paginator;

    appInstall.addNonEncryptedSettings({ [LAST_RUN]: new Date() });
    await (await this._dbClient.getApplicationRepository()).update(appInstall);

    const pages: IOutputJson[] = [];
    for (let i = 1; i <= pageCount; i += 1) {
      pages.push({
        url: `${url}${creationTimeFrom ? '&' : '?'}page=${i}`,
        userName,
      });
    }

    dto.jsonData = pages;
    return dto;
  }
}

interface IResponseJson {
  data: {
    paginator: {
      pageCount: number;
    };
  };
}

export interface IOutputJson {
  url: string;
  userName: string;
}
