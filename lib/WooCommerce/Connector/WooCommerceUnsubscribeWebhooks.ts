import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WooCommerceApplication from '../WooCommerceApplication';

const BATCH_UPDATE_WEBHOOKS = 'wp-json/wc/v3/webhooks/batch';

export default class WooCommerceUnsubscribeWebhooks extends AConnector {

    public getName(): string {
        return 'woocommerce-unsubscribe-webhooks';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const app = this.getApplication<WooCommerceApplication>();

        const appInstall = await this.getApplicationInstallFromProcess(dto, null, true);

        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const webhooks = await repo.findMany({ users: [appInstall.getUser()], apps: [app.getName()] });

        const webhooksIds: number[] = [];

        webhooks.forEach((webhook) => {
            webhooksIds.push(Number(webhook.getWebhookId()));
        });

        if (webhooks && webhooks.length > 0) {
            const requestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.POST,
                BATCH_UPDATE_WEBHOOKS,
                JSON.stringify({ delete: webhooksIds }),
            );
            const res = await this.getSender().send<IResponseJson>(requestDto);
            if (res.getResponseCode() !== 200 && res.getResponseCode() !== 404) {
                await Promise.all(
                    webhooks.map(async (wantedDelete) => {
                        wantedDelete.setUnsubscribeFailed(true);
                        return repo.update(wantedDelete);
                    }),
                );
                throw new OnRepeatException(60, 10, res.getBody());
            }

            let repeat = false;
            const resData = res.getJsonBody().delete;
            await Promise.all(
                webhooks.map(async (wantedDelete) => {
                    const foundWebhook = resData?.find(
                        (item) => item.id.toString() === wantedDelete.getWebhookId(),
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

interface IResponseJson {
    delete: [
        {
            id: number;
        },
    ];
}
