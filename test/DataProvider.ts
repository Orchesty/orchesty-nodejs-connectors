import {
  ApplicationInstall,
  IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { PASSWORD, TOKEN, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { db } from './TestAbstract';
import {
  ACCOUNT_OWNER_NAME, API_DOMAIN, APP_LINK_NAME, CREATOR_FORM, FORM_LINK_NAME, NAME as ZOHO_APP, REPORT_LINK_NAME,
} from '../lib/Zoho/ZohoApplication';
import { NAME as BIGCOMMERCE_APP, STORE_HASH } from '../lib/Bigcommerce/BigcommerceApplication';
import { REALM_ID, NAME as QUICKBOOKS_APP } from '../lib/Quickbooks/QuickbooksApplication';
import { NAME as ZENDESK_APP, SUBDOMAIN } from '../lib/Zendesk/ZendeskApplication';
import { NAME as SALESFORCE_APP, INSTANCE_NAME } from '../lib/SalesForce/SalesForceApplication';
import { NAME as MALL_APP } from '../lib/Mall/MallApplication';
import { ID, NAME as NUTSHELL_APP } from '../lib/Nutshell/NutshellApplication';
import { NAME as PIPEDRIVE_APP } from '../lib/Pipedrive/PipedriveApplication';
import {
  NAME as TABLEAU_APP, PREFIX_SITE, TOKEN_NAME,
} from '../lib/Tableau/TableauApplication';
import {
  NAME as BULKGATE_APP,
  APPLICATION_TOKEN,
  APPLICATION_ID,
} from '../lib/BulkGate/BulkGateApplicationApplication';
import { NAME as WIX_APP } from '../lib/Wix/WixApplication';
import { API, NAME as ALZA_APP, SERVER } from '../lib/Alza/AlzaApplication';
import { API_KEY, NAME as FAKTURAONLINE_APP } from '../lib/Fakturaonline/FakturaonlineApplication';
import {
  DEVELOPERID, MWSAUTHTOKEN, SELLINGPARTNERID, NAME as AMAZON_APP,
} from '../lib/AmazonApps/SellingPartner/AmazonApplication';
import { ENVIRONMENT, NAME as ALLEGRO_APP } from '../lib/Allegro/AllegroApplication';
import { NAME as WEDO_APP } from '../lib/Wedo/WedoApplication';
import { NAME as MERGADO_APP } from '../lib/Mergado/MergadoApplication';
import { NAME as GITHUB_APP } from '../lib/GitHub/GitHubApplication';
import { NAME as VYFAKTURUJ_APP, USER_EMAIL } from '../lib/Vyfakturuj/VyfakturujApplication';
import { NAME as PAYPAL_APP } from '../lib/Paypal/PaypalApplication';
import { NAME as TWITTER_APP } from '../lib/Twitter/TwitterApplication';
import { NAME as PRODUCTBOARD_APP } from '../lib/Productboard/ProductboardApplication';
import { NAME as GOBALIK_APP } from '../lib/GObalik/GObalikApplication';
import { NAME as CALENDLY_APP } from '../lib/Calendly/CalendlyApplication';

const DEFAULT_USER = 'TestUser';
const DEFAULT_CLIENT_ID = 'ClientId';
const DEFAULT_CLIENT_SECRET = 'ClientSecret';
const DEFAULT_ACCESS_TOKEN = 'AccessToken';
const DEFAULT_PASSWORD = 'Password';

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
  return appInstall(ZOHO_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
        [API_DOMAIN]: 'https://creator.zoho.com',
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
      [SUBDOMAIN]: 'companydomain',
      [TOKEN]: DEFAULT_ACCESS_TOKEN,
    },
  });
}

export async function zendeskApp() {
  return appInstall(ZENDESK_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [SUBDOMAIN]: 'test_subdomain',
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function salesforceAPP() {
  return appInstall(SALESFORCE_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [INSTANCE_NAME]: 'Domain',
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
  });
}

export async function nutshellApp() {
  return appInstall(NUTSHELL_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER]: DEFAULT_USER,
      [PASSWORD]: DEFAULT_PASSWORD,
      [ID]: DEFAULT_CLIENT_ID,
    },
  });
}

export async function quickBooksApp() {
  return appInstall(QUICKBOOKS_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [REALM_ID]: 'Kaja',
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
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

export async function allegroApp() {
  return appInstall(ALLEGRO_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [CLIENT_ID]: DEFAULT_CLIENT_ID,
      [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
      [ENVIRONMENT]: 'test_environment',
      [TOKEN]: {
        [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
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

export async function alzaApp() {
  return appInstall(ALZA_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [USER]: DEFAULT_USER,
      [PASSWORD]: DEFAULT_PASSWORD,
      [SERVER]: 'https://server.cz',
      [API]: 'api_path',
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
