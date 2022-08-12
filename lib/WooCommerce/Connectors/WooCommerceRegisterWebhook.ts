import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';
import WooCommerceApplication from '../WooCommerceApplication';

const WOOCOMMERCE_REGISTER_WEBHOOK_ENDPOINT = 'wp-json/wc/v3/webhooks/batch';

export default class WooCommerceRegisterWebhook extends AConnector {
  public getName = (): string => 'woocommerce-register-webhook';

  private _getRandomToken = (): string => crypto.randomBytes(64).toString('hex');

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const app = this._application as WooCommerceApplication;

    const whData = app.getWebhookSubscriptions().map((sub) => ({
      topic: sub.getParameters().topic,
      token: this._getRandomToken(),
      node: sub.getNode(),
      topology: sub.getTopology(),
    }));
    const body = app.getWebhookSubscriptions().map((sub, index) => ({
      name: sub.getName(),
      topic: whData[index].topic,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      delivery_url: TopologyRunner.getWebhookUrl(whData[index].topology, whData[index].node, whData[index].token),
    }));

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const requestDto = await app.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      WOOCOMMERCE_REGISTER_WEBHOOK_ENDPOINT,
      JSON.stringify(body),
    );
    const repo = await this._dbClient.getRepository(Webhook);
    const res = await this._sender.send(requestDto, [200, 404]);
    const respBody = res.jsonBody as IResponseJson;

    await Promise.all(
      respBody.create.map(async (webhook) => {
        const located = whData.find((value) => value.topic === webhook.topic);
        if (located) {
          const wb = new Webhook()
            .setWebhookId(webhook.id.toString())
            .setUser(appInstall.getUser())
            .setNode(located.node)
            .setToken(located.token)
            .setApplication(app.getName())
            .setTopology(located.topology)
            .setName(webhook.topic);

          await repo.insert(wb);
        }
      }),
    );
    return dto;
  }
}

interface IResponseJson {
  create: [
    {
      id: number;
      name: string;
      status: string;
      topic: string;
      resource: string;
      event: string;
      hooks: string[];
      /* eslint-disable @typescript-eslint/naming-convention */
      delivery_url: string;
      date_created: string;
      date_created_gmt: string;
      date_modified: string;
      date_modified_gmt: string;
      _links: unknown;
      /* eslint-enable @typescript-eslint/naming-convention */
    }
  ];
}
