import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import PohodaCreateInvoiceConnector from '../../lib/Pohoda/Connector/PohodaCreateInvoiceConnector';
import PohodaApplication, { AUTH_TOKEN, BASE_URL, COMPANY_ID, NAME } from '../../lib/Pohoda/PohodaApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [BASE_URL]: 'http://localhost',
            [AUTH_TOKEN]: 'QDo=',
            [COMPANY_ID]: '12345678',
        },
    });

    const app = new PohodaApplication();
    container.setApplication(app);

    const createInvoiceConnector = new PohodaCreateInvoiceConnector();

    createInvoiceConnector
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createInvoiceConnector);
}
