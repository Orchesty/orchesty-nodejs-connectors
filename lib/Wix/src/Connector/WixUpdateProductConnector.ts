import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'wix-update-product-connector';

export default class WixUpdateProductConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { productId, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.PATCH,
            `v1/products/${productId}`,
            body,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    productId: string;
    product: {
        name: string;
        productType: string;
        priceData: {
            price: number;
        };
        description: string;
        sku: string;
        visible: boolean;
        weight: number;
        ribbon: string;
        brand: string;
        discount: {
            type: string;
            value: number;
        };
        productOptions: [
            {
                name: string;
                choices: [
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
        stock: {
            trackInventory: boolean;
            inStock: boolean;
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
            price: string;
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
        additionalInfoSections: [];
        ribbons: { text: string }[];
        media: { items: [] };
        customTextFields: [];
        manageVariants: boolean;
        productOptions: [{
            optionType: string;
            name: string;
            choices: [{
                value: string;
                description: string;
                inStock: boolean;
                visible: boolean;
            }];
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
        collectionIds: [];
        variants: [{
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
                weight: number;
                sku: string;
                visible: boolean;
            };
        }];
        lastUpdated: string;
        ribbon: string;
        brand: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
