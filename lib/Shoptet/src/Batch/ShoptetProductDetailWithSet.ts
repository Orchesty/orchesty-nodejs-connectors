import { IApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import DataStorageManager from '@orchesty/nodejs-sdk/dist/lib/Storage/DataStore/DataStorageManager';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { PROCESS_ID } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { IResponse } from '../Connector/ShoptetGetProductDetail';
import PluginShoptetApplication from '../PluginShoptetApplication';

export const NAME = 'shoptet-product-detail-with-set';
const PRODUCT_SET = 'product-set';

export default class ShoptetProductDetailWithSet extends ABatchNode {

    public constructor(private readonly dataStorageManager: DataStorageManager) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto<IInput>> {
        const pageNumber = Number(dto.getBatchCursor('0'));
        const data = dto.getJsonData();
        const basicItems = data.items.reduce<Record<string, IItem>>((acc, it) => {
            if (it.itemType !== PRODUCT_SET) {
                acc[it.code] = it;
            }
            return acc;
        }, {});
        const setProducts = data.items.filter(({ itemType }) => itemType === PRODUCT_SET);

        const app = this.getApplication<PluginShoptetApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const item = setProducts[pageNumber];

        const user = appInstall.getUser();
        const appName = app.getName();
        const processId = dto.getHeader(PROCESS_ID) ?? '';

        if (setProducts.length === 0) {
            this.addItem(dto, data);
        } else if (pageNumber + 1 === setProducts.length) {
            const setItems = await this.requestDetail(dto, app, appInstall, item.productGuid);

            const storedData = [{
                items: setItems,
                price: item.itemPrice.withVat,
                amount: parseInt(item.amount, 10),
            }];
            if (setProducts.length !== 1) {
                const stored = await this.dataStorageManager.load(processId, appName, user);
                storedData.push(...stored.map((storedItem) => storedItem.getData()) as unknown as IDataStorageData[]);
            }

            storedData.forEach((sData) => {
                let totalAmount = 0;
                sData.items.forEach((it, index) => {
                    const basicItem = basicItems[it.code];
                    if (basicItem) {
                        basicItem.amount = String(
                            parseInt(it.amount, 10) * sData.amount + parseInt(basicItem.amount, 10),
                        );
                        sData.items.splice(index, 1);
                    } else {
                        totalAmount += parseInt(it.amount, 10) * sData.amount;
                    }
                });
                const pricePerItem = Number(item.itemPrice.withVat) / totalAmount || 1;
                sData.items.forEach((i) => {
                    basicItems[i.code] = {
                        code: i.code,
                        amount: String(parseInt(i.amount, 10) * sData.amount),
                        itemPrice: {
                            withVat: String(pricePerItem),
                        },
                        itemType: 'product',
                    } as unknown as IItem;
                });
            });
            data.items = Object.values(basicItems);

            this.addItem(dto, data);
        } else {
            const setItems = await this.requestDetail(dto, app, appInstall, item.productGuid);

            await this.dataStorageManager.store(processId, [{
                items: setItems,
                price: item.itemPrice.withVat || null,
                amount: item.amount,
            }], appName, user);

            dto.setBatchCursor(String(pageNumber + 1));
        }

        return dto;
    }

    protected addItem(dto: BatchProcessDto, data: IInput): void {
        dto.addItem(data);
    }

    private async requestDetail(
        dto: BatchProcessDto,
        app: IApplication,
        appInstall: ApplicationInstall,
        productGuid: string,
    ): Promise<IItem[]> {
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `api/products/${productGuid}?include=setItems`,
        );

        const res = await this.getSender().send<IResponse>(requestDto, [200]);

        const resData = res.getJsonBody();
        const { setItems } = resData.data;
        return setItems as unknown as IItem[];
    }

}

interface IDataStorageData {
    items: IItem[];
    price: string;
    amount: number;
}

export interface IInput {
    code: string;
    externalCode: string;
    creationTime: string;
    changeTime: string;
    email: string;
    phone: string;
    birthDate: string;
    clientCode: string;
    companyId: string;
    vatId: string;
    taxId: string;
    vatPayer: boolean;
    customerGuid: string;
    addressesEqual: boolean;
    cashDeskOrder: boolean;
    stockId: number;
    paid: boolean;
    adminUrl: string;
    onlinePaymentLink: string;
    language: string;
    referer: string;
    billingMethod: {
        name: string;
        id: number;
    };
    billingAddress: IAddress;
    deliveryAddress: IAddress;
    status: {
        id: number;
        name: string;
    };
    price: {
        vat: string;
        toPay: string;
        currencyCode: string;
        withVat: string;
        withoutVat: string;
        exchangeRate: string;
    };
    paymentMethod: {
        guid: string;
        name: string;
    } | null;
    shipping: {
        guid: string;
        name: string;
    };
    clientIPAddress: string;
    paymentMethods: {
        paymentMethod: {
            name: string;
            guid: string;
        };
        itemId: number;
    }[];
    shippings: {
        shipping: {
            name: string;
            guid: string;
        };
        itemId: number;
    }[];
    items: IItem[];
    notes: {
        customerRemark: string;
        eshopRemark: string;
        trackingNumber: string;
        trackingUrl: string;
        additionalFields: {
            index: number;
            label: string;
            text: string;
        }[];
    };
    shippingDetails: {
        branchId: string;
        name: string;
        note: string;
        place: string;
        street: string;
        city: string;
        zipCode: string;
        countryCode: string;
        link: string;
        latitude: string;
        longitude: string;
        carrierId: number;
    };
    surchargeParameters: [
        {
            parameterName: {
                code: string;
                name: string;
            };
            parameterValue: {
                description: string;
                price: string;
                valueIndex: string;
            };
        },
    ];
}

export interface IItem {
    productGuid: string;
    code: string;
    itemType: string;
    name: string;
    variantName: string;
    brand: string;
    supplierName: string;
    remark: string;
    weight: string;
    additionalField: string;
    amount: string;
    amountUnit: string;
    amountCompleted: string;
    priceRatio: string;
    itemPrice: {
        withoutVat?: string;
        vat?: string;
        vatRate?: string;
        withVat: string;
    };
    buyPrice: {
        withVat: string;
        withoutVat: string;
        vat: string;
        vatRate: string;
    };
    recyclingFee: {
        category: string;
        fee: string;
    };
    status: {
        id: number;
        name: string;
    };
    displayPrices: {
        withVat: string;
        withoutVat: string;
        vat: string;
        vatRate: string;
    }[];
    mainImage: {
        name: string;
        seoName: string;
        cdnName: string;
        priority: number;
        description: string;
        changeTime: string;
    };
    stockLocation: string;
    surchargeParameters: {
        parameterName: {
            code: string;
            name: string;
        };
        parameterValue: {
            valueIndex: string;
            description: string;
            price: string;
        };
    }[];
    surchargeParametersTexts: unknown[];
    itemId: number;
    warrantyDescription: string;
}

interface IAddress {
    fullName?: string | null;
    company?: string | null;
    street?: string | null;
    houseNumber?: string | null;
    city?: string | null;
    district?: string | null;
    additional?: string | null;
    zip?: string | null;
    countryCode?: string | null;
    regionName?: string | null;
    regionShortcut?: string | null;
}
