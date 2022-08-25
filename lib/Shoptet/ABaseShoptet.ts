import { ILimitedApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/ILimitedApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const BASE_URL = 'https://api.myshoptet.com';

export default abstract class ABaseShoptet extends ABasicApplication implements ILimitedApplication {

    protected abstract authorizationHeader: string;

    protected limiter: IShoptetLimiter = {
        time: 1,
        amount: 3,
        groupTime: 1,
        groupAmount: 50,
    };

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

    public injectLimit(
        dto: ProcessDto,
        appInstall: ApplicationInstall,
    ): ProcessDto {
        dto.setLimiterWithGroup(
            `${appInstall.getUser()}|${appInstall.getName()}`,
            this.limiter.time,
            this.limiter.amount,
            appInstall.getName(),
            this.limiter.groupTime,
            this.limiter.groupAmount,
        );

        return dto;
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

    protected async startTopology(
        topology: string,
        node: string,
        user: string,
        data?: Record<string, unknown>,
    ): Promise<void> {
        await this.runner.runByName(data ?? {}, topology, node, new ProcessDto(), user);
    }

}

export interface IShoptetLimiter {
    time: number;
    amount: number;
    groupTime: number;
    groupAmount: number;
}
