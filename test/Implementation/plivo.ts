import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import PlivoApplication, { AUTH_ID, AUTH_TOKEN, NAME } from '../../lib/Plivo/PlivoApplication';
import { container, db, sender } from '../TestAbstract';
import PlivoSendSMSConector from '../../lib/Plivo/Connector/PlivoSendSMSConector';

export default async function init(): Promise<void> {
  await appInstall(NAME, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [AUTH_ID]: 'AUTH_ID',
      [AUTH_TOKEN]: 'AUTH_TOKEN',
    },
  });

  const app = new PlivoApplication();
  container.setApplication(app);

  const sendSMS = new PlivoSendSMSConector();

  sendSMS
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(sendSMS);
}
