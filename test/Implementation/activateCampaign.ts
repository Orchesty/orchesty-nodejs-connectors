import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ActiveCampaignApplication, {
    APPLICATION_KEY, NAME as ACTIVATECAMPAIGN_APP,
    SUBDOMAIN } from '../../lib/ActiveCampaign/ActiveCampaignApplication';
import ActiveCampaignListAccountsBatch from '../../lib/ActiveCampaign/Batch/ActiveCampaignListAccountsBatch';
import ActivateCampaignCreateAccountConnector
    from '../../lib/ActiveCampaign/Connector/ActivateCampaignCreateAccountConnector';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(ACTIVATECAMPAIGN_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [APPLICATION_KEY]: 'token',
            [SUBDOMAIN]: 'subdomain',
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
