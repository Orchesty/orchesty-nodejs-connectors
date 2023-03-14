import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-unregister-webhook';

const SHOPIFY_UNREGISTER_WEBHOOK_ENDPOINT = 'admin/api/2022-10/webhooks/{id}.json';

export default class ShopifyUnregisterWebhook extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<ShopifyApplication>();

        const appInstall = await this.getApplicationInstallFromProcess(dto, null, true);

        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const webhooks = await repo.findMany({ users: [appInstall.getUser()], apps: [app.getName()] });

        if (webhooks && webhooks.length > 0) {
            const webhookId = webhooks[0].getWebhookId();
            const requestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.DELETE,
                SHOPIFY_UNREGISTER_WEBHOOK_ENDPOINT.replace('{id}', webhookId),
            );
            const res = await this.getSender().send(requestDto);
            if (res.getResponseCode() !== 200 && res.getResponseCode() !== 404) {
                webhooks[0].setUnsubscribeFailed(true);
                await repo.update(webhooks[0]);
                throw new OnRepeatException(60, 10, res.getBody());
            }

            await repo.remove(webhooks[0]);

            if (webhooks.length > 1) {
                dto.setBatchCursor('next');
            }
        }

        return dto;
    }

}
