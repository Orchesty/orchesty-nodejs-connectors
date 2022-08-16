import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'authentica-post-orders';

export default class AuthenticaPutOrders extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const { orders } = dto.jsonData as IInput;

    const requestDto = await this._application.getRequestDto(
      dto,
      await this._getApplicationInstallFromProcess(dto),
      HttpMethods.PUT,
      'orders',
      orders,
    );

    const response = (await this._sender.send(requestDto, [200])).jsonBody as IOutput;

    dto.jsonData = response.data;

    return dto;
  }
}

export interface IOrder {
  orderNumber: string,
  destination: {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    province: string,
    country: string,
    zip: string
  },
  deliveryMethod: {
    id: number,
    branchId: string
  },
  paymentMethod: {
    codAmount: number,
    codCurrency: string
  },
  price: {
    totalPrice: number,
    currency: string
  },
  items: [
    {
      sku: string,
      quantity: number,
      unitPrice: number
    }
  ],
  variableSymbol: string
}

export interface IOutput {
  data: IOrder[]
}

export interface IInput {
  orders: IOrder[]
}
