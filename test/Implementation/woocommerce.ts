import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import WooCommerceGetOrders from '../../lib/WooCommerce/Batch/WooCommerceGetOrders';
import WooCommerceGetProducts from '../../lib/WooCommerce/Batch/WooCommerceGetProducts';
import WooCommerceGetVariants from '../../lib/WooCommerce/Batch/WooCommerceGetVariants';
import WooCommerceAddNote from '../../lib/WooCommerce/Connector/WooCommerceAddNote';
import WooCommerceGetOrderNotes from '../../lib/WooCommerce/Connector/WooCommerceGetOrderNotes';
import WooCommerceGetOrderStatuses from '../../lib/WooCommerce/Connector/WooCommerceGetOrderStatuses';
import WooCommerceGetProductVariant from '../../lib/WooCommerce/Connector/WooCommerceGetProductVariant';
import WooCommerceGetShippingMethods from '../../lib/WooCommerce/Connector/WooCommerceGetShippingMethods';
import WooCommerceUpdateOrder from '../../lib/WooCommerce/Connector/WooCommerceUpdateOrder';
import WooCommerceApplication, { NAME, WOOCOMMERCE_URL } from '../../lib/WooCommerce/WooCommerceApplication';
import {
    appInstall,
    DEFAULT_PASSWORD,
    DEFAULT_USER,
} from '../DataProvider';
import {
    container, db, sender,
} from '../TestAbstract';

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
}
