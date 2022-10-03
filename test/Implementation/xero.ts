import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import XeroGetAccountsBatch from '../../lib/Xero/Batch/XeroGetAccountsBatch';
import XeroGetContactsBatch from '../../lib/Xero/Batch/XeroGetContactsBatch';
import XeroPostContactsConnector from '../../lib/Xero/Connector/XeroPostContactsConnector';
import XeroPostInvoiceConnector from '../../lib/Xero/Connector/XeroPostInvoiceConnector';
import XeroApplication, { NAME as XERO_APP, XERO_TENANT_ID } from '../../lib/Xero/XeroApplication';
import {
    appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER,
} from '../DataProvider';
import {
    container, db, oauth2Provider, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(XERO_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [XERO_TENANT_ID]: 'Xero-tenant-id',
            [TOKEN]: {
                // eslint-disable-next-line max-len
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new XeroApplication(oauth2Provider);

    container.setApplication(app);
    const getAccounts = new XeroGetAccountsBatch();
    const getContacts = new XeroGetContactsBatch();

    getAccounts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getAccounts);
    getContacts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getContacts);

    const xeroPutContactsConnector = new XeroPostContactsConnector()
        .setDb(db)
        .setApplication(app)
        .setSender(sender);
    container.setConnector(xeroPutContactsConnector);

    const xeroPutInvoiceConnector = new XeroPostInvoiceConnector()
        .setDb(db)
        .setApplication(app)
        .setSender(sender);
    container.setConnector(xeroPutInvoiceConnector);
}
