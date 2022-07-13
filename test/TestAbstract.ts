import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import ZohoAddRecordsConnector from '../lib/Zoho/Connector/ZohoAddRecordsConnector';
import ZohoGetRecordsConnector from '../lib/Zoho/Connector/ZohoGetRecordsConnector';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import BigcommerceApplication from '../lib/Bigcommerce/BigcommerceApplication';
import BigcommerceCreateOrderConnector from '../lib/Bigcommerce/Connector/BigcommerceCreateOrderConnector';
import ZendeskApplication from '../lib/Zendesk/ZendeskApplication';
import ZendeskCreateUserConnector from '../lib/Zendesk/Connector/ZendeskCreateUserConnector';
import ZendeskCreateTicketConnector from '../lib/Zendesk/Connector/ZendeskCreateTicketConnector';
import ZendeskListUsersBatch from '../lib/Zendesk/Batch/ZendeskListUsersBatch';
import ZendeskListTicketsBatch from '../lib/Zendesk/Batch/ZendeskListTicketsBatch';
import NutshellApplication from '../lib/Nutshell/NutshellApplication';
import NutshellGetAccountConnector from '../lib/Nutshell/Connector/NutshellGetAccountConnector';
import NutshellNewAccountConnector from '../lib/Nutshell/Connector/NutshellNewAccountConnector';

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable import/no-mutable-exports */
export let container: DIContainer;
export let db: MongoDbClient;
export let sender: CurlSender;
export let oauth2Provider: OAuth2Provider;
/* eslint-enable import/no-mutable-exports */

export async function prepare(): Promise<void> {
  await initiateContainer();
  container = c;
  db = container.get(CoreServices.MONGO);
  sender = container.get(CoreServices.CURL);
  oauth2Provider = container.get(CoreServices.OAUTH2_PROVIDER);

  initBigCommerce();
  initZoho();
  initZendesk();
  initNutshell();
}

export async function closeConnection(): Promise<void> {
  await db.down();
  await (container.get(CoreServices.METRICS) as Metrics).close();
}

export async function dropCollection(collection: string) {
  const database = await db.db();
  try {
    await database.dropCollection(collection);
  } catch {
    // ...
  }
}

function initZoho(): void {
  const zohoApp = new ZohoApplication(oauth2Provider);
  const zohoAddRecordsConnector = new ZohoAddRecordsConnector();
  const zohoGetRecordsConnector = new ZohoGetRecordsConnector();
  container.setApplication(zohoApp);

  zohoAddRecordsConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(zohoApp);
  container.setConnector(zohoAddRecordsConnector);

  zohoGetRecordsConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(zohoApp);
  container.setConnector(zohoGetRecordsConnector);
}

function initBigCommerce(): void {
  const app = new BigcommerceApplication(oauth2Provider);
  container.setApplication(app);
  const createOrder = new BigcommerceCreateOrderConnector();
  createOrder
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createOrder);
}

function initZendesk(): void {
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

function initNutshell(): void {
  const app = new NutshellApplication();
  container.setApplication(app);

  const getAccount = new NutshellGetAccountConnector();
  const newAccount = new NutshellNewAccountConnector();

  getAccount
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(getAccount);

  newAccount
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(newAccount);
}
