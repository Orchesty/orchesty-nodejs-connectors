import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import crypto from 'crypto';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-register-webhook';

const SHOPIFY_REGISTER_WEBHOOK_ENDPOINT = 'admin/api/2024-01/webhooks.json';

export default class ShopifyRegisterWebhook extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<ShopifyApplication>();

        const webhookIndex = Number(dto.getBatchCursor('0'));
        const webhooks = app.getWebhookSubscriptions();

        if (webhooks.length > 0) {
            const appInstall = await this.getApplicationInstallFromProcess(dto);
            const repo = this.getDbClient().getRepository(Webhook);

            const token = this.getRandomToken();
            const requestDto = await app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.POST,
                SHOPIFY_REGISTER_WEBHOOK_ENDPOINT,
                JSON.stringify({
                    webhook: {
                        topic: webhooks[webhookIndex].getName(),
                        address: TopologyRunner.getWebhookUrl(
                            webhooks[webhookIndex].getTopology(),
                            webhooks[webhookIndex].getNode(),
                            token,
                        ),
                        format: 'json',
                    } }),
            );

            let res;
            try {
                res = await this.getSender().send<IResponseJson>(requestDto, [201]);
                const respBody = res.getJsonBody();

                await repo.insert(new Webhook()
                    .setWebhookId(respBody.webhook.id.toString())
                    .setUser(appInstall.getUser())
                    .setNode(webhooks[webhookIndex].getNode())
                    .setToken(token)
                    .setApplication(app.getName())
                    .setTopology(webhooks[webhookIndex].getTopology())
                    .setName(webhooks[webhookIndex].getName()));

                if (webhooks.length - 1 > webhookIndex) {
                    dto.setBatchCursor((webhookIndex + 1).toString());
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                appInstall.setEnabled(false);
                await this.getDbClient().getRepository(ApplicationInstall).update(appInstall);

                dto.setStopProcess(ResultCode.STOP_AND_FAILED, res?.getBody() ?? 'Webhook could not be registered!');
            }
        }

        return dto;
    }

    private getRandomToken(): string {
        return crypto.randomBytes(64).toString('hex');
    }

}

interface IResponseJson {
    webhook: {
        id: number;
        address: string;
        topic: string;
        /* eslint-disable @typescript-eslint/naming-convention */
        created_at: string;
        updated_at: string;
    /* eslint-enable @typescript-eslint/naming-convention */
    };
}
