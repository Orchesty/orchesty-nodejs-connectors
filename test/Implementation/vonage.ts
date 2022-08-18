import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

import VonageApplication, { API_KEY, NAME } from '../../lib/Vonage /VonageApplication';
import VonageSendSMSConnector from '../../lib/Vonage /Batch/VonageSendSMSConnector';

export default async function init(): Promise<void> {
  await appInstall(NAME, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'api_key',
    },
  });

  const app = new VonageApplication();
  container.setApplication(app);

  const sendSMS = new VonageSendSMSConnector();

  sendSMS
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(sendSMS);
}
