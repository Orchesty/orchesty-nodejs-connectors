import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ActiveCampaignApplication, {
    APPLICATION_KEY, NAME as ACTIVATECAMPAIGN_APP,
    SUBDOMAIN } from '../src/ActiveCampaignApplication';
import ActiveCampaignListAccountsBatch from '../src/Batch/ActiveCampaignListAccountsBatch';
import ActivateCampaignCreateAccountConnector
    from '../src/Connector/ActivateCampaignCreateAccountConnector';

export default function init(): void {
    appInstall(ACTIVATECAMPAIGN_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [APPLICATION_KEY]: 'token',
            [SUBDOMAIN]: 'subdomain',
        },
    });
    const app = new ActiveCampaignApplication();
    container.setApplication(app);

    container.setNode(new ActivateCampaignCreateAccountConnector(), app);
    container.setNode(new ActiveCampaignListAccountsBatch(), app);
}
