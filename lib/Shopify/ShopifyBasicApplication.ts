import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import ABaseShopify from './ABaseShopify';

export default class ShopifyBasicApplication extends ABaseShopify {

    public async saveApplicationForms(applicationInstall: ApplicationInstall, settings: IApplicationSettings):
    Promise<ApplicationInstall> {
        const appInstall = await super.saveApplicationForms(applicationInstall, settings);
        try {
            await this.checkShopPlan(applicationInstall);
        } catch (e) {
            logger.error((e as { message?: string })?.message ?? 'Unknown error.', {}, true);
        }

        return appInstall;
    }

}
