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
import WooCommerceCreateProduct from '../../lib/WooCommerce/Connector/WooCommerceCreateProduct';
import WooCommerceCreateProductCategory from '../../lib/WooCommerce/Connector/WooCommerceCreateProductCategory';
import WooCommerceGetOrderNotes from '../../lib/WooCommerce/Connector/WooCommerceGetOrderNotes';
import WooCommerceGetOrderStatuses from '../../lib/WooCommerce/Connector/WooCommerceGetOrderStatuses';
import WooCommerceGetPaymentGateways from '../../lib/WooCommerce/Connector/WooCommerceGetPaymentGateways';
import WooCommerceGetProductVariant from '../../lib/WooCommerce/Connector/WooCommerceGetProductVariant';
import WooCommerceGetSettingsGeneral from '../../lib/WooCommerce/Connector/WooCommerceGetSettingsGeneral';
import WooCommerceGetShippingMethods from '../../lib/WooCommerce/Connector/WooCommerceGetShippingMethods';
import WooCommerceUpdateOrder from '../../lib/WooCommerce/Connector/WooCommerceUpdateOrder';
import WooCommerceUpdateProduct from '../../lib/WooCommerce/Connector/WooCommerceUpdateProduct';
import WooCommerceUpdateProductQuantity from '../../lib/WooCommerce/Connector/WooCommerceUpdateProductQuantity';
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
    container.setNode(new WooCommerceCreateProduct(), app);
    container.setNode(new WooCommerceUpdateProduct(), app);
    container.setNode(new WooCommerceCreateProductCategory(), app);
    container.setNode(new WooCommerceUpdateProductQuantity(), app);
    container.setNode(new WooCommerceGetPaymentGateways(), app);
    container.setNode(new WooCommerceGetSettingsGeneral(), app);
}
