import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, oauth2Provider, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import WixCreateOrderConnector from '../src/Connector/WixCreateOrderConnector';
import WixCreateProductConnector from '../src/Connector/WixCreateProductConnector';
import WixGetOrderConnector from '../src/Connector/WixGetOrderConnector';
import WixUpdateProductConnector from '../src/Connector/WixUpdateProductConnector';
import WixApplication, { NAME as WIX_APP } from '../src/WixApplication';

export default function init(): void {
    appInstall(WIX_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
        },
    });

    const app = new WixApplication(oauth2Provider);
    container.setApplication(app);

    const createOrder = new WixCreateOrderConnector();
    const createProduct = new WixCreateProductConnector();
    const getOrder = new WixGetOrderConnector();
    const updateProduct = new WixUpdateProductConnector();

    createOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createOrder);

    createProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProduct);

    getOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getOrder);

    updateProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(updateProduct);
}
