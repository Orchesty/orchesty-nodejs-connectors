import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'authentica-get-order-statuses';

export default class AuthenticaGetOrderStatuses extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    const requestDto = await this._application.getRequestDto(
      dto,
      await this._getApplicationInstallFromProcess(dto),
      HttpMethods.GET,
      'order-statuses',
    );

    const response = (await this._sender.send(requestDto, [200])).jsonBody as IResponse;

    dto.jsonData = response.data;

    return dto;
  }
}

export interface IOutput {
  id: string,
  title: string,
}

interface IResponse {
  data: IOutput[]
}
