import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'wix-create-order-connector';

export default class WixCreateOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'orders',
      { data: dto.jsonData as IInput },
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IOutput{
  order: {
    id: string,
    number: number,
    dateCreated: string,
    currency: string,
    weightUnit: string,
    totals: {
      subtotal: string,
      shipping: string,
      tax: string,
      discount: string,
      total: string,
      weight: string,
      quantity: number
    },
    billingInfo: {
      paymentMethod: string,
      externalTransactionId: string,
      paymentProviderTransactionId: string,
      address: {
        fullName: {
          firstName: string,
          lastName: string
        },
        country: string,
        city: string,
        zipCode: string,
        phone: string,
        email: string
      },
      paidDate: string
    },
    shippingInfo: {
      deliveryOption: string,
      estimatedDeliveryTime: string,
      shipmentDetails: {
        address: {
          fullName: {
            firstName: string,
            lastName: string
          },
          country: string,
          city: string,
          zipCode: string,
          phone: string,
          email: string
        },
        discount: string,
        tax: string,
        priceData: {
          taxIncludedInPrice: boolean,
          price: string
        }
      }
    },
    read: boolean,
    archived: boolean,
    paymentStatus: string,
    fulfillmentStatus: string,
    lineItems: [ {
      index: number,
      quantity: number,
      name: string,
      productId: string,
      lineItemType: string,
      options: [],
      customTextFields: [],
      weight: string,
      sku: string,
      discount: string,
      tax: string,
      priceData: {
        taxIncludedInPrice: boolean,
        price: string,
        totalPrice: string
      }
    }],
    activities: [
      {
        type: string,
        timestamp: string
      },
      {
        type: string,
        timestamp: string
      }
    ],
    fulfillments: [],
    discount: {value: string},
    buyerLanguage: string,
    channelInfo: {type: string},
    enteredBy: {
      id: string,
      identityType: string
    },
    lastUpdated: string
  }
}

export interface IInput{

  order: {
    totals: {
      subtotal: string,
      shipping: string,
      tax: string,
      discount: string,
      total: string
    },
    billingInfo: {
      paymentMethod: string,
      paymentProviderTransactionId: string,
      address: {
        fullName: {
          firstName: string,
          lastName: string
        },
        country: string,
        city: string,
        zipCode: string,
        phone: string,
        email: string
      }
    },
    shippingInfo: {
      deliveryOption: string,
      estimatedDeliveryTime: string,
      shippingRegion: string,
      shipmentDetails: {
        address: {
          fullName: {
            firstName: string,
            lastName: string
          },
          country: string,
          city: string,
          zipCode: string,
          phone: string,
          email: string
        },
        tax: string,
        priceData: {
          taxIncludedInPrice: boolean,
          price: string
        }
      }
    },
    paymentStatus: string,
    lineItems: [
      {
        quantity: number,
        discount: string,
        tax: string,
        name: string,
        productId: string,
        lineItemType: string,
        weight: string,
        sku: string,
        priceData: {
          taxIncludedInPrice: boolean,
          price: string
        }
      }
    ],
    channelInfo: {
      type: string
    }
  }
}
