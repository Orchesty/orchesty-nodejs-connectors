import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import ActiveCampaignApplication, {
  NAME as ACTIVATECAMPAIGN_APP,
  APPLICATION_TOKEN, SUBDOMAIN,
} from '../../lib/ActiveCampaign/ActiveCampaignApplication';
import { container, db, sender } from '../TestAbstract';
import ActivateCampaignCreateAccountConnector
  from '../../lib/ActiveCampaign/Connector/ActivateCampaignCreateAccountConnector';

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

  createAccount
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createAccount);
}
