import {
  ApplicationInstall,
  IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { db } from './TestAbstract';
import {
  ACCOUNT_OWNER_NAME, APP_LINK_NAME, CREATOR_FORM, FORM_LINK_NAME, NAME,
} from '../lib/Zoho/ZohoApplication';

const USER = 'TestUser';

export async function appInstall(name: string, user: string, settings: IApplicationSettings): Promise<ApplicationInstall> {
  const repo = await db.getApplicationRepository();
  const app = new ApplicationInstall();
  app
    .setName(name)
    .setUser(user)
    .setSettings(settings);
  await repo.insert(app);

  return app;
}

export async function zohoApp() {
  return appInstall(NAME, USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: 'testClient',
      [CLIENT_SECRET]: 'secret',
      [TOKEN]: {
        [ACCESS_TOKEN]: 'TOKEN',
      },
    },
    [CREATOR_FORM]: {
      [ACCOUNT_OWNER_NAME]: 'karel',
      [APP_LINK_NAME]: 'karel_app',
      [FORM_LINK_NAME]: 'link',
    },
  });
}
