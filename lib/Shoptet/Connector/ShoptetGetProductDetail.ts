import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-product-detail';

export default class ShoptetGetProductDetail extends AShoptetConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { code } = dto.jsonData as IInput;

    const url = `api/products/code/${code}`;

    const response = await this._doRequest(url, dto) as IResponse;

    dto.jsonData = response.data;

    return dto;
  }
}

export interface IInput {
  code: string
}

interface IResponse {
  data: IOutput;
}

export interface IOutput {
    guid: string;
    type: string;
    brand: {
      code: string;
      name: string;
    };
    visibility: string;
    creationTime: Date;
    changeTime: Date;
    shortDescription: string;
    description: string;
    metaDescription: string;
    name: string;
    supplier: {
      guid: string;
      name: string;
    };
    defaultCategory: {
      guid: string;
      name: string;
    };
    url: string;
    variants: IVariant[];
    internalNote: string;
    images: {
      name: string;
      seoName: string;
      cdnName: string;
      priority: number;
      description: string;
      changeTime: Date;
    }[];
    categories: {
      guid: string;
      name: string;
      parentGuid: string;
    }[];
    flags: {
      code: string;
      title: string;
      dateFrom: string;
      dateTo: string;
    }[];
    descriptiveParameters: {
      name: string;
      value: string;
      description: string;
      priority: number;
    }[];
    surchargeParameters: {
      code: string;
      name: string;
      displayName: string;
      description: string;
      priority: number;
      required: boolean;
      currency: string;
      includingVat: boolean;
      values: {
        valueIndex: string;
        description: string;
        price: string;
        priority: number;
        visible: boolean;
      }[];
    }[];
    setItems: {
      guid: string;
      code: string;
      amount: string;
    }[];
    filteringParameters: {
      code: string;
      name: string;
      displayName: string;
      description: string;
      priority: number;
      googleMapping: {
        value: string;
        description: string;
      };
      values: {
        valueIndex: string;
        name: string;
        priority: number;
        color: string;
        image: string;
      }[];
    }[];
    warranty: {
      id: number;
      inMonths: number;
      description: string;
    };
    additionalName: string;
    xmlFeedName: string;
    metaTitle: string;
    adult: boolean;
    atypicalBilling: boolean;
    atypicalShipping: boolean;
    allowIPlatba: boolean;
    allowOnlinePayments: boolean;
    sizeIdName: string;
    voteAverageScore: string;
    voteCount: number;
    gifts: {
      code: string;
      priority: number;
    }[];
  }

export interface IVariant {
  code: string;
  ean: string;
  stock: string;
  minStockSupply: string;
  unit: string;
  weight: string;
  visible: boolean;
  price: string;
  commonPrice: string;
  includingVat: boolean;
  vatRate: string;
  currencyCode: string;
  actionPrice: {
    price: string;
    fromDate: string;
    toDate: string;
  };
  image?: string;
  parameters: {
    paramName: string;
    paramIndex: string;
    paramValue: string;
    rawValue: string;
    color: string;
    image: string;
    valuePriority: number;
  }[];
  name: string;
  manufacturerCode: string;
  pluCode: string;
  isbn: string;
  serialNo: string;
  mpn: string;
  measureUnit: {
    packagingUnitId: number;
    packagingUnitName: string;
    packagingAmount: string;
    measureUnitId: number;
    measureUnitName: string;
    measureAmount: string;
    measurePrice: string;
  };
  availability: {
    id: number;
    name: string;
  };
  availabilityWhenSoldOut: {
    id: number;
    name: string;
  };
  negativeStockAllowed: string;
  recyclingFee: {
    id: number;
    category: string;
    fee: string;
    currency: string;
  };
  amountDecimalPlaces: number;
  heurekaCPC: string;
  zboziCZ: {
    maximalCPC: string;
    maximalSearchCPC: string;
    hidden: boolean;
  };
}