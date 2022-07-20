import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'alza-insetr-order-connector';

export default class AlzaInsetrOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { orderId, ...body } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      `order/${orderId}`,
      body,
    );
    const resp = await this._sender.send(req, [201]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IOutput{
  errorCode: number,
  errorMessage: string,
  supplierOrder: string,
  validUntil: string
}

export interface IInput{
  orderId: string,
  timestamp: string,
  customerId: number,
  supplierId: number,
  supplierBranchId: number,
  regNo: string,
  vatNo: string,
  itemsPriceCurrency: string,
  itemsPriceCountry: string,
  orderItems: [
    {
      orderItemId: number,
      code: string,
      quantity: number,
      purchasePriceWithoutFees: string,
      fees: {
        copyright: string,
        recycling: string,
      },
      alzaBarCodes: string[]
    }
  ]
}
