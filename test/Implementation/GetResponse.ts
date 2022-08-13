import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';
import GetResponseApplication, { API_KEY, NAME } from '../../lib/GetResponse/GetResponseApplication';
import GetResponseGetAccountsConnector from '../../lib/GetResponse/Connector/GetResponseGetAccountsConnector';

export default async function init(): Promise<void> {
  await appInstall(NAME, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'api_key',
    },
  });

  const app = new GetResponseApplication();
  container.setApplication(app);

  const getAccounts = new GetResponseGetAccountsConnector();

  getAccounts
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getAccounts);
}
