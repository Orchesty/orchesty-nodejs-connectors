import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';
import { ZendeskWebhook } from '../types/webhook.types';
import ZendeskApplication from '../ZendeskApplication';

export const ZENDESK_CREATE_WEBHOOK = 'zendesk-create-webhook';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-await-in-loop */

export default class ZendeskCreateWebhookConnector extends ABatchNode {

    public getName(): string {
        return ZENDESK_CREATE_WEBHOOK;
    }

    public async processAction(
        dto: BatchProcessDto<ZendeskCreateWebhookInput>,
    ): Promise<BatchProcessDto> {
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;

        const app = this.getApplication<ZendeskApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const registered = await repo.findMany({ users: [appInstall.getUser()], apps: [appInstall.getName()] });
        const all = app.getWebhookSubscriptions().map((sub) => ({
            event: sub.getName(),
            token: this.getRandomToken(),
            node: sub.getNode(),
            name: sub.getName(),
            topology: sub.getTopology(),
            events: JSON.parse(sub.getParameters().events || '[]'),
        }));

        const unregistered = all.filter((wh) => !registered.find((reg) => reg.getName() === wh.event));

        for (const toRegister of unregistered) {
            const reqBody = {
                webhook: {
                    endpoint: TopologyRunner.getWebhookUrl(
                        toRegister.topology,
                        toRegister.node,
                        toRegister.token,
                    ),
                    http_method: 'POST',
                    name: toRegister.name,
                    request_format: 'json',
                    status: 'active',
                    subscriptions: toRegister.events,
                },
            };

            const requestDto = await app.getRequestDto(dto, appInstall, HttpMethods.POST, '/webhooks', reqBody);
            const data = (await this.getSender().send<Response>(requestDto)).getJsonBody();

            await repo.insert(
                new Webhook()
                    .setWebhookId(data.webhook.id)
                    .setUser(appInstall.getUser())
                    .setNode(toRegister.node)
                    .setToken(toRegister.token)
                    .setApplication(app.getName())
                    .setTopology(toRegister.topology)
                    .setName(data.webhook.name),
            );
        }

        return dto;
    }

    protected getData(dto: ProcessDto<ZendeskCreateWebhookInput>): ZendeskCreateWebhookInput {
        return dto.getJsonData();
    }

    protected getRandomToken(): string {
        return crypto.randomBytes(64).toString('hex');
    }

}

interface Response {
    webhook: ZendeskWebhook;
}

export interface ZendeskCreateWebhookInput {
    topology: string;
    node: string;
    name: string;
    events: string[];
}
