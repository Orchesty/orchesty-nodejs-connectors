import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import Deleted from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Filters/Impl/Deleted';
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

        const appRepo = await this.getDbClient().getApplicationRepository();
        appRepo.disableFilter(Deleted.name);
        const appInstall = await this.getApplicationInstallFromProcess(dto, null);
        appRepo.enableFilter(Deleted.name);

        const repo = await this.getDbClient().getRepository(Webhook);

        repo.clearCache();
        const webhooks = await repo.findMany({ user: appInstall.getUser(), application: app.getName() });

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
