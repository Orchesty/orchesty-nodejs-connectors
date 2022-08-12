import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WooCommerceApplication from '../WooCommerceApplication';

const BATCH_UPDATE_WEBHOOKS = 'wp-json/wc/v3/webhooks/batch';

export default class WooCommerceUnsubscribeWebhooks extends AConnector {
  public getName = (): string => 'woocommerce-unsubscribe-webhooks';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as WooCommerceApplication;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const repo = await this._dbClient.getRepository(Webhook);
    const webhooks = await repo.findMany({ user: appInstall.getUser(), application: app.getName() });

    const webhooksIds: number[] = [];

    webhooks.forEach((webhook) => {
      webhooksIds.push(Number(webhook.getWebhookId()));
    });

    if (webhooks && webhooks.length > 0) {
      const requestDto = await app.getRequestDto(
        dto,
        appInstall,
        HttpMethods.POST,
        BATCH_UPDATE_WEBHOOKS,
        JSON.stringify({ delete: webhooksIds }),
      );
      const res = await this._sender.send(requestDto);
      if (res.responseCode !== 200 && res.responseCode !== 404) {
        await Promise.all(
          webhooks.map(async (wantedDelete) => {
            wantedDelete.setUnsubscribeFailed(true);
            await repo.update(wantedDelete);
          }),
        );
        throw new OnRepeatException(60, 10, res.body);
      }

      let repeat = false;
      const resData = (res.jsonBody as IResponseJson).delete;
      await Promise.all(
        webhooks.map(async (wantedDelete) => {
          const foundWebhook = resData?.find(
            (item) => item.id.toString() === wantedDelete.getWebhookId(),
          );
          if (foundWebhook) {
            await repo.remove(wantedDelete);
          } else {
            repeat = true;
            wantedDelete.setUnsubscribeFailed(true);
            await repo.update(wantedDelete);
          }
        }),
      );

      if (repeat) {
        throw new OnRepeatException(60, 10, res.body);
      }
    }

    return dto;
  }
}

interface IResponseJson {
  delete: [
    {
      id: number;
    }
  ];
}
