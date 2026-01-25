import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import crypto from 'crypto';
import WflowApplication, { NAME as WFLOW_APP_NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-subscribe-webhooks-batch`;

export default class WflowSubscribeWebhookBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<WflowApplication>();
        const subscriptions = app.getWebhookSubscriptions();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const repository = this.getDbClient().getRepository(Webhook) as WebhookRepository;

        const registeredEvents = (await repository.findMany({
            users: [appInstall.getUser()],
            apps: [appInstall.getName()],
        })).map((webhook) => webhook.getName());

        const unsubscribed = subscriptions.find(
            (subscription) => !registeredEvents.some(
                (event) => subscription.getName() === event,
            ),
        );

        if (!unsubscribed) {
            return dto;
        }

        const organization: string | undefined
            = appInstall.getSettings()[ORGANIZATION_FORM]?.[ORGANIZATION];
        if (!organization) {
            return dto;
        }

        const token = crypto.randomBytes(64).toString('hex');
        const request = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `/${organization}/webhookregistrations`,
            {
                actions: [unsubscribed.getName()],
                webhookUri: TopologyRunner.getWebhookUrl(
                    unsubscribed.getTopology(),
                    unsubscribed.getNode(),
                    token,
                ),
            },
        );

        const id = (
            await this.getSender().send<string>(request)
        ).getJsonBody();

        await repository.insert(
            new Webhook()
                .setWebhookId(id)
                .setUser(appInstall.getUser())
                .setNode(unsubscribed.getNode())
                .setToken(token)
                .setApplication(appInstall.getName())
                .setTopology(unsubscribed.getTopology())
                .setName(unsubscribed.getName()),
        );

        return dto.setBatchCursor('1', true);
    }

}
