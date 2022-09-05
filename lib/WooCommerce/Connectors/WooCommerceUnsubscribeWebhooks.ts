import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import Deleted from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Filters/Impl/Deleted';
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

        const appRepo = await this.getDbClient().getApplicationRepository();
        appRepo.disableFilter(Deleted.name);
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        appRepo.enableFilter(Deleted.name);

        const repo = await this.getDbClient().getRepository(Webhook);
        const webhooks = await repo.findMany({ user: appInstall.getUser(), application: app.getName() });

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
