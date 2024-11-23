import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { StatusCodes } from 'http-status-codes';

export const ZENDESK_DELETE_WEBHOOK = 'zendesk-delete-webhook';

export default class ZendeskDeleteWebhookConnector extends ABatchNode {

    public getName(): string {
        return ZENDESK_DELETE_WEBHOOK;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication();
        const appInstall = await this.getApplicationInstallFromProcess(dto, null);
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const webhook = await repo.findOne({ users: [appInstall.getUser()], apps: [appInstall.getName()] });

        if (webhook) {
            const url = `/webhooks/${webhook.getWebhookId()}`;
            const requestDto = await app.getRequestDto(dto, appInstall, HttpMethods.DELETE, url);
            const res = await this.getSender().send(requestDto);
            if (res.getResponseCode() !== StatusCodes.OK && res.getResponseCode() !== StatusCodes.NOT_FOUND) {
                webhook.setUnsubscribeFailed(true);
                await repo.update(webhook);
                throw new OnRepeatException(300, 12, res.getBody());
            }
            await repo.remove(webhook);
            dto.setBatchCursor('1', true);
        }

        return dto;
    }

}
