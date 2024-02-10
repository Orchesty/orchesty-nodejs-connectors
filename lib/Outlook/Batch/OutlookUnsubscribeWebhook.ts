import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository, { IWebhookQueryFilter } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { StatusCodes } from 'http-status-codes';
import OutlookApplication from '../OutlookApplication';

export const NAME = 'outlook-unsubscribe-webhook';

export default class OutlookUnsubscribeWebhook extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { id } = dto.getJsonData();
        const app = this.getApplication<OutlookApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto, null, true);
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        let filter: IWebhookQueryFilter = { users: [appInstall.getUser()], apps: [app.getName()] };
        if (id) {
            filter = { ids: [id] };
        }

        const webhooks = await repo.findMany(filter);

        if (webhooks && webhooks.length > 0) {
            const webhookId = webhooks[0].getWebhookId();
            const requestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.DELETE,
                `/subscriptions/${webhookId}`,
            );

            const res = await this.getSender().send(requestDto);
            if (res.getResponseCode() !== StatusCodes.NO_CONTENT && res.getResponseCode() !== StatusCodes.NOT_FOUND) {
                webhooks[0].setUnsubscribeFailed(true);
                await repo.update(webhooks[0]);
                throw new OnRepeatException(60, 10, res.getBody());
            }

            await repo.remove(webhooks[0]);

            if (webhooks.length > 1) {
                dto.setBatchCursor('next', true);
            }
        }

        return dto;
    }

}

export interface IInput {
    id?: string;
}
