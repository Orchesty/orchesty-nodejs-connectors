import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-product-detail';

export default class ShoptetGetProductDetail<T = IOutput> extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<T>> {
        const { guid } = dto.getJsonData();

        const url = `api/products/${guid}`;

        const response = await this.doRequest(url, dto) as IResponse;

        return this.processResult(dto, response);
    }

    protected processResult(dto: ProcessDto, response: IResponse): ProcessDto<T> {
        return dto.setNewJsonData<T>(response.data as unknown as T);
    }

}

export interface IInput {
    guid: string;
}

export interface IResponse {
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
    image?: string;
}
