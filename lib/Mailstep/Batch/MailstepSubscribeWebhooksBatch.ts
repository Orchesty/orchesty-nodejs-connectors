import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import { IWebhookQueryFilter } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { IPaging, ISorter } from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Repository';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import MailstepApplication, { ESHOP_ID, NAME as APPLICATION_NAME } from '../MailstepApplication';

export const NAME = `${APPLICATION_NAME}-subscribe-webhooks-batch`;

export default class MailstepSubscribeWebhooksBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const application = this.getApplication<MailstepApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const webhookRepository = this
            .getDbClient()
            .getRepository<Webhook, IWebhookQueryFilter, ISorter, IPaging>(Webhook);
        const eshopId = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ESHOP_ID];

        const webhookSubscriptions = application.getWebhookSubscriptions().map((webhookSubscription) => ({
            eshop: eshopId,
            event: webhookSubscription.getName(),
            topology: webhookSubscription.getTopology(),
            node: webhookSubscription.getNode(),
            token: crypto.randomBytes(64).toString('hex'),
        }));

        const subscribedWebhooks = await webhookRepository.findMany({
            users: [applicationInstall.getUser()],
            apps: [applicationInstall.getName()],
        });

        const unsubscribedWebhook = webhookSubscriptions.filter(
            ({ event }) => !subscribedWebhooks.find((subscribedWebhook) => subscribedWebhook.getName() === event),
        ).shift();

        if (!unsubscribedWebhook) {
            return dto;
        }

        const { eshop, event, topology, node, token } = unsubscribedWebhook;
        const requestDto = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            'eshop-webhook',
            {
                eshop,
                event,
                active: true,
                destination: TopologyRunner.getWebhookUrl(topology, node, token),
            },
        );

        const responseDto = await this.getSender().send<IResponse>(requestDto, [StatusCodes.CREATED]);

        await webhookRepository.insert(
            new Webhook()
                .setWebhookId(responseDto.getJsonBody().id)
                .setApplication(applicationInstall.getName())
                .setUser(applicationInstall.getUser())
                .setTopology(topology)
                .setNode(node)
                .setToken(token)
                .setName(event),
        );

        return dto.setBatchCursor('1', true);
    }

}

export interface IResponse {
    id: string;
    eshop: string;
    event: string;
    destination: string;
    active: boolean;
    createdAt: string;
    authentication?: {
        type?: string
        username?: string
        password?: string
        token?: string
    };
    changedAt?: string;
}
