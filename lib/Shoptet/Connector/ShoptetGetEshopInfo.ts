import { createFailRange } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BASE_URL } from '../ABaseShoptet';
import APluginShoptetApplication from '../APluginShoptetApplication';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-eshop-info';

export default class ShoptetGetEshopInfo extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const url = `${BASE_URL}/api/eshop?include=orderStatuses,paymentMethods,shippingMethods`;

        const appInstall = await this.getApplicationInstallFromProcess(dto, null);
        const requestDto = await this
            .getApplication<APluginShoptetApplication>()
            .getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IResponse>(
            requestDto,
            [200, createFailRange(422)],
        );

        return dto.setNewJsonData(resp.getJsonBody().data);
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
