import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { AUTHORIZATION_SETTINGS, FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ILimitedApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/ILimitedApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { IApplicationSettings } from 'pipes-nodejs-sdk/lib/Application/Database/ApplicationInstall';
import CurlSender from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/CurlSender';

const PREMIUM_PLAN = 'premium';
const SHOPIFY_URL = 'shopifyUrl';
const SHOP_INFO_URL = 'admin/api/2022-01/shop.json';

export const NAME = 'SHOPIFY';

export default class ShopifyApplication extends ABasicApplication implements ILimitedApplication {
  constructor(private _curlSender: CurlSender) {
    super();
  }

  public injectLimit = (_dto: ProcessDto, appInstall: ApplicationInstall): ProcessDto => {
    const dto = _dto;
    const premium = appInstall.getSettings()[PREMIUM_PLAN];
    let amount = 2;
    if (premium) {
      amount = 4;
    }
    dto.setLimiter(
      appInstall.getName(),
      1,
      amount,
    );
    return dto;
  };

  public getDescription = (): string => 'Shopify Application';

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Shopify';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto => {
    const settings = applicationInstall.getSettings();
    const base64 = encode(
      `${settings[AUTHORIZATION_SETTINGS][USER]}:${settings[AUTHORIZATION_SETTINGS][PASSWORD]}`,
    );
    const headers = {
      [CommonHeaders.AUTHORIZATION]: `Basic ${base64}`,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
    };

    let urlx = url || '';
    if (!urlx.startsWith('http')) {
      urlx = `${this.getDecoratedUrl(applicationInstall)}/${urlx}`;
    }
    const requestDto = new RequestDto(urlx, parseHttpMethod(method), data, headers);
    requestDto.debugInfo = dto;
    return requestDto;
  };

  public async setApplicationSettings(applicationInstall: ApplicationInstall, settings: IApplicationSettings):
    Promise<ApplicationInstall> {
    const appInstall = await super.setApplicationSettings(applicationInstall, settings);
    await this._checkShopPlan(applicationInstall);
    return appInstall;
  }

  public getDecoratedUrl = (app: ApplicationInstall): string => app.getSettings()?.[FORM]?.[SHOPIFY_URL] ?? '';

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
    .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Password', undefined, true))
    .addField(new Field(FieldType.URL, SHOPIFY_URL, 'Url', undefined, true));

  public getLogo = (): string | null => 'data:image/svg+xml;base64,'
    // eslint-disable-next-line max-len
    + ' PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDkuNSAxMjQuNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTA5LjUgMTI0LjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojOTVCRjQ3O30KCS5zdDF7ZmlsbDojNUU4RTNFO30KCS5zdDJ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTUuOSwyMy45Yy0wLjEtMC42LTAuNi0xLTEuMS0xYy0wLjUsMC05LjMtMC4yLTkuMy0wLjJzLTcuNC03LjItOC4xLTcuOWMtMC43LTAuNy0yLjItMC41LTIuNy0wLjMKCQljMCwwLTEuNCwwLjQtMy43LDEuMWMtMC40LTEuMy0xLTIuOC0xLjgtNC40Yy0yLjYtNS02LjUtNy43LTExLjEtNy43YzAsMCwwLDAsMCwwYy0wLjMsMC0wLjYsMC0xLDAuMWMtMC4xLTAuMi0wLjMtMC4zLTAuNC0wLjUKCQljLTItMi4yLTQuNi0zLjItNy43LTMuMWMtNiwwLjItMTIsNC41LTE2LjgsMTIuMmMtMy40LDUuNC02LDEyLjItNi44LDE3LjVjLTYuOSwyLjEtMTEuNywzLjYtMTEuOCwzLjdjLTMuNSwxLjEtMy42LDEuMi00LDQuNQoJCWMtMC4zLDIuNS05LjUsNzMtOS41LDczbDc2LjQsMTMuMmwzMy4xLTguMkMxMDkuNSwxMTUuOCw5NiwyNC41LDk1LjksMjMuOXogTTY3LjIsMTYuOGMtMS44LDAuNS0zLjgsMS4yLTUuOSwxLjgKCQljMC0zLTAuNC03LjMtMS44LTEwLjlDNjQsOC42LDY2LjIsMTMuNyw2Ny4yLDE2Ljh6IE01Ny4yLDE5LjljLTQsMS4yLTguNCwyLjYtMTIuOCwzLjljMS4yLTQuNywzLjYtOS40LDYuNC0xMi41CgkJYzEuMS0xLjEsMi42LTIuNCw0LjMtMy4yQzU2LjksMTEuNiw1Ny4zLDE2LjUsNTcuMiwxOS45eiBNNDkuMSw0YzEuNCwwLDIuNiwwLjMsMy42LDAuOUM1MS4xLDUuOCw0OS41LDcsNDgsOC42CgkJYy0zLjgsNC4xLTYuNywxMC41LTcuOSwxNi42Yy0zLjYsMS4xLTcuMiwyLjItMTAuNSwzLjJDMzEuNywxOC44LDM5LjgsNC4zLDQ5LjEsNHoiLz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05NC44LDIyLjljLTAuNSwwLTkuMy0wLjItOS4zLTAuMnMtNy40LTcuMi04LjEtNy45Yy0wLjMtMC4zLTAuNi0wLjQtMS0wLjVsMCwxMDkuN2wzMy4xLTguMgoJCQljMCwwLTEzLjUtOTEuMy0xMy42LTkyQzk1LjgsMjMuMyw5NS4zLDIyLjksOTQuOCwyMi45eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01OCwzOS45bC0zLjgsMTQuNGMwLDAtNC4zLTItOS40LTEuNmMtNy41LDAuNS03LjUsNS4yLTcuNSw2LjRjMC40LDYuNCwxNy4zLDcuOCwxOC4zLDIyLjkKCQkJYzAuNywxMS45LTYuMywyMC0xNi40LDIwLjZjLTEyLjIsMC44LTE4LjktNi40LTE4LjktNi40bDIuNi0xMWMwLDAsNi43LDUuMSwxMi4xLDQuN2MzLjUtMC4yLDQuOC0zLjEsNC43LTUuMQoJCQljLTAuNS04LjQtMTQuMy03LjktMTUuMi0yMS43Yy0wLjctMTEuNiw2LjktMjMuNCwyMy43LTI0LjRDNTQuNywzOC4yLDU4LDM5LjksNTgsMzkuOXoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K';

  private async _checkShopPlan(applicationInstall: ApplicationInstall): Promise<void> {
    const requestDto = this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.GET, SHOP_INFO_URL);

    const res = await this._curlSender.send(requestDto, [200, 404]);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { shop } = res.jsonBody as { shop: { plan_name: string } };
    let premium = false;
    if (shop.plan_name !== 'basic') {
      premium = true;
    }

    this._setPremium(applicationInstall, premium);
  }

  private _setPremium = (applicationInstall: IApplicationSettings, premium: boolean): ApplicationInstall => {
    const settings = applicationInstall.getSettings();

    settings[PREMIUM_PLAN] = premium;
    return applicationInstall.addSettings(settings);
  };
}
