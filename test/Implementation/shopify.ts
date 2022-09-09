import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ShopifyGetOrderList from '../../lib/Shopify/Batch/ShopifyGetOrderList';
import ShopifyGetProductsList from '../../lib/Shopify/Batch/ShopifyGetProductsList';
import ShopifyAbsoluteUpdateStock from '../../lib/Shopify/Connector/ShopifyAbsoluteUpdateStock';
import ShopifyCreateFulfillment from '../../lib/Shopify/Connector/ShopifyCreateFulfillment';
import ShopifyGetShippingMethods from '../../lib/Shopify/Connector/ShopifyGetShippingMethods';
import ShopifyApplication, { NAME } from '../../lib/Shopify/ShopifyApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import {
    container, db, sender,
} from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(
        NAME,
        DEFAULT_USER,
        {
            [AUTHORIZATION_FORM]: {
                [USER]: DEFAULT_USER,
                [PASSWORD]: DEFAULT_PASSWORD,
                shopifyUrl: 'https://kube.myshopify.com',
            },
        },
    );
    const shopifyApplication = new ShopifyApplication(sender);
    container.setApplication(shopifyApplication);

    const shopifyGetProductsList = new ShopifyGetProductsList()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setBatch(shopifyGetProductsList);

    const shopifyGetOrderList = new ShopifyGetOrderList()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setBatch(shopifyGetOrderList);

    const shopifyGetShippingMethods = new ShopifyGetShippingMethods()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setConnector(shopifyGetShippingMethods);

    const shopifyAbsoluteUpdateStock = new ShopifyAbsoluteUpdateStock()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setConnector(shopifyAbsoluteUpdateStock);

    const shopifyCreateFulfillment = new ShopifyCreateFulfillment()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setConnector(shopifyCreateFulfillment);
}