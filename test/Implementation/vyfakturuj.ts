import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import VyfakturujCreateContactConnector from '../../lib/Vyfakturuj/Connector/VyfakturujCreateContactConnector';
import VyfakturujCreateInvoiceConnector from '../../lib/Vyfakturuj/Connector/VyfakturujCreateInvoiceConnector';
import VyfakturujApplication, { API_KEY, NAME as VYFAKTURUJ_APP, USER_EMAIL } from '../../lib/Vyfakturuj/VyfakturujApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(VYFAKTURUJ_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER_EMAIL]: 'info@examle.com',
            [API_KEY]: 'Api key',
        },
    });

    const app = new VyfakturujApplication();
    container.setApplication(app);

    const createInvoice = new VyfakturujCreateInvoiceConnector();
    const createContact = new VyfakturujCreateContactConnector();

    createInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createInvoice);

    createContact
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createContact);
}
