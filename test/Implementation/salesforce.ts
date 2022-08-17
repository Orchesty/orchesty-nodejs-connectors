import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import SalesForceApplication, { INSTANCE_NAME, NAME as SALESFORCE_APP }
  from '../../lib/SalesForce/SalesForceApplication';
import {
  appInstall,
  DEFAULT_ACCESS_TOKEN,
  DEFAULT_CLIENT_ID,
  DEFAULT_CLIENT_SECRET,
  DEFAULT_USER,
} from '../DataProvider';
import SalesForceCreateRecordConnector from '../../lib/SalesForce/Connector/SalesForceCreateRecordConnector';
import SalesForceUpdateRecordConnector from '../../lib/SalesForce/Connector/SalesForceUpdateRecordConnector';
import {
  container, db, oauth2Provider, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
  await appInstall(SALESFORCE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [INSTANCE_NAME]: 'hanaboso-dev-ed',
      [TOKEN]: {
        // eslint-disable-next-line max-len
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });

  const app = new SalesForceApplication(oauth2Provider);
  container.setApplication(app);

  const createRecord = new SalesForceCreateRecordConnector();
  const updateRecord = new SalesForceUpdateRecordConnector();

  createRecord
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createRecord);

  updateRecord
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(updateRecord);
}
