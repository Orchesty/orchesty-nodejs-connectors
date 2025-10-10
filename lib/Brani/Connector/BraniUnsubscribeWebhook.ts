import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IOutput as IInput } from '../Batch/BraniListWebhooks';

export const NAME = 'brani-unsubscribe-webhook';

export default class BraniUnsubscribeWebhook extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, event_type } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.DELETE,
            `webhook/${id}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        await this.cleanWebhookFromDb(dto.getUser() ?? '', dto.getCurrentApp(), event_type);

        return dto.setNewJsonData(resp.getJsonBody());
    }

    private async cleanWebhookFromDb(user: string, app: string, event: string): Promise<void> {
        const repo = this.getDbClient().getRepository(Webhook) as WebhookRepository;
        const registered = await repo.findMany({ users: [user], apps: [app] });
        const deletedWebhook = registered.find((webhook) => webhook.getName() === event);
        if (deletedWebhook) {
            await repo.remove(deletedWebhook);
        }
    }

}

export interface IOutput {
    detail: string;
}
