import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import FakturaonlineCreateNewInvoiceConnector
    from '../../lib/Fakturaonline/Connector/FakturaonlineCreateNewInvoiceConnector';
import FakturaonlineGetInvoiceConnector from '../../lib/Fakturaonline/Connector/FakturaonlineGetInvoiceConnector';
import FakturaonlineUpdateInvoiceConnector from '../../lib/Fakturaonline/Connector/FakturaonlineUpdateInvoiceConnector';
import FakturaonlineApplication, {
    API_KEY,
    NAME as FAKTURAONLINE_APP,
} from '../../lib/Fakturaonline/FakturaonlineApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(FAKTURAONLINE_APP, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [API_KEY]: 'api_key',
        },
    });

    const app = new FakturaonlineApplication();
    const createNewInvoice = new FakturaonlineCreateNewInvoiceConnector();
    const createGetInvoice = new FakturaonlineGetInvoiceConnector();
    const updateInvoice = new FakturaonlineUpdateInvoiceConnector();
    container.setApplication(app);

    createNewInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createNewInvoice);

    createGetInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createGetInvoice);

    updateInvoice
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateInvoice);
}
