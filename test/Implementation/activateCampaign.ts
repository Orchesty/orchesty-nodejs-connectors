import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import ActiveCampaignApplication, {
    APPLICATION_TOKEN, NAME as ACTIVATECAMPAIGN_APP,
    SUBDOMAIN,
} from '../../lib/ActiveCampaign/ActiveCampaignApplication';
import ActiveCampaignListAccountsBatch from '../../lib/ActiveCampaign/Batch/ActiveCampaignListAccountsBatch';
import ActivateCampaignCreateAccountConnector
    from '../../lib/ActiveCampaign/Connector/ActivateCampaignCreateAccountConnector';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(ACTIVATECAMPAIGN_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [APPLICATION_TOKEN]: DEFAULT_ACCESS_TOKEN,
            [SUBDOMAIN]: 'company',
        },
    });
    const app = new ActiveCampaignApplication();
    container.setApplication(app);

    const createAccount = new ActivateCampaignCreateAccountConnector();
    const listAccounts = new ActiveCampaignListAccountsBatch();

    createAccount
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createAccount);

    listAccounts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listAccounts);
}
