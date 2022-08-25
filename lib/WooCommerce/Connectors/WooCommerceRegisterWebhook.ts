import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import crypto from 'crypto';
import WooCommerceApplication from '../WooCommerceApplication';

const WOOCOMMERCE_REGISTER_WEBHOOK_ENDPOINT = 'wp-json/wc/v3/webhooks/batch';

export default class WooCommerceRegisterWebhook extends AConnector {

    public getName(): string {
        return 'woocommerce-register-webhook';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const app = this.getApplication<WooCommerceApplication>();

        const whData = app.getWebhookSubscriptions().map((sub) => ({
            topic: sub.getName(),
            token: this.getRandomToken(),
            node: sub.getNode(),
            topology: sub.getTopology(),
        }));
        const body = app.getWebhookSubscriptions().map((sub, index) => ({
            name: sub.getName(),
            topic: whData[index].topic,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            delivery_url: TopologyRunner.getWebhookUrl(whData[index].topology, whData[index].node, whData[index].token),
        }));

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            WOOCOMMERCE_REGISTER_WEBHOOK_ENDPOINT,
            JSON.stringify(body),
        );
        const repo = await this.getDbClient().getRepository(Webhook);
        const res = await this.getSender().send<IResponseJson>(requestDto, [200, 404]);
        const respBody = res.getJsonBody();

        await Promise.all(
            respBody.create.map((webhook) => {
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

                    return repo.insert(wb);
                }

                return undefined;
            }),
        );
        return dto;
    }

    private getRandomToken(): string {
        return crypto.randomBytes(64).toString('hex');
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
        },
    ];
}
