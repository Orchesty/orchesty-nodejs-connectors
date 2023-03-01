import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import IDokladNewInvoiceIssuedConnector from '../../lib/IDoklad/Connector/IDokladNewInvoiceIssuedConnector';
import IDokladApplication, { NAME as I_DOKLAD_APP } from '../../lib/IDoklad/IDokladApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(I_DOKLAD_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });
    const app = new IDokladApplication(oauth2Provider);
    container.setApplication(app);

    const iDokladNewInvoiceIssuedConnector = new IDokladNewInvoiceIssuedConnector();

    iDokladNewInvoiceIssuedConnector
        .setApplication(app)
        .setSender(sender)
        .setDb(db);

    container.setConnector(iDokladNewInvoiceIssuedConnector);
}
