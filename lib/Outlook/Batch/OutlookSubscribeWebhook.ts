import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import crypto from 'crypto';
import OutlookApplication from '../OutlookApplication';

export const NAME = 'outlook-subscribe-webhook';

export default class OutlookSubscribeWebhook extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<OutlookApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto, null, true);
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;

        let dbWebhooks: Webhook[] = [];
        if (dto.getBatchCursor('firstRun') === 'firstRun') {
            dbWebhooks = await repo.findMany({ users: [appInstall.getUser()], apps: [app.getName()] });
        }

        const webhookIndex = Number(dto.getBatchCursor('0'));
        const webhooks = app.getWebhookSubscriptions();

        if (webhooks.length > 0) {
            const webhook = webhooks[webhookIndex];
            const backendUrl = orchestyOptions.backend;
            const token = this.getRandomToken();
            const expiration = new Date();
            expiration.setDate(expiration.getDate() + 6);
            const requestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.POST,
                '/subscriptions',
                {
                    notificationUrl: `${backendUrl}/api/applications/${app.getName()}/sync/notificationCallback?pf_user=${dto.getUser()}&pf_wh_token=${token}&pf_topology=${webhook.getTopology()}&pf_node=${webhook.getNode()}`,
                    changeType: webhook.getParameters().changeType,
                    resource: webhook.getName(),
                    expirationDateTime: expiration.toISOString(),
                },
            );

            let res;
            try {
                res = await this.getSender().send<IResponseJson>(requestDto, [201]);
                const respBody = res.getJsonBody();

                await repo.insert(new Webhook()
                    .setWebhookId(respBody.id)
                    .setUser(appInstall.getUser())
                    .setNode(webhooks[webhookIndex].getNode())
                    .setToken(token)
                    .setApplication(app.getName())
                    .setTopology(webhooks[webhookIndex].getTopology())
                    .setName(webhooks[webhookIndex].getName()));

                if (webhooks.length - 1 > webhookIndex) {
                    dto.setItemList(dbWebhooks.map((w) => ({ id: w.getId() })));
                    dto.setBatchCursor((webhookIndex + 1).toString());
                }
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

export interface IResponseJson {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@odata.context': string;
    id: string;
    resource: string;
    applicationId: string;
    changeType: string;
    clientState: string;
    notificationUrl: string;
    expirationDateTime: string;
    creatorId: string;
    latestSupportedTlsVersion: string;
    notificationContentType: string;
}
