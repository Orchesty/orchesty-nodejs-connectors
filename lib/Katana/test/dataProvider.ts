import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import KatanaListProductsBatch from '../src/Batch/KatanaListProductsBatch';
import KatanaCreateCustomerConnector from '../src/Connector/KatanaCreateCustomerConnector';
import KatanaCreateProductConnector from '../src/Connector/KatanaCreateProductConnector';
import KatanaApplication, { API_KEY, NAME as KATANA_APP } from '../src/KatanaApplication';

export default function init(): void {
    appInstall(KATANA_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_KEY]: 'Api key',
        },
    });

    const app = new KatanaApplication();
    const listProducts = new KatanaListProductsBatch();
    const createProduct = new KatanaCreateProductConnector();
    const createCustomer = new KatanaCreateCustomerConnector();
    container.setApplication(app);

    listProducts
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listProducts);

    createProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createProduct);

    createCustomer
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createCustomer);
}
