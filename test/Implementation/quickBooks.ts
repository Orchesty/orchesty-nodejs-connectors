import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import QuickBooksCreateItemConnector from '../../lib/QuickBooks/Connector/QuickBooksCreateItemConnector';
import QuickBooksUpdateItemConnector from '../../lib/QuickBooks/Connector/QuickBooksUpdateItemConnector';
import QuickBooksApplication, { NAME as QUICKBOOKS_APP, REALM_ID } from '../../lib/QuickBooks/QuickBooksApplication';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import {
    container, db, oauth2Provider, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(QUICKBOOKS_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [REALM_ID]: '123456789',
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const quickApp = new QuickBooksApplication(oauth2Provider);
    const quickBookCreateItemConnector = new QuickBooksCreateItemConnector();
    const quickBookUpdateItemConnector = new QuickBooksUpdateItemConnector();

    container.setApplication(quickApp);

    quickBookCreateItemConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(quickApp);

    container.setConnector(quickBookCreateItemConnector);

    quickBookUpdateItemConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(quickApp);
    container.setConnector(quickBookUpdateItemConnector);
}
