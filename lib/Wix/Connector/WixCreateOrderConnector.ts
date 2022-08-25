import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'wix-create-order-connector';

export default class WixCreateOrderConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'v2/orders',
            { data: dto.getJsonData() },
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    order: {
        id: string;
        number: number;
        dateCreated: string;
        currency: string;
        weightUnit: string;
        totals: {
            subtotal: string;
            shipping: string;
            tax: string;
            discount: string;
            total: string;
            weight: string;
            quantity: number;
        };
        billingInfo: {
            paymentMethod: string;
            externalTransactionId: string;
            paymentProviderTransactionId: string;
            address: {
                fullName: {
                    firstName: string;
                    lastName: string;
                };
                country: string;
                city: string;
                zipCode: string;
                phone: string;
                email: string;
            };
            paidDate: string;
        };
        shippingInfo: {
            deliveryOption: string;
            estimatedDeliveryTime: string;
            shipmentDetails: {
                address: {
                    fullName: {
                        firstName: string;
                        lastName: string;
                    };
                    country: string;
                    city: string;
                    zipCode: string;
                    phone: string;
                    email: string;
                };
                discount: string;
                tax: string;
                priceData: {
                    taxIncludedInPrice: boolean;
                    price: string;
                };
            };
        };
        read: boolean;
        archived: boolean;
        paymentStatus: string;
        fulfillmentStatus: string;
        lineItems: [{
            index: number;
            quantity: number;
            name: string;
            productId: string;
            lineItemType: string;
            options: [];
            customTextFields: [];
            weight: string;
            sku: string;
            discount: string;
            tax: string;
            priceData: {
                taxIncludedInPrice: boolean;
                price: string;
                totalPrice: string;
            };
        }];
        activities: [
            {
                type: string;
                timestamp: string;
            },
            {
                type: string;
                timestamp: string;
            },
        ];
        fulfillments: [];
        discount: { value: string };
        buyerLanguage: string;
        channelInfo: { type: string };
        enteredBy: {
            id: string;
            identityType: string;
        };
        lastUpdated: string;
    };
}

export interface IInput {

    order: {
        totals: {
            subtotal: string;
            shipping: string;
            tax: string;
            discount: string;
            total: string;
        };
        billingInfo: {
            paymentMethod: string;
            paymentProviderTransactionId: string;
            address: {
                fullName: {
                    firstName: string;
                    lastName: string;
                };
                country: string;
                city: string;
                zipCode: string;
                phone: string;
                email: string;
            };
        };
        shippingInfo: {
            deliveryOption: string;
            estimatedDeliveryTime: string;
            shippingRegion: string;
            shipmentDetails: {
                address: {
                    fullName: {
                        firstName: string;
                        lastName: string;
                    };
                    country: string;
                    city: string;
                    zipCode: string;
                    phone: string;
                    email: string;
                };
                tax: string;
                priceData: {
                    taxIncludedInPrice: boolean;
                    price: string;
                };
            };
        };
        paymentStatus: string;
        lineItems: [
            {
                quantity: number;
                discount: string;
                tax: string;
                name: string;
                productId: string;
                lineItemType: string;
                weight: string;
                sku: string;
                priceData: {
                    taxIncludedInPrice: boolean;
                    price: string;
                };
            },
        ];
        channelInfo: {
            type: string;
        };
    };
}
