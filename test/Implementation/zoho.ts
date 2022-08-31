import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import ZohoAddRecordsConnector from '../../lib/Zoho/Connector/ZohoAddRecordsConnector';
import ZohoGetRecordsConnector from '../../lib/Zoho/Connector/ZohoGetRecordsConnector';
import
ZohoApplication,
{
    ACCOUNT_OWNER_NAME,
    API_DOMAIN,
    APP_LINK_NAME,
    CREATOR_FORM, FORM_LINK_NAME,
    NAME as ZOHO_APP, REPORT_LINK_NAME,
} from '../../lib/Zoho/ZohoApplication';
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
    await appInstall(ZOHO_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
                [API_DOMAIN]: 'https://creator.zoho.eu',
            },
        },
        [CREATOR_FORM]: {
            [ACCOUNT_OWNER_NAME]: 'hanaboso',
            [APP_LINK_NAME]: 'HanabosoApp',
            [FORM_LINK_NAME]: 'karel',
            [REPORT_LINK_NAME]: 'karel_Report',
        },
    });

    const zohoApp = new ZohoApplication(oauth2Provider);
    container.setApplication(zohoApp);

    const addRecords = new ZohoAddRecordsConnector();
    const getRecords = new ZohoGetRecordsConnector();

    addRecords
        .setSender(sender)
        .setDb(db)
        .setApplication(zohoApp);
    container.setConnector(addRecords);

    getRecords
        .setSender(sender)
        .setDb(db)
        .setApplication(zohoApp);
    container.setConnector(getRecords);
}
