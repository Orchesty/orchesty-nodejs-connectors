import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import {
  appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER,
} from '../DataProvider';
import XeroApplication, { NAME as XERO_APP } from '../../lib/Xero/XeroApplication';
import {
  container, db, oauth2Provider, sender,
} from '../TestAbstract';
import XeroGetAccountsBatch from '../../lib/Xero/Batch/XeroGetAccountsBatch';

export default async function init(): Promise<void> {
  await appInstall(XERO_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
    },
  });

  const app = new XeroApplication(oauth2Provider);

  container.setApplication(app);
  const getAccounts = new XeroGetAccountsBatch();

  getAccounts
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(getAccounts);
}
