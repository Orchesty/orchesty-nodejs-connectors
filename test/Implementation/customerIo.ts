import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import {
  container, db, sender,
} from '../TestAbstract';
import CustomerIoApplication, { API_KEY, NAME, SITE_ID } from '../../lib/Customer.io/CustomerIoApplication';
import CustomerIoAddCustomer from '../../lib/Customer.io/Connector/CustomerIoAddCustomer';

export default async function init(): Promise<void> {
  await appInstall(NAME, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [SITE_ID]: 'site_id',
      [API_KEY]: 'api_key',
    },
  });

  const app = new CustomerIoApplication();
  container.setApplication(app);

  const addCustomer = new CustomerIoAddCustomer();

  addCustomer
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(addCustomer);
}
