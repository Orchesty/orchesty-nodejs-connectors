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
import { NAME } from '../src/ABaseShopify';
import ShopifyGetFulfillmentOrdersFulfilment from '../src/Batch/ShopifyGetFulfillmentOrders';
import ShopifyGetFulfillments from '../src/Batch/ShopifyGetFulfillments';
import ShopifyGetOrderList from '../src/Batch/ShopifyGetOrderList';
import ShopifyGetProductsList from '../src/Batch/ShopifyGetProductsList';
import ShopifyRegisterWebhook from '../src/Batch/ShopifyRegisterWebhook';
import ShopifyUnregisterWebhook from '../src/Batch/ShopifyUnregisterWebhook';
import ShopifyAbsoluteUpdateStock from '../src/Connector/ShopifyAbsoluteUpdateStock';
import ShopifyCreateFulfillment from '../src/Connector/ShopifyCreateFulfillment';
import ShopifyCreateFulfillmentEvent from '../src/Connector/ShopifyCreateFulfillmentEvent';
import ShopifyGetCarrierServices from '../src/Connector/ShopifyGetCarrierServices';
import ShopifyGetFulfillmentOrders from '../src/Connector/ShopifyGetFulfillmentOrders';
import ShopifyGetInventoryLocation from '../src/Connector/ShopifyGetInventoryLocation';
import ShopifyGetShippingZones from '../src/Connector/ShopifyGetShippingZones';
import ShopifyGetVariantDetail from '../src/Connector/ShopifyGetVariantDetail';
import ShopifyUpdateOrder from '../src/Connector/ShopifyUpdateOrder';
import ShopifyUpdateTrackingInfo from '../src/Connector/ShopifyUpdateTrackingInfo';
import ShopifyApplication from '../src/ShopifyApplication';

export default function init(): void {
    appInstall(
        NAME,
        DEFAULT_USER,
        {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [CLIENT_ID]: DEFAULT_CLIENT_ID,
                [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
                [TOKEN]: {
                    [ACCESS_TOKEN]: DEFAULT_ACCESS_TOKEN,
                },
                shopifyUrl: 'https://xyz.myshopify.com',
            },
        },
    );
    const shopifyApplication = new ShopifyApplication(sender, oauth2Provider);
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

    const shopifyGetCarrierServices = new ShopifyGetCarrierServices()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setConnector(shopifyGetCarrierServices);

    const shopifyGetShippingZones = new ShopifyGetShippingZones()
        .setSender(sender)
        .setDb(db)
        .setApplication(shopifyApplication);
    container.setConnector(shopifyGetShippingZones);

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

    const shopifyRegisterWebhook = new ShopifyRegisterWebhook()
        .setApplication(shopifyApplication)
        .setSender(sender)
        .setDb(db);
    container.setBatch(shopifyRegisterWebhook);

    const shopifyUnregisterWebhook = new ShopifyUnregisterWebhook()
        .setApplication(shopifyApplication)
        .setSender(sender)
        .setDb(db);
    container.setBatch(shopifyUnregisterWebhook);

    const shopifyGetFulfillments = new ShopifyGetFulfillments()
        .setApplication(shopifyApplication)
        .setSender(sender)
        .setDb(db);
    container.setBatch(shopifyGetFulfillments);

    const shopifyUpdateOrder = new ShopifyUpdateOrder()
        .setApplication(shopifyApplication)
        .setSender(sender)
        .setDb(db);
    container.setConnector(shopifyUpdateOrder);

    const shopifyGetFulfillmentOrders = new ShopifyGetFulfillmentOrdersFulfilment()
        .setApplication(shopifyApplication)
        .setSender(sender)
        .setDb(db);
    container.setBatch(shopifyGetFulfillmentOrders);

    const shopifyCreateFulfillmentEvent = new ShopifyCreateFulfillmentEvent()
        .setApplication(shopifyApplication)
        .setSender(sender)
        .setDb(db);
    container.setConnector(shopifyCreateFulfillmentEvent);

    container.setNode(new ShopifyGetInventoryLocation(), shopifyApplication);
    container.setNode(new ShopifyGetVariantDetail(), shopifyApplication);
    container.setNode(new ShopifyGetFulfillmentOrders(), shopifyApplication);
    container.setNode(new ShopifyUpdateTrackingInfo(), shopifyApplication);
}
