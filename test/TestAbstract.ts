import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import ZohoAddRecordsConnector from '../lib/Zoho/Connector/ZohoAddRecordsConnector';
import ZohoApplication from '../lib/Zoho/ZohoApplication';
import BigcommerceApplication from '../lib/Bigcommerce/BigcommerceApplication';
import BigCommerceCreateOrderConnector from '../lib/Bigcommerce/Connector/BigCommerceCreateOrderConnector';

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

  const zohoApp = new ZohoApplication(oauth2Provider);
  const zohoAddRecordsConnector = new ZohoAddRecordsConnector();
  zohoAddRecordsConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(zohoApp);
  container.setConnector(zohoAddRecordsConnector);

  initBigCommerce();
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

function initBigCommerce(): void {
  const app = new BigcommerceApplication(oauth2Provider);
  container.setApplication(app);
  const createOrder = new BigCommerceCreateOrderConnector();
  createOrder
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createOrder);
}
