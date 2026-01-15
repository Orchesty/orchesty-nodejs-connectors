import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'set-order-status';

export default class SetOrderStatus extends ABaseConnector<IInput, unknown> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'setOrderStatus';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(dto: ProcessDto<IInput>): Promise<object> {
        const { orderId, statusId } = dto.getJsonData();

        return {
            order_id: orderId,
            status_id: statusId,
        };
    }

}

export interface IInput {
    orderId: number
    statusId: number
}
