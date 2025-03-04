import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import { IWebhookQueryFilter } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { IPaging, ISorter } from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Repository';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { StatusCodes } from 'http-status-codes';
import FapiApplication, { NAME as APPLICATION_NAME } from '../FapiApplication';

export const NAME = `${APPLICATION_NAME}-unsubscribe-webhooks-batch`;

export default class FapiUnsubscribeWebhooksBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const application = this.getApplication<FapiApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto, null);
        const webhookRepository = this
            .getDbClient()
            .getRepository<Webhook, IWebhookQueryFilter, ISorter, IPaging>(Webhook);

        const subscribedWebhook = await webhookRepository.findOne({
            users: [applicationInstall.getUser()],
            apps: [applicationInstall.getName()],
        });

        if (subscribedWebhook) {
            const requestDto = application.getRequestDto(
                dto,
                applicationInstall,
                HttpMethods.DELETE,
                `connections/${subscribedWebhook.getWebhookId()}`,
            );

            const responseDto = await this.getSender().send(requestDto);

            if (![StatusCodes.OK, StatusCodes.NOT_FOUND].includes(responseDto.getResponseCode())) {
                await webhookRepository.update(subscribedWebhook.setUnsubscribeFailed(true));

                throw new OnRepeatException(300, 12, responseDto.getBody());
            }

            await webhookRepository.remove(subscribedWebhook);
            dto.setBatchCursor('1', true);
        }

        return dto;
    }

}
