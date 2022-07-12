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
  ACCOUNT_OWNER_NAME, APP_LINK_NAME, CREATOR_FORM, FORM_LINK_NAME, NAME as ZOHO_APP, REPORT_LINK_NAME,
} from '../lib/Zoho/ZohoApplication';
import { NAME as BIGCOMMERCE_APP, STORE_HASH } from '../lib/Bigcommerce/BigcommerceApplication';
import { REALM_ID, NAME as QUICKBOOKS_APP } from '../lib/Quickbooks/QuickbooksApplication';

const USER = 'TestUser';

export async function appInstall(
  name: string,
  user: string,
  settings: IApplicationSettings,
): Promise<ApplicationInstall> {
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
  return appInstall(ZOHO_APP, USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: 'testClient',
      [CLIENT_SECRET]: 'secret',
      [TOKEN]: {
        [ACCESS_TOKEN]: 'TOKEN',
      },
    },
    [CREATOR_FORM]: {
      [ACCOUNT_OWNER_NAME]: 'name',
      [APP_LINK_NAME]: 'name_app',
      [FORM_LINK_NAME]: 'form_link',
      [REPORT_LINK_NAME]: 'report_link',
    },
  });
}

export async function bigcommerceApp() {
  return appInstall(BIGCOMMERCE_APP, USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: 'testClient',
      [CLIENT_SECRET]: 'secret',
      [TOKEN]: {
        [ACCESS_TOKEN]: 'TOKEN',
      },
      [STORE_HASH]: 'testHash',
    },
  });
}

export async function quickBooksApp() {
  return appInstall(QUICKBOOKS_APP, USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: 'Karel',
      [CLIENT_SECRET]: 'secret',
      [REALM_ID]: 'Kaja',
      [TOKEN]: {
        [ACCESS_TOKEN]: 'TOKEN',
      },

    },
  });
}