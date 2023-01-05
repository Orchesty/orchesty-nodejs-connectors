import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import PaypalCreateOrderConnector from '../../lib/Paypal/Connector/PaypalCreateOrderConnector';
import PaypalCreatePayoutConnector from '../../lib/Paypal/Connector/PaypalCreatePayoutConnector';
import PaypalCreateProductConnector from '../../lib/Paypal/Connector/PaypalCreateProductConnector';
import PaypalApplication, { NAME as PAYPAL_APP } from '../../lib/Paypal/PaypalApplication';
import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(PAYPAL_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
        },
    });

    const app = new PaypalApplication(sender);
    container.setApplication(app);

    const createProduct = new PaypalCreateProductConnector();
    const createOrder = new PaypalCreateOrderConnector();
    const createPayout = new PaypalCreatePayoutConnector();

    createProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProduct);
    createOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createOrder);
    createPayout
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createPayout);
}
