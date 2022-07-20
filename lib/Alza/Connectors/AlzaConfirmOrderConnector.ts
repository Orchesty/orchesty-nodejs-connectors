import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'alza-confirm-order-connector';

export default class AlzaConfirmOrderConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { orderId, ...body } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      `order/${orderId}/confirm`,
      body,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput{
  orderId: string,
  timestamp: string,
  customerId: number,
  supplierId: number,
  supplierBranchId: number,
  regNo: string,
  vatNo: string,
  shippingCarrier: {
    shippingCarrierCode: string,
    shippingCarrierDeliveryType: string
  },
  parcelShop: {
    parcelShopIdentification: string,
    parcelShopBranchCode: string
  },
  shipmentDeliveryType: string,
  shipmentShippingMode: string,
  demandedExpeditionDate: string,
  shipmentDepartureTime: string,
  cashOnDeliveryValue: number,
  cashOnDeliveryValueCurrency: string,
  paymentVS: string,
  deliveryAddress: {
    companyName: string,
    addressName: string,
    streetWithNumber: string,
    city: string,
    country: string,
    zip: string,
    phone: string,
    email: string,
    note: string
  }
}

export interface IOutput{
  errorCode: number,
  errorMessage: string
}
