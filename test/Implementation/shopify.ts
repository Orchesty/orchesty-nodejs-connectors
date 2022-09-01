import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ShopifyGetProductsList from '../../lib/Shopify/Batch/ShopifyGetProductsList';
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
}
