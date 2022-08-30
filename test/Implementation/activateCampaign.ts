import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import ActiveCampaignApplication, {
    APPLICATION_TOKEN, NAME as ACTIVATECAMPAIGN_APP,
    SUBDOMAIN } from '../../lib/ActiveCampaign/ActiveCampaignApplication';
import ActiveCampaignListAccountsBatch from '../../lib/ActiveCampaign/Batch/ActiveCampaignListAccountsBatch';
import ActivateCampaignCreateAccountConnector
    from '../../lib/ActiveCampaign/Connector/ActivateCampaignCreateAccountConnector';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(ACTIVATECAMPAIGN_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [APPLICATION_TOKEN]: '02cb0fd359345bb1e6fd8b5ad298e205276bc6c9d8ecd580eeeb0210a0b8eda89ed3b8b8',
            [SUBDOMAIN]: 'https://testhanaboso.api-us1.com',
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
