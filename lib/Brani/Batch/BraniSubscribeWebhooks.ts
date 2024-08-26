import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import crypto from 'crypto';
import BraniApplication from '../BraniApplication';

export const NAME = 'brani-subscribe-webhooks';

export default class BraniSubscribeWebhooks extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const app = this.getApplication<BraniApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const registered = await repo.findMany({ users: [appInstall.getUser()], apps: [appInstall.getName()] });
        const all = app.getWebhookSubscriptions().map((sub) => ({
            event: sub.getName(),
            token: this.getRandomToken(),
            node: sub.getNode(),
            topology: sub.getTopology(),
        }));

        const unregistered = all.filter((wh) => !registered.find((reg) => reg.getName() === wh.event)).shift();
        if (unregistered) {
            const body = {
                event: unregistered.event,
                url: TopologyRunner.getWebhookUrl(unregistered.topology, unregistered.node, unregistered.token),
            };

            const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.POST, 'webhook', JSON.stringify(body));
            await this.getSender().send<IOutput>(requestDto, [200]);

            const wb = new Webhook()
                .setWebhookId('n/a')
                .setUser(appInstall.getUser())
                .setNode(unregistered.node)
                .setToken(unregistered.token)
                .setApplication(app.getName())
                .setTopology(unregistered.topology)
                .setName(unregistered.event);

            await repo.insert(wb);

            dto.setBatchCursor('next', true);
        }

        return dto;
    }

    private getRandomToken(): string {
        return crypto.randomBytes(64).toString('hex');
    }

}

export interface IOutput {
    detail: string;
}
