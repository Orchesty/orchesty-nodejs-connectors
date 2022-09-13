import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { createFailRange } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
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
        const repo = await this.getDbClient().getRepository(Webhook);
        const app = this.getApplication<ABaseShoptet>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const dbWh = await repo.findOne({ user: appInstall.getUser(), application: appInstall.getName() });
        if (!dbWh) {
            const whData = app.getWebhookSubscriptions().map((sub) => ({
                event: sub.getName(),
                token: this.getRandomToken(),
                node: sub.getNode(),
                topology: sub.getTopology(),
            }));
            const body = {
                data: app.getWebhookSubscriptions().map((sub, index) => ({
                    event: whData[index].event,
                    url: TopologyRunner.getWebhookUrl(whData[index].topology, whData[index].node, whData[index].token),
                })),
            };

            const url = `${BASE_URL}/${REGISTER_WEBHOOKS_ENDPOINT}`;
            const requestDto = await app.getRequestDto(dto, appInstall, HttpMethods.POST, url, JSON.stringify(body));
            const res = await this.getSender().send<IResponseJson>(requestDto, [201, createFailRange(422)]);

            const respBody = res.getJsonBody();

            await Promise.all(respBody.data.webhooks.map((webhook) => {
                const located = whData.find((value) => value.event === webhook.event);
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
