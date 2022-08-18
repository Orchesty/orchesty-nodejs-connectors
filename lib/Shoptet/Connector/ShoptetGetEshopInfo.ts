import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { BASE_URL } from '../ABaseShoptet';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-eshop-info';

export default class ShoptetGetEshopInfo extends AShoptetConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const url = `${BASE_URL}/api/eshop`;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const requestDto = new RequestDto(url, HttpMethods.GET, dto);
    requestDto.headers = {
      [CommonHeaders.AUTHORIZATION]: appInstall.getSettings()[AUTHORIZATION_FORM][TOKEN][ACCESS_TOKEN],
      [CommonHeaders.CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
    };
    const resp = await this._sender.send<IResponse>(requestDto, [200]);

    dto.jsonData = resp.jsonBody.data;

    return dto;
  }
}

interface IResponse {
  data: IOutput;
}

export interface IOutput {
  contactInformation: {
    eshopId: number;
    eshopName: string;
    eshopTitle: string;
    eshopCategory: string;
    eshopSubtitle: string;
    url: string;
    contactPerson: string;
    email: string;
    phone: string;
    mobilePhone: string;
    skypeAccount: string;
    contactPhotoUrl: string;
  };
  billingInformation: {
    companyId: string;
    taxId: string;
    vatId: string;
    billingName: string;
    address: {
      streetAddress: string;
      city: string;
      zip: string;
    };
    country: {
      countryCode: string;
      countryName: string;
    };
    registration: string;
    email: string;
    phone: string;
    billingEmail: string;
  };
  settings: {
    vatPayer: boolean;
    cashDeskOnly: boolean;
    trackStockClaims: boolean;
    maxProductAmount: number;
    maxEmailAmount: number;
    defaultPricelist: {
      id: number;
      name: string;
    };
    eshopLanguage: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    internals: string;
    exchangeRateFlip: boolean;
    negativeStockAmount: string;
  };
  currencies: {
    code: string;
    title: string;
    isDefault: boolean;
    isDefaultAdmin: boolean;
    isVisible: boolean;
    exchangeRate: string;
    priority: number;
    display: {
      text: string;
      location: string;
      decimalsSeparator: string;
      thousandsSeparator: string;
    };
    priceDecimalPlaces: number;
    rounding: string;
    minimalOrderValue: string;
    bankAccount: {
      accountNumber: string;
      iban: string;
      bic: string;
    };
  }[];
  taxClasses: {
    title: string;
    rates: {
      zone: string;
      vatRate: string;
    }[];
    isDefault: boolean;
  }[];
  activeModules: {
    name: string;
    title: string;
  }[];
  urls: {
    ident: string;
    url: string;
  }[];
  socialNetworks: {
    facebookUrl: string;
    facebookText: string;
    twitterAccount: string;
    instagramAccount: string;
  };
  orderAdditionalFields: {
    index: number;
    label: string;
  }[];
  orderStatuses: IOrderStatuses;
  shippingMethods: IShippingMethods;
  paymentMethods: IPaymentMethods;
  imageCuts: {
    name: string;
    width: number;
    height: number;
    urlPath: string;
    cdnPath: string;
  }[];
  countries: {
    countryCode: string;
    countryName: string;
    companyIdPattern: string;
    companyIdExample: string;
    zipCodePattern: string;
  }[];
  languages: {
    code: string;
    currencyCode: string;
    dateFormat: string;
    timeFormat: string;
    isVisible: boolean;
    isDefault: boolean;
    priority: number;
  }[];
  trial: boolean;
}

export interface IOrderStatuses {
  statuses: IOrderStatus[];
  defaultStatus: number;
}

export interface IOrderStatus {
  id: number;
  order: number;
  name: string;
  markAsPaid: boolean;
}

export interface IShippingMethods {
  retail: {
    methods: IShippingMethod[];
    defaultShipping: string;
  };
  wholesale: {
    methods: IShippingMethod[];
    defaultShipping: string;
  };
  wholesaleActive: boolean;
}

export interface IShippingMethod {
  guid: string;
  order: number;
  name: string;
  visible: boolean;
}

export interface IPaymentMethods {
  retail: {
    methods: {
      guid: string;
      order: number;
      name: string;
      visible: boolean;
    }[];
    defaultPayment: string;
  };
  wholesale: {
    methods: {
      guid: string;
      order: number;
      name: string;
      visible: boolean;
    }[];
    defaultPayment: string;
  };
  wholesaleActive: boolean;
}
