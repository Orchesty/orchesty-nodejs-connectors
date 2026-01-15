import {
    appInstall,
    DEFAULT_PASSWORD,
    DEFAULT_USER,
} from '@orchesty/nodejs-connectors/test/DataProvider';
import {
    container, db, sender,
} from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import WooCommerceGetOrders from '../src/Batch/WooCommerceGetOrders';
import WooCommerceGetProducts from '../src/Batch/WooCommerceGetProducts';
import WooCommerceGetVariants from '../src/Batch/WooCommerceGetVariants';
import WooCommerceAddNote from '../src/Connector/WooCommerceAddNote';
import WooCommerceCreateProduct from '../src/Connector/WooCommerceCreateProduct';
import WooCommerceCreateProductCategory from '../src/Connector/WooCommerceCreateProductCategory';
import WooCommerceGetOrderNotes from '../src/Connector/WooCommerceGetOrderNotes';
import WooCommerceGetOrderStatuses from '../src/Connector/WooCommerceGetOrderStatuses';
import WooCommerceGetPaymentGateways from '../src/Connector/WooCommerceGetPaymentGateways';
import WooCommerceGetProduct from '../src/Connector/WooCommerceGetProduct';
import WooCommerceGetProductsBySku from '../src/Connector/WooCommerceGetProductsBySku';
import WooCommerceGetProductVariant from '../src/Connector/WooCommerceGetProductVariant';
import WooCommerceGetSettingsGeneral from '../src/Connector/WooCommerceGetSettingsGeneral';
import WooCommerceGetShippingMethods from '../src/Connector/WooCommerceGetShippingMethods';
import WooCommerceUpdateOrder from '../src/Connector/WooCommerceUpdateOrder';
import WooCommerceUpdateProduct from '../src/Connector/WooCommerceUpdateProduct';
import WooCommerceUpdateProductQuantity from '../src/Connector/WooCommerceUpdateProductQuantity';
import WooCommerceUpdateProductVariant from '../src/Connector/WooCommerceUpdateProductVariant';
import WooCommerceApplication, { NAME, WOOCOMMERCE_URL } from '../src/WooCommerceApplication';

export function mock(extraNonEncryptedSettings?: IApplicationSettings): ApplicationInstall {
    return appInstall(
        NAME,
        DEFAULT_USER,
        {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [USER]: DEFAULT_USER,
                [PASSWORD]: DEFAULT_PASSWORD,
                [WOOCOMMERCE_URL]: 'http://woocomerce.com',
            },
        },
        extraNonEncryptedSettings,
    );
}
export function init(): void {
    const app = new WooCommerceApplication();
    container.setApplication(app);

    const wooCommerceGetProducts = new WooCommerceGetProducts()
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(wooCommerceGetProducts);

    const wooCommerceGetVariants = new WooCommerceGetVariants()
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(wooCommerceGetVariants);

    const wooCommerceGetOrders = new WooCommerceGetOrders()
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(wooCommerceGetOrders);

    const wooCommerceGetShippingMethods = new WooCommerceGetShippingMethods()
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(wooCommerceGetShippingMethods);

    const wooCommerceUpdateOrder = new WooCommerceUpdateOrder();
    wooCommerceUpdateOrder
        .setApplication(app)
        .setDb(db)
        .setSender(sender);
    container.setConnector(wooCommerceUpdateOrder);

    const wooCommerceGetProductVariant = new WooCommerceGetProductVariant()
        .setApplication(app)
        .setDb(db)
        .setSender(sender);
    container.setConnector(wooCommerceGetProductVariant);

    const wooCommerceGetOrderStatuses = new WooCommerceGetOrderStatuses();
    wooCommerceGetOrderStatuses
        .setApplication(app)
        .setDb(db)
        .setSender(sender);
    container.setConnector(wooCommerceGetOrderStatuses);

    const wooCommerceAddNote = new WooCommerceAddNote();
    wooCommerceAddNote
        .setApplication(app)
        .setDb(db)
        .setSender(sender);
    container.setConnector(wooCommerceAddNote);

    container.setNode(new WooCommerceGetOrderNotes(), app);
    container.setNode(new WooCommerceCreateProduct(), app);
    container.setNode(new WooCommerceUpdateProduct(), app);
    container.setNode(new WooCommerceCreateProductCategory(), app);
    container.setNode(new WooCommerceUpdateProductQuantity(), app);
    container.setNode(new WooCommerceGetPaymentGateways(), app);
    container.setNode(new WooCommerceGetSettingsGeneral(), app);
    container.setNode(new WooCommerceUpdateProductVariant(), app);
    container.setNode(new WooCommerceGetProductsBySku(), app);
    container.setNode(new WooCommerceGetProduct(), app);
}
