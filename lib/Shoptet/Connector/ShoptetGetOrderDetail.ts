import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ShoptetPremiumApplication, { SHOPTET_API_HOST } from '../ShoptetPremiumApplication';

export const NAME = 'shoptet-get-order-detail';

const GET_ORDER_DETAIL_ENDPOINT = 'api/orders/{code}?include=shippingDetails';

export default class ShoptetGetOrderDetail extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as ShoptetPremiumApplication;
    const {
      userName,
      code,
    } = dto.jsonData as { userName: string, code: string };

    const order: IResponseJson = await this._doRequest(app, userName, code, dto);

    dto.jsonData = {
      ...order.data,
      userName,
    };

    return dto;
  }

  private async _doRequest(
    app: ShoptetPremiumApplication,
    userName: string,
    code: string,
    dto: ProcessDto,
  ): Promise<IResponseJson> {
    const url = `${SHOPTET_API_HOST}/${GET_ORDER_DETAIL_ENDPOINT.replace(
      '{code}',
      code,
    )}`;
    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      url,
    );
    const res = await this._sender.send(requestDto);

    if (res.responseCode < 400) {
      return res.jsonBody as IResponseJson;
    }
    if (res.responseCode < 500) {
      throw Error(res.body);
    }
    throw new OnRepeatException(60, 10, res.body);
  }
}

export interface IOrderJson {
  order: {
    code: string;
    creationTime: Date;
    email: string;
    phone: string;
    clientCode: string;
    companyId: string;
    vatId: string;
    taxId: string;
    paid: boolean;
    billingAddress: {
      company: string;
      fullName: string;
      street: string;
      houseNumber: string;
      city: string;
      additional: string;
      zip: string;
      regionName: string;
      regionShortcut: string;
      countryCode: string;
    };
    billingMethod: {
      name: string;
      id: number;
    };
    deliveryAddress: {
      company: string;
      street: string;
      houseNumber: string;
      city: string;
      fullName: string;
      zip: string;
      additional: string;
      regionShortcut: string;
      countryCode: string;
    };
    price: {
      withVat: string;
      itemType: string;
      currencyCode: string;
    };
    paymentMethod: {
      guid: string;
      name: string;
    };
    shipping: {
      guid: string;
      name: string;
    };
    items: [
      {
        code: string;
        itemType: string;
        amount: string;
        itemPrice: {
          withVat: string;
        };
        status: {
          id: number;
          name: string;
        };
      }
    ];
    shippingDetails: {
      branchId: string;
    };
    status: {
      id: number;
      name: string;
    };
  };
}

interface IResponseJson {
  data: IOrderJson;
}

export interface IOutputJson extends IOrderJson {
  userName: string;
}
