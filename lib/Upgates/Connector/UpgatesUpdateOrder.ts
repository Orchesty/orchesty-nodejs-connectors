import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import UpgatesApplication from '../UpgatesApplication';

const UPDATE_ORDER_ENDPOINT = 'api/v2/orders';

export const NAME = 'upgates-update-order';

export default class UpgatesUpdateOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOrder[]>> {
        const app = this.getApplication<UpgatesApplication>();
        const {
            data,
        } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            UPDATE_ORDER_ENDPOINT,
            JSON.stringify(data),
        );

        const { orders } = (await this.getSender().send<IResponseJson>(requestDto)).getJsonBody();

        return dto.setNewJsonData(orders);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    data: IUpdateOrders;
}

interface IUpdateOrders {
    orders: IUpdate[];
    send_emails_yn?: boolean;
}

interface IUpdate {
    order_number: string;
    status?: string;
    status_id?: number;
    paid_date?: Date;
    tracking_code?: string;
    resolved_yn?: boolean;
    internal_note?: string;
    metas?: Record<string, string>[];
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
