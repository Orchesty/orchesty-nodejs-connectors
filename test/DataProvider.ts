import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import {
  ApplicationInstall,
  IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { PASSWORD, TOKEN, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { API_KEY, NAME as FAKTURAONLINE_APP } from '../lib/Fakturaonline/FakturaonlineApplication';
import { API_TOKEN, NAME as CESKAPOSTA_APP, SECRET_KEY } from '../lib/CeskaPosta/CeskaPostaApplication';
import { db } from './TestAbstract';
import {
  DEVELOPERID,
  MWSAUTHTOKEN,
  SELLINGPARTNERID,
  NAME as AMAZON_APP,
} from '../lib/AmazonApps/SellingPartner/AmazonApplication';
import { NAME as NUTSHELL_APP } from '../lib/Nutshell/NutshellApplication';
import { NAME as BIGCOMMERCE_APP, STORE_HASH } from '../lib/Bigcommerce/BigcommerceApplication';
import {
  NAME as BULKGATE_APP,
  APPLICATION_TOKEN,
  APPLICATION_ID,
} from '../lib/BulkGate/BulkGateApplicationApplication';
import { NAME as CALENDLY_APP } from '../lib/Calendly/CalendlyApplication';
import { NAME as CLICKUP_APP } from '../lib/Clickup/ClickupApplication';
import { NAME as GITHUB_APP } from '../lib/GitHub/GitHubApplication';
import { NAME as GOBALIK_APP } from '../lib/GObalik/GObalikApplication';
import { NAME as INTERCOM_APP } from '../lib/Intercom/IntercomApplication';
import { NAME as KATANA_APP } from '../lib/Katana/KatanaApplication';
import { NAME as MALL_APP } from '../lib/Mall/MallApplication';
import { NAME as MERGADO_APP } from '../lib/Mergado/MergadoApplication';
import { NAME as PAYPAL_APP } from '../lib/Paypal/PaypalApplication';
import { NAME as PIPEDRIVE_APP, SUBDOMAIN } from '../lib/Pipedrive/PipedriveApplication';
import { NAME as PRODUCTBOARD_APP } from '../lib/Productboard/ProductboardApplication';
import { NAME as TABLEAU_APP, PREFIX_SITE, TOKEN_NAME } from '../lib/Tableau/TableauApplication';
import { NAME as TODOIST_APP } from '../lib/Todoist/TodoistApplication';
import { NAME as TWITTER_APP } from '../lib/Twitter/TwitterApplication';
import { NAME as TYPEFORM_APP } from '../lib/Typeform/TypeformApplication';
import { NAME as VYFAKTURUJ_APP, USER_EMAIL } from '../lib/Vyfakturuj/VyfakturujApplication';
import { NAME as WEDO_APP } from '../lib/Wedo/WedoApplication';
import { NAME as WIX_APP } from '../lib/Wix/WixApplication';
import { NAME as MERK_APP } from '../lib/Merk/MerkApplication';
import { NAME as MONDAY_APP } from '../lib/Monday/MondayApplication';
import { NAME as ONESIGNAL_APP, REST_API_KEY } from '../lib/Onesignal/OnesignalApplication';
import { NAME as GREENHOUS_APP, USERNAME } from '../lib/GreenHouse/GreenHouseApplication';
import { NAME as BOX_APP } from '../lib/Box/BoxApplication';

export const DEFAULT_USER = 'TestUser';
export const DEFAULT_CLIENT_ID = 'ClientId';
export const DEFAULT_CLIENT_SECRET = 'ClientSecret';
export const DEFAULT_ACCESS_TOKEN = 'AccessToken';
export const DEFAULT_PASSWORD = 'Password';

export async function appInstall(
  name: string,
  user: string,
  settings: IApplicationSettings,
  nonEncryptedSettings: IApplicationSettings = {},
): Promise<ApplicationInstall> {
  const repo = await db.getApplicationRepository();
  const app = new ApplicationInstall();
  const test = await repo.findByNameAndUser(name, user);

  if (test) {
    await repo.remove(test);
  }
  app
    .setName(name)
    .setUser(user)
    .setSettings(settings)
    .setNonEncryptedSettings(nonEncryptedSettings);
  await repo.insert(app);

  return app;
}

export async function bigcommerceApp() {
  return appInstall(BIGCOMMERCE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
      [STORE_HASH]: 'testHash',
    },
  });
}

