import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import FakturaonlineCreateNewInvoiceConnector
    from '../src/Connector/FakturaonlineCreateNewInvoiceConnector';
import FakturaonlineGetInvoiceConnector from '../src/Connector/FakturaonlineGetInvoiceConnector';
import FakturaonlineUpdateInvoiceConnector from '../src/Connector/FakturaonlineUpdateInvoiceConnector';
import FakturaonlineApplication, {
    API_KEY,
    NAME as FAKTURAONLINE_APP,
} from '../src/FakturaonlineApplication';

export default function init(): void {
    appInstall(FAKTURAONLINE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
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
