import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'wix-create-product-connector';

export default class WixCreateProductConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'v1/products',
            { data: dto.getJsonData() },
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    product: {
        name: string;
        productType: string;
        priceData: {
            price: number;
        };
        costAndProfitData: {
            itemCost: number;
        };
        description: string;
        sku: string;
        visible: boolean;
        ribbon: string;
        brand: string;
        weight: number;
        discount: {
            type: string;
            value: number;
        };
        manageVariants: boolean;
        productOptions: [
            {
                name: string;
                choices: [
                    {
                        value: string;
                        description: string;
                    },
                    {
                        value: string;
                        description: string;
                    },
                ];
            },
        ];
    };
}

export interface IOutput {
    product: {
        id: string;
        name: string;
        slug: string;
        visible: boolean;
        productType: string;
        description: string;
        weightRange: {
            minValue: number;
            maxValue: number;
        };
        stock: {
            trackInventory: boolean;
            inStock: boolean;
            inventoryStatus: string;
        };
        price: {
            currency: string;
            price: number;
            discountedPrice: number;
            formatted: {
                price: string;
                discountedPrice: string;
            };
        };
        priceData: {
            currency: string;
            price: number;
            discountedPrice: number;
            formatted: {
                price: string;
                discountedPrice: string;
            };
        };
        convertedPriceData: {
            currency: string;
            price: number;
            discountedPrice: number;
            formatted: {
                price: string;
                discountedPrice: string;
            };
        };
        priceRange: {
            minValue: number;
            maxValue: number;
        };
        costRange: {
            minValue: number;
            maxValue: number;
        };
        additionalInfoSections: [];
        ribbons: { text: string }[];
        media: { items: [] };
        customTextFields: [];
        manageVariants: boolean;
        productOptions: [{
            optionType: string;
            name: string;
            choices: [
                {
                    value: string;
                    description: string;
                    inStock: boolean;
                    visible: boolean;
                },
                {
                    value: string;
                    description: string;
                    inStock: boolean;
                    visible: boolean;
                },
            ];
        }];
        productPageUrl: {
            base: string;
            path: string;
        };
        numericId: string;
        inventoryItemId: string;
        discount: {
            type: string;
            value: number;
        };
        collectionIds: string[];
        variants: [
            {
                id: string;
                choices: { Size: string };
                variant: {
                    priceData: {
                        currency: string;
                        price: number;
                        discountedPrice: number;
                        formatted: {
                            price: string;
                            discountedPrice: string;
                        };
                    };
                    convertedPriceData: {
                        currency: string;
                        price: number;
                        discountedPrice: number;
                        formatted: {
                            price: string;
                            discountedPrice: string;
                        };
                    };
                    costAndProfitData: {
                        itemCost: number;
                        formattedItemCost: string;
                        profit: number;
                        formattedProfit: string;
                        profitMargin: number;
                    };
                    weight: number;
                    sku: string;
                    visible: boolean;
                };
            },
            {
                id: string;
                choices: { Size: string };
                variant: {
                    priceData: {
                        currency: string;
                        price: number;
                        discountedPrice: number;
                        formatted: {
                            price: string;
                            discountedPrice: string;
                        };
                    };
                    convertedPriceData: {
                        currency: string;
                        price: number;
                        discountedPrice: number;
                        formatted: {
                            price: string;
                            discountedPrice: string;
                        };
                    };
                    costAndProfitData: {
                        itemCost: number;
                        formattedItemCost: string;
                        profit: number;
                        formattedProfit: string;
                        profitMargin: number;
                    };
                    weight: number;
                    sku: string;
                    visible: boolean;
                };
            },
        ];
        lastUpdated: string;
        createdDate: string;
        ribbon: string;
        brand: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
