import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import UpgatesApplication from '../UpgatesApplication';

export const NAME = 'upgates-delete-webhooks';
const UPGATES_DELETE_WEBHOOK_ENDPOINT = 'api/v2/webhooks';

export default class UpgatesDeleteWebhooks extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const app = this.getApplication<UpgatesApplication>();

        let appInstall: ApplicationInstall;
        try {
            appInstall = await this.getApplicationInstallFromProcess(dto, null, true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            appInstall = await this.getApplicationInstallFromProcess(dto, null, false);
        }

        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const webhooks = (await repo.findMany({ users: [appInstall.getUser()], apps: [app.getName()] }))
            .filter((item) => !item.getUnsubscribeFailed());

        const webhooksIds: number[] = [];

        webhooks.forEach((webhook) => {
            webhooksIds.push(Number(webhook.getWebhookId()));
        });

        if (webhooks && webhooks.length > 0) {
            const requestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.DELETE,
                `${UPGATES_DELETE_WEBHOOK_ENDPOINT}?ids=${webhooksIds.join(';')}`,
            );
            const res = await this.getSender().send<IResponse>(requestDto);
            if (res.getResponseCode() !== StatusCodes.OK && res.getResponseCode() !== StatusCodes.NOT_FOUND) {
                await Promise.all(
                    webhooks.map(async (wantedDelete) => {
                        wantedDelete.setUnsubscribeFailed(true);
                        return repo.update(wantedDelete);
                    }),
                );
                throw new OnRepeatException(60, 10, res.getBody());
            }

            let repeat = false;
            const resData = res.getJsonBody().webhooks;
            await Promise.all(
                webhooks.map(async (wantedDelete) => {
                    const foundWebhook = resData?.find(
                        (item) => String(item.id) === wantedDelete.getWebhookId(),
                    );
                    if (foundWebhook) {
                        return repo.remove(wantedDelete);
                    }

                    repeat = true;
                    wantedDelete.setUnsubscribeFailed(true);
                    return repo.update(wantedDelete);
                }),
            );

            if (repeat) {
                throw new OnRepeatException(60, 10, res.getBody());
            }
        }

        return dto;
    }

}

export interface IResponse {
    webhooks: IWebhook[]
}

export interface IWebhook {
    id: string|number;

    deleted: boolean;
    messages: string[];
}
