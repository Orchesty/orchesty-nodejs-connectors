import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import WflowApplication, { NAME as WFLOW_APP_NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-unsubscribe-webhooks-batch`;

export default class WflowUnsubscribeWebhookBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<WflowApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto, null);
        const repository = this.getDbClient().getRepository(Webhook) as WebhookRepository;

        const webhook = await repository.findOne({
            users: [appInstall.getUser()],
            apps: [appInstall.getName()],
        });

        if (!webhook) {
            return dto;
        }

        const organization: string | undefined
            = appInstall.getSettings()[ORGANIZATION_FORM]?.[ORGANIZATION];
        if (!organization) {
            return dto;
        }

        const request = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.DELETE,
            `/${organization}/webhookregistrations/${webhook.getWebhookId()}`,
        );

        const response = await this.getSender().send(request);

        if (response.getResponseCode() as number !== 200) {
            await repository.update(webhook.setUnsubscribeFailed(true));
            throw new OnRepeatException(300, 12, response.getBody());
        }

        await repository.remove(webhook);
        return dto.setBatchCursor('1', true);
    }

}
