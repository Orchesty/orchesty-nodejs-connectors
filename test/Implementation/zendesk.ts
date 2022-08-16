import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ZendeskApplication, { NAME as ZENDESK_APP, SUBDOMAIN } from '../../lib/Zendesk/ZendeskApplication';
import {
  appInstall,
  DEFAULT_ACCESS_TOKEN,
  DEFAULT_USER,
} from '../DataProvider';
import ZendeskCreateUserConnector from '../../lib/Zendesk/Connector/ZendeskCreateUserConnector';
import ZendeskCreateTicketConnector from '../../lib/Zendesk/Connector/ZendeskCreateTicketConnector';
import ZendeskListUsersBatch from '../../lib/Zendesk/Batch/ZendeskListUsersBatch';
import ZendeskListTicketsBatch from '../../lib/Zendesk/Batch/ZendeskListTicketsBatch';
import {
  container, db, oauth2Provider, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
  await appInstall(ZENDESK_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: 'hanaboso',
      [CLIENT_SECRET]: '2a62ac3162358d4b31662dc0a332958291cb445cc15e58ef7aa9d85a5c71e804',
      [SUBDOMAIN]: 'hbtest8393',
      [TOKEN]: {
        [ACCESS_TOKEN]: 'ea58cf14c8609b1840130c9b0cf3b84d98f63917068f7c2b494e7298f3989c68',
      },
    },
  });
  const app = new ZendeskApplication(oauth2Provider);
  container.setApplication(app);

  const createUser = new ZendeskCreateUserConnector();
  const createTicket = new ZendeskCreateTicketConnector();
  const listUser = new ZendeskListUsersBatch();
  const listTicket = new ZendeskListTicketsBatch();

  createUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createUser);

  createTicket
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createTicket);

  listUser
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listUser);

  listTicket
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listTicket);
}
