import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { IResponseJson as IOutput } from '../Batch/WooCommerceGetOrders';

export const NAME = 'woo-commerce-update-order';

export default class WooCommerceUpdateOrder extends AConnector {
  public getName = (): string => NAME;

  public processAction = async (_dto: ProcessDto<IInput>): Promise<ProcessDto> => {
    const dto = _dto;

    const { id, status } = dto.jsonData;

    const requestDto = await this._application.getRequestDto(
      dto,
      await this._getApplicationInstallFromProcess(dto),
      HttpMethods.PUT,
      `wp-json/wc/v3/orders/${id}`,
      { status },
    );

    dto.jsonData = (await this._sender.send(requestDto, [200])).jsonBody as IOutput;

    return dto;
  };
}

export interface IInput {
  id: number,
  status: string,
}
