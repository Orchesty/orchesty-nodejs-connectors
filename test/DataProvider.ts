import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { PASSWORD, TOKEN, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { API_TOKEN, NAME as CESKAPOSTA_APP, SECRET_KEY } from '../lib/CeskaPosta/CeskaPostaApplication';
import { NAME as CLICKUP_APP } from '../lib/Clickup/ClickupApplication';
import { API_KEY, NAME as FAKTURAONLINE_APP } from '../lib/Fakturaonline/FakturaonlineApplication';
import { NAME as GITHUB_APP } from '../lib/GitHub/GitHubApplication';
import { NAME as GOBALIK_APP } from '../lib/GObalik/GObalikApplication';
import { NAME as GREENHOUS_APP, USERNAME } from '../lib/GreenHouse/GreenHouseApplication';
import { NAME as INTERCOM_APP } from '../lib/Intercom/IntercomApplication';
import { NAME as KATANA_APP } from '../lib/Katana/KatanaApplication';
import { NAME as MALL_APP } from '../lib/Mall/MallApplication';
import { NAME as MERK_APP } from '../lib/Merk/MerkApplication';
import { NAME as NUTSHELL_APP } from '../lib/Nutshell/NutshellApplication';
import { NAME as ONESIGNAL_APP, REST_API_KEY } from '../lib/Onesignal/OnesignalApplication';
import { NAME as PAYPAL_APP } from '../lib/Paypal/PaypalApplication';
import { NAME as PIPEDRIVE_APP, SUBDOMAIN } from '../lib/Pipedrive/PipedriveApplication';
import {
    CONTENT_URL, NAME as TABLEAU_APP, PREFIX_SITE, TOKEN_NAME, TOKEN_SECRET,
} from '../lib/Tableau/TableauApplication';
import { NAME as TWITTER_APP } from '../lib/Twitter/TwitterApplication';
import { NAME as VYFAKTURUJ_APP, USER_EMAIL } from '../lib/Vyfakturuj/VyfakturujApplication';
import { NAME as WEDO_APP } from '../lib/Wedo/WedoApplication';
import { NAME as WIX_APP } from '../lib/Wix/WixApplication';
import { db } from './TestAbstract';

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

export async function pipedriveApp(): Promise<ApplicationInstall> {
    return appInstall(PIPEDRIVE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [SUBDOMAIN]: 'company',
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });
}

export async function nutshellApp(): Promise<ApplicationInstall> {
    return appInstall(NUTSHELL_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });
}

export async function mallApp(): Promise<ApplicationInstall> {
    return appInstall(MALL_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
        },
    });
}

export async function tableauApp(): Promise<ApplicationInstall> {
    return appInstall(TABLEAU_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [TOKEN_NAME]: 'token',
            [PREFIX_SITE]: 'prefix',
            [TOKEN_SECRET]: 'toke_secret',
            [CONTENT_URL]: 'content_url',
        },
    });
}

export async function wixApp(): Promise<ApplicationInstall> {
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

export async function fakturaonlineApp(): Promise<ApplicationInstall> {
    return appInstall(FAKTURAONLINE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_KEY]: 'api_key',
        },
    });
}

export async function wedoApp(): Promise<ApplicationInstall> {
    return appInstall(WEDO_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,

        },

    });
}

export async function paypalApp(): Promise<ApplicationInstall> {
    return appInstall(PAYPAL_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
        },
    });
}

export async function gitHubApp(): Promise<ApplicationInstall> {
    return appInstall(GITHUB_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
        },
    });
}

export async function vyfakturujApp(): Promise<ApplicationInstall> {
    return appInstall(VYFAKTURUJ_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USER_EMAIL]: 'info@examle.com',
            [API_KEY]: 'Api key',
        },
    });
}

export async function twitterApp(): Promise<ApplicationInstall> {
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

export async function gobalikApp(): Promise<ApplicationInstall> {
    return appInstall(GOBALIK_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });
}

export async function ceskaPostaApp(): Promise<ApplicationInstall> {
    return appInstall(CESKAPOSTA_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_TOKEN]: DEFAULT_ACCESS_TOKEN,
            [SECRET_KEY]: 'secret key',
        },
    });
}

export async function katanaApp(): Promise<ApplicationInstall> {
    return appInstall(KATANA_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_KEY]: 'Api key',
        },
    });
}

export async function clickupApp(): Promise<ApplicationInstall> {
    return appInstall(CLICKUP_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });
}

export async function intercomApp(): Promise<ApplicationInstall> {
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

export async function merkApp(): Promise<ApplicationInstall> {
    return appInstall(MERK_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_KEY]: 'Api key',
        },
    });
}

export async function onesignalApp(): Promise<ApplicationInstall> {
    return appInstall(ONESIGNAL_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [REST_API_KEY]: 'Api key',
        },
    });
}

export async function greenHouseApp(): Promise<ApplicationInstall> {
    return appInstall(GREENHOUS_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [USERNAME]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });
}
