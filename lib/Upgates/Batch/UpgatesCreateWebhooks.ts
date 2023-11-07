import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import crypto from 'crypto';
import UpgatesApplication from '../UpgatesApplication';

export const NAME = 'upgates-create-webhooks';
const UPGATES_CREATE_WEBHOOK_ENDPOINT = 'api/v2/webhooks';

export default class UpgatesCreateWebhooks extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<UpgatesApplication>();

        const webhookIndex = Number(dto.getBatchCursor('0'));
        const webhooks = app.getWebhookSubscriptions();

        if (webhooks.length > 0) {
            const appInstall = await this.getApplicationInstallFromProcess(dto);
            const repo = this.getDbClient().getRepository(Webhook);

            const token = this.getRandomToken();
            const requestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.POST,
                UPGATES_CREATE_WEBHOOK_ENDPOINT,
                JSON.stringify({
                    name: webhooks[webhookIndex].getName(),
                    event: webhooks[webhookIndex].getName(),
                    url: TopologyRunner.getWebhookUrl(
                        webhooks[webhookIndex].getTopology(),
                        webhooks[webhookIndex].getNode(),
                        token,
                    ),
                }),
            );

            let res;
            try {
                res = await this.getSender().send<IResponse>(requestDto);
                const respBody = res.getJsonBody();

                await repo.insert(new Webhook()
                    .setWebhookId(respBody.webhook.id.toString())
                    .setUser(appInstall.getUser())
                    .setNode(webhooks[webhookIndex].getNode())
                    .setToken(token)
                    .setApplication(app.getName())
                    .setTopology(webhooks[webhookIndex].getTopology())
                    .setName(webhooks[webhookIndex].getName()));

                if (webhooks.length - 1 > webhookIndex) {
                    dto.setBatchCursor((webhookIndex + 1).toString());
                }
            } catch (e) {
                appInstall.setEnabled(false);
                await this.getDbClient().getRepository(ApplicationInstall).update(appInstall);

                dto.setStopProcess(ResultCode.STOP_AND_FAILED, res?.getBody() ?? 'Webhook could not be registered!');
            }
        }

        return dto;
    }

    private getRandomToken(): string {
        return crypto.randomBytes(64).toString('hex');
    }

}

export interface IResponse {
    webhook: {
        id: number;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        active_yn: boolean;
        name: string;
        url: string;
        event: string;
    };
}
