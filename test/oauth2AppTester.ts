import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ApplicationManager from '@orchesty/nodejs-sdk/dist/lib/Application/Manager/ApplicationManager';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import DIContainer from '@orchesty/nodejs-sdk/dist/lib/DIContainer/Container';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { question } from 'readline-sync';
import { container, prepare } from './TestAbstract';

export default async function runCli(di: DIContainer) {
  const user = 'default_test_user';

  const name = question('Insert Application name: ');
  const clientId = question('Insert Client Id: ');
  const clientSecret = question('Insert Client Secret: ');

  const appInstall = new ApplicationInstall();
  appInstall
    .setName(name)
    .setUser(user)
    .setSettings({
      [AUTHORIZATION_FORM]: {
        [CLIENT_ID]: clientId,
        [CLIENT_SECRET]: clientSecret,
      },
    });

  const db = di.get(CoreServices.MONGO) as MongoDbClient;
  const repo = await db.getApplicationRepository();
  await repo.insert(appInstall);

  const appManager = di.get(CoreServices.APP_MANAGER) as ApplicationManager;
  const resp = await appManager.authorizationApplication(name, user, '');
  // eslint-disable-next-line no-console
  console.log(resp);

  const returnUri = question('Insert returned url: ');
  const req = new URL(returnUri);

  const parameters: Record<string, string> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of req.searchParams.entries()) {
    parameters[key] = value;
  }

  const { state } = parameters as { state?: string };
  if (!state) {
    throw Error('Missing "state" query parameter.');
  }
  const stateDecode = OAuth2Provider.stateDecode(state.toString());

  await appManager.saveAuthorizationToken(stateDecode.name, stateDecode.user, parameters);
  const updatedApp = await repo.findByNameAndUser(stateDecode.name, stateDecode.user);

  console.log(updatedApp?.getSettings());
}

prepare().then(async () => runCli(container));
