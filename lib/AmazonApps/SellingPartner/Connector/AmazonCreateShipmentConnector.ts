import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'amazon-create-shipment-connector';

export default class AmazonCreateShipmentConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'shipments',
      body,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput{
  clientReferenceId: string,
  shipTo: {
    name: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    stateOrRegion: string,
    city: string,
    countryCode: string,
    postalCode: string,
    email: string,
    copyEmails: [
      string
    ],
    phoneNumber: string
  },
  shipFrom: {
    name: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    stateOrRegion: string,
    city: string,
    countryCode: string,
    postalCode: string,
    email: string,
    copyEmails: [
      string
    ],
    phoneNumber: string
  },
  containers: [
    {
      containerType: string,
      containerReferenceId: string,
      value: {
        value: 0,
        unit: string
      },
      dimensions: {
        length: number,
        width: number,
        height: number,
        unit: string
      },
      items: [
        {
          quantity: number,
          unitPrice: {
            value: number,
            unit: string
          },
          unitWeight: {
            unit: string,
            value: number
          },
          title: string
        }
      ],
      weight: {
        unit: string,
        value: number
      }
    }
  ]
}

export interface IOutput{
  'shipmentId': string,
  'eligibleRates': [
    {
      'billedWeight': {
        'value': number,
        'unit': string
      },
      'totalCharge': {
        'value': number,
        'unit': string
      },
      'serviceType': string,
      'promise': {
        'deliveryWindow': {
          'start': string,
          'end': string
        },
        'receiveWindow': {
          'start': string,
          'end': string
        }
      },
      'rateId': string,
      'expirationTime': string
    }
  ]
}
