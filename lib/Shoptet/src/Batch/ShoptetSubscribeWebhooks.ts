import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import * as crypto from 'crypto';
import ABaseShoptet, { BASE_URL } from '../ABaseShoptet';

export const NAME = 'shoptet-subscribe-webhooks';

const REGISTER_WEBHOOKS_ENDPOINT = 'api/webhooks';

export default class ShoptetSubscribeWebhooks extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const app = this.getApplication<ABaseShoptet>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const registered = await repo.findMany({ users: [appInstall.getUser()], apps: [appInstall.getName()] });
        const all = app.getWebhookSubscriptions().map((sub) => ({
            event: sub.getName(),
            token: this.getRandomToken(),
            node: sub.getNode(),
            topology: sub.getTopology(),
        }));

        const unregistered = all.filter((wh) => !registered.find((reg) => reg.getName() === wh.event));
        if (unregistered.length) {
            const body = {
                data: unregistered.map(({ event, topology, node, token }) => ({
                    event,
                    url: TopologyRunner.getWebhookUrl(topology, node, token),
                })),
            };

            const url = `${BASE_URL}/${REGISTER_WEBHOOKS_ENDPOINT}`;
            const requestDto = await app.getRequestDto(dto, appInstall, HttpMethods.POST, url, JSON.stringify(body));
            const res = await this.getSender().send<IResponseJson>(requestDto, { success: 201, stopAndFail: 422 });

            const respBody = res.getJsonBody();

            await Promise.all(respBody.data.webhooks.map(async (webhook) => {
                const located = unregistered.find((value) => value.event === webhook.event);
                if (located) {
                    const wb = new Webhook()
                        .setWebhookId(webhook.id.toString())
                        .setUser(appInstall.getUser())
                        .setNode(located.node)
                        .setToken(located.token)
                        .setApplication(app.getName())
                        .setTopology(located.topology)
                        .setName(webhook.event);

                    return repo.insert(wb);
                }

                return undefined;
            }));
        }

        dto.removeLimiter();

        return dto;
    }

    private getRandomToken(): string {
        return crypto.randomBytes(64).toString('hex');
    }

}

interface IResponseJson {
    data: {
        webhooks: [{
            id: number;
            event: string;
            url: string;
            created: Date;
            updated: Date;
        }];
    };
}

export interface IOutputJson {
    id: number;
}
