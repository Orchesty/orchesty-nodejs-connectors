import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import GetResponseGetContact from '../src/Batch/GetResponseGetContact';
import GetResponseGetAccountsConnector from '../src/Connector/GetResponseGetAccountsConnector';
import GetResponseApplication, { API_KEY, NAME } from '../src/GetResponseApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
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
