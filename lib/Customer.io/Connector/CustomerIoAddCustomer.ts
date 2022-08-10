import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'customer-io-add-customer';

export default class CustomerIoAddCustomer extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { identifier, ...body } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      `customers/${identifier}`,
      body,

    );
    await this._sender.send(req, [200]);
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput{
  identifier: string
  id: string,
  email: string,
  anonymous_id: string,
  created_at: number,
  _update: boolean,
  Attributes1: string,
  Attributes2: string
}
/* eslint-enable @typescript-eslint/naming-convention */
