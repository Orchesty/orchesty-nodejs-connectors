import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import IntercomListAllContactsBatch from '../../lib/Intercom/Batch/IntercomListAllContactsBatch';
import IntercomCreateContactConnector from '../../lib/Intercom/Connector/IntercomCreateContactConnector';
import IntercomApplication, { NAME as INTERCOM_APP } from '../../lib/Intercom/IntercomApplication';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(INTERCOM_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new IntercomApplication(oauth2Provider);
    container.setApplication(app);

    const createContact = new IntercomCreateContactConnector();
    const listAllContacts = new IntercomListAllContactsBatch();
    createContact
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createContact);
    listAllContacts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listAllContacts);
}
