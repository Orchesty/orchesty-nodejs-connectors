import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import BigcommerceApplication, {
    NAME as BIGCOMMERCE_APP,
    STORE_HASH,
} from '../../lib/Bigcommerce/BigcommerceApplication';
import BigcommerceCreateOrderConnector from '../../lib/Bigcommerce/Connector/BigcommerceCreateOrderConnector';
import BigcommerceCreateProductConnector from '../../lib/Bigcommerce/Connector/BigcommerceCreateProductConnector';
import {
    appInstall,
    DEFAULT_ACCESS_TOKEN,
    DEFAULT_CLIENT_ID,
    DEFAULT_CLIENT_SECRET,
    DEFAULT_USER,
} from '../DataProvider';
import { container, db, oauth2Provider, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(BIGCOMMERCE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
            [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            [TOKEN]: {
                [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
            },
            [STORE_HASH]: 'testHash',
        },
    });

    const app = new BigcommerceApplication(oauth2Provider);
    const createOrder = new BigcommerceCreateOrderConnector();
    const createProduct = new BigcommerceCreateProductConnector();
    container.setApplication(app);

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
}
