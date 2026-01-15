import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container, db, sender,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import CustomerIoAddCustomer from '../src/Connector/CustomerIoAddCustomer';
import CustomerIoApplication, { API_KEY, NAME, SITE_ID } from '../src/CustomerIoApplication';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [SITE_ID]: 'site_id',
            [API_KEY]: 'api_key',
        },
    });

    const app = new CustomerIoApplication();
    container.setApplication(app);

    const addCustomer = new CustomerIoAddCustomer();

    addCustomer
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(addCustomer);
}
