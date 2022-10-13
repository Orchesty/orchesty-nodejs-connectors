import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';

export const BASE_URL = 'https://api.myshoptet.com';

export default abstract class ABaseShoptet extends ABasicApplication {

    protected abstract authorizationHeader: string;

    public constructor(
        private readonly runner: TopologyRunner,
    ) {
        super();
    }

    public static shoptetDateISO(
        date: Date | string,
        hourOffset?: number,
    ): string {
        if (!date) {
            return '';
        }
        try {
            const newDate = new Date(date);
            if (hourOffset) {
                newDate.setMinutes(newDate.getMinutes() + hourOffset * 60);
            }

            return `${newDate.toISOString().split('.')[0]}Z`;
        } catch (e) {
            throw new Error(`${date} is not in the correct format`);
        }
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

}
