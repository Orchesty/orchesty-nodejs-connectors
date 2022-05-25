import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import UpgatesApplication from '../UpgatesApplication';

const UPDATE_ORDER_ENDPOINT = 'api/v2/orders';

export const NAME = 'upgates-update-order';

export default class UpgatesUpdateOrder extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as UpgatesApplication;
    const {
      userName,
      data,
    } = dto.jsonData as IInputJson;

    const appInstall = await this._getApplicationInstall(userName);
    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      UPDATE_ORDER_ENDPOINT,
      JSON.stringify(data),
    );

    const { orders } = (await this._sender.send(requestDto)).jsonBody as IResponseJson;

    dto.jsonData = orders;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IInputJson {
  userName: string;
  data: IUpdateOrders;
}

interface IUpdateOrders {
  send_emails_yn: boolean,
  orders: IUpdate[]
}

interface IUpdate {
  order_number: string,
  status: string,
  status_id: number,
  paid_date: Date,
  tracking_code: string,
  resolved_yn: boolean,
  internal_note: string,
  metas: Record<string, string>[]
}

interface IResponseJson {
  orders: IOrder[];
}

interface IOrder {
  order_number: string;
  order_url: string;
  updated_yn: string;
  messages: IMessage[];
}

interface IMessage {
  object: string;
  property: string;
  message: string;
}
