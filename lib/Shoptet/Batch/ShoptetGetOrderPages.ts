import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ShoptetPremiumApplication from '../ShoptetPremiumApplication';
import { SHOPTET_API_HOST } from '../ABaseShoptet';

export const GET_ORDER_PAGES_ENDPOINT = 'api/orders';
const LAST_RUN = 'lastRunOrder';

export default class ShoptetGetOrderPages extends ABatchNode {
  public getName = (): string => 'shoptet-get-order-pages';

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const app = this._application as ShoptetPremiumApplication;
    const {
      from,
    } = dto.jsonData as { from: string };
    const appInstall = await this._getApplicationInstallFromProcess(dto);

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
      });
    }

    dto.setItemList(pages);
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
}
