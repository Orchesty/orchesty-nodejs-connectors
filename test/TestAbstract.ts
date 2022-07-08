import { container as c, initiateContainer } from '@orchesty/nodejs-sdk';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import Metrics from '@orchesty/nodejs-sdk/dist/lib/Metrics/Metrics';
import ZohoAddRecordsConnector from '../lib/Zoho/Connector/ZohoAddRecordsConnector';
import ZohoApplication from '../lib/Zoho/ZohoApplication';

// eslint-disable-next-line import/no-mutable-exports
export let container: DIContainer;
// eslint-disable-next-line import/no-mutable-exports
export let db: MongoDbClient;

export async function prepare(): Promise<void> {
  await initiateContainer();
  container = c;
  db = container.get(CoreServices.MONGO);
  const sender = container.get(CoreServices.CURL);
  const oauth2 = container.get(CoreServices.OAUTH2_PROVIDER);

  const zohoApp = new ZohoApplication(oauth2);
  const zohoAddRecordsConnector = new ZohoAddRecordsConnector();
  zohoAddRecordsConnector
    .setSender(sender)
    .setDb(db)
    .setApplication(zohoApp);
  container.setConnector(zohoAddRecordsConnector);
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
