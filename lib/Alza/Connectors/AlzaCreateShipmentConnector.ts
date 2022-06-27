import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AlzaApplication, { BASE_URL } from '../AlzaApplication';

export const NAME = 'alza-create-shipment-connector';
export const CREATE_SHIPMENT_URL = 'shipment';

export default class AlzaCreateShipmentConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as AlzaApplication;
    const requestDto = app.getRequestDto(
      dto,
      await this._getApplicationInstall(),
      HttpMethods.POST,
      `${BASE_URL}/${CREATE_SHIPMENT_URL}`,
      dto.data,
    );
    const response = await this._sender.send(requestDto, [200, 404]);
    const responseBody = response.jsonBody as IResponseJson;
    if (responseBody.errorCode < 0) {
      throw new Error(
        `Response return error code [${responseBody.errorCode}] and error message [${responseBody.errorMessage}]`,
      );
    }

    return dto;
  }
}

interface IResponseJson {
  errorCode: number,
  errorMessage: string
}
