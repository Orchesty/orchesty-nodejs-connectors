import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import CustomerIoAddCustomer from '../../lib/Customer.io/Connector/CustomerIoAddCustomer';
import CustomerIoApplication, { API_KEY, NAME, SITE_ID } from '../../lib/Customer.io/CustomerIoApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import {
    container, db, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(NAME, DEFAULT_USER, {
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
