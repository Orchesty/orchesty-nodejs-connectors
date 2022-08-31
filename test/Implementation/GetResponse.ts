import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import GetResponseGetContact from '../../lib/GetResponse/Batch/GetResponseGetContact';
import GetResponseGetAccountsConnector from '../../lib/GetResponse/Connector/GetResponseGetAccountsConnector';
import GetResponseApplication, { API_KEY, NAME } from '../../lib/GetResponse/GetResponseApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(NAME, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_KEY]: 'api_key',
        },
    });

    const app = new GetResponseApplication();
    container.setApplication(app);

    const getAccounts = new GetResponseGetAccountsConnector();
    const getContact = new GetResponseGetContact();

    getAccounts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getAccounts);

    getContact
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getContact);
}