export async function pipedriveApp() {
  return appInstall(PIPEDRIVE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [SUBDOMAIN]: 'company',
      [TOKEN]: DEFAULT_ACCESS_TOKEN,
    },
  });
}

export async function nutshellApp() {
  return appInstall(NUTSHELL_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER]: DEFAULT_USER,
      [PASSWORD]: DEFAULT_PASSWORD,
    },
  });
}

export async function mallApp() {
  return appInstall(MALL_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
    },
  });
}

export async function tableauApp() {
  return appInstall(TABLEAU_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [TOKEN_NAME]: 'token name',
      [PREFIX_SITE]: 'prefix',
      [TOKEN]: DEFAULT_ACCESS_TOKEN,
    },
  });
}

export async function wixApp() {
  return appInstall(WIX_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function bulkGateApp() {
  return appInstall(BULKGATE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [APPLICATION_TOKEN]: 'application token',
      [APPLICATION_ID]: 'application id',
    },
  });
}

export async function fakturaonlineApp() {
  return appInstall(FAKTURAONLINE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'api_key',
    },
  });
}

export async function amazonApp() {
  return appInstall(AMAZON_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [SELLINGPARTNERID]: 'selling_partner_id',
      [DEVELOPERID]: 'developer_id',
      [MWSAUTHTOKEN]: 'mws_auth_token',
    },

  });
}

export async function wedoApp() {
  return appInstall(WEDO_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER]: DEFAULT_USER,
      [PASSWORD]: DEFAULT_PASSWORD,

    },

  });
}

export async function mergadoApp() {
  return appInstall(MERGADO_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function paypalApp() {
  return appInstall(PAYPAL_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
    },
  });
}

export async function gitHubApp() {
  return appInstall(GITHUB_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER]: DEFAULT_USER,
      [TOKEN]: DEFAULT_ACCESS_TOKEN,
    },
  });
}

export async function vyfakturujApp() {
  return appInstall(VYFAKTURUJ_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER_EMAIL]: 'info@examle.com',
      [API_KEY]: 'Api key',
    },
  });
}

export async function twitterApp() {
  return appInstall(TWITTER_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function productboardApp() {
  return appInstall(PRODUCTBOARD_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [TOKEN]: DEFAULT_ACCESS_TOKEN,
    },
  });
}

export async function gobalikApp() {
  return appInstall(GOBALIK_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER]: DEFAULT_USER,
      [PASSWORD]: DEFAULT_PASSWORD,
    },
  });
}

export async function ceskaPostaApp() {
  return appInstall(CESKAPOSTA_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_TOKEN]: DEFAULT_ACCESS_TOKEN,
      [SECRET_KEY]: 'secret key',
    },
  });
}

export async function calendlyApp() {
  return appInstall(CALENDLY_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function katanaApp() {
  return appInstall(KATANA_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'Api key',
    },
  });
}

export async function clickupApp() {
  return appInstall(CLICKUP_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [TOKEN]: {
        [ACCESS_TOKEN]: 'pk_32316450_54PFSBA4F3K31I9NEBJMH4QBTVD3V2VR',
      },
    },
  });
}

export async function typeformApp() {
  return appInstall(TYPEFORM_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function todoistApp() {
  return appInstall(TODOIST_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function intercomApp() {
  return appInstall(INTERCOM_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function merkApp() {
  return appInstall(MERK_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'Api key',
    },
  });
}

export async function onesignalApp() {
  return appInstall(ONESIGNAL_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [REST_API_KEY]: 'Api key',
    },
  });
}

export async function greenHouseApp() {
  return appInstall(GREENHOUS_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USERNAME]: DEFAULT_USER,
      [PASSWORD]: DEFAULT_PASSWORD,
    },
  });
}

export async function mondayApp() {
  return appInstall(MONDAY_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [API_KEY]: 'Api key',
    },
  });
}

export async function boxApp() {
  return appInstall(BOX_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}
