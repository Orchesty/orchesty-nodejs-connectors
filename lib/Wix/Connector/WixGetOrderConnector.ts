import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'wix-get-order-connector';

export default class WixGetOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { id } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `v2/orders/${id}`,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput{
  id: string
}

export interface IOutput{
  'order': {
    'id': string,
    'number': number,
    'dateCreated': string,
    'currency': string,
    'weightUnit': string,
    'totals': {
      'subtotal': string,
      'shipping': string,
      'tax': string,
      'discount': string,
      'total': string,
      'weight': string,
      'quantity': number
    },
    'billingInfo': {
      'paymentMethod': string,
      'externalTransactionId': string,
      'paymentProviderTransactionId': string,
      'address': {
        'fullName': {
          'firstName': string,
          'lastName': string
        },
        'country': string,
        'city': string,
        'zipCode': string,
        'phone': string,
        'email': string
      },
      'paidDate': string
    },
    'shippingInfo': {
      'deliveryOption': string,
      'shippingRegion': string,
      'estimatedDeliveryTime': string,
      'shipmentDetails': {
        'address': {
          'fullName': {
            'firstName': string,
            'lastName': string
          },
          'country': string,
          'city': string,
          'zipCode': string,
          'phone': string,
          'email': string
        },
        'discount': string,
        'tax': string,
        'priceData': {
          'taxIncludedInPrice': boolean,
          'price': string
        }
      }
    },
    'read': boolean,
    'archived': boolean,
    'paymentStatus': string,
    'fulfillmentStatus': string,
    'lineItems': [ {
      'index': number,
      'quantity': number,
      'price': string,
      'name': string,
      'productId': string,
      'totalPrice': string,
      'lineItemType': string,
      'options': [],
      'customTextFields': [],
      'weight': string,
      'sku': string,
      'discount': string,
      'tax': string,
      'taxIncludedInPrice': boolean,
      'priceData': {
        'taxIncludedInPrice': boolean,
        'price': string,
        'totalPrice': string
      }
    }],
    'activities': [
      {
        'type': string,
        'timestamp': string
      },
      {
        'type': string,
        'timestamp': string
      }
    ],
    'fulfillments': [],
    'discount': {'value': string},
    'buyerLanguage': string,
    'channelInfo': {'type': string},
    'enteredBy': {
      'id': string,
      'identityType': string
    },
    'lastUpdated': string
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
