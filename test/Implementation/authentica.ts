import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import AuthenticaApplication, {
    NAME as AUTHENTICA,
} from '../../lib/Authentica/AuthenticaApplication';
import AuthenticaGetStock from '../../lib/Authentica/Batch/AuthenticaGetStock';
import AuthenticaGetStockAvailable from '../../lib/Authentica/Batch/AuthenticaGetStockAvailable';
import AuthenticaCreateOrder from '../../lib/Authentica/Connector/AuthenticaCreateOrder';
import AuthenticaCreateProduct from '../../lib/Authentica/Connector/AuthenticaCreateProduct';
import { AuthenticaGetCarriers } from '../../lib/Authentica/Connector/AuthenticaGetCarriersConnector';
import AuthenticaGetOrder from '../../lib/Authentica/Connector/AuthenticaGetOrder';
import AuthenticaGetOrderStatus from '../../lib/Authentica/Connector/AuthenticaGetOrderStatus';
import AuthenticaGetReceipt from '../../lib/Authentica/Connector/AuthenticaGetReceipt';
import AuthenticaGetShippingMethods from '../../lib/Authentica/Connector/AuthenticaGetShippingMethods';
import AuthenticaPutOrders from '../../lib/Authentica/Connector/AuthenticaPutOrders';
import AuthenticaPostProducts from '../../lib/Authentica/Connector/AuthenticaPutProducts';
import AuthenticaUpdateOrder from '../../lib/Authentica/Connector/AuthenticaUpdateOrder';
import AuthenticaUpdateProduct from '../../lib/Authentica/Connector/AuthenticaUpdateProduct';
import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '../DataProvider';
import { cacheService, container, db, sender } from '../TestAbstract';

export function mock(): ApplicationInstall {
    return appInstall(
        AUTHENTICA,
        DEFAULT_USER,
        {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [CLIENT_ID]: DEFAULT_CLIENT_ID,
                [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            },
        },
    );
}

export async function regiterApiKey(): Promise<void> {
    const redis = container.get(Redis);
    await redis.remove('authentica_cache_key');
    await redis.set(
        'authentica_cache_key',
        JSON.stringify({
            expiration: 1759965308,
            /* eslint-disable @typescript-eslint/naming-convention */
            access_token: 'testAccessToken',
            refresh_token: 'testRefreshToken',
            refresh_token_expiration: 1759965308,
            /* eslint-enable @typescript-eslint/naming-convention */
        }),
        4,
    );
}

export async function initAuthenticaTest(): Promise<void> {
    mock();
    await regiterApiKey();

    const authenticaApplication = new AuthenticaApplication(cacheService);
    container.setApplication(authenticaApplication);

    const authenticaGetShippingMethods = new AuthenticaGetShippingMethods()
        .setSender(sender)
        .setDb(db)
        .setApplication(authenticaApplication);
    container.setConnector(authenticaGetShippingMethods);

    const authenticaPostOrders = new AuthenticaPutOrders()
        .setSender(sender)
        .setDb(db)
        .setApplication(authenticaApplication);
    container.setConnector(authenticaPostOrders);

    const authenticaPostProducts = new AuthenticaPostProducts()
        .setSender(sender)
        .setDb(db)
        .setApplication(authenticaApplication);
    container.setConnector(authenticaPostProducts);

    const authenticaGetOrderStatus = new AuthenticaGetOrderStatus()
        .setSender(sender)
        .setDb(db)
        .setApplication(authenticaApplication);
    container.setConnector(authenticaGetOrderStatus);

    const authenticaGetStock = new AuthenticaGetStock()
        .setSender(sender)
        .setDb(db)
        .setApplication(authenticaApplication);
    container.setBatch(authenticaGetStock);

    const authenticaGetStockAvailable = new AuthenticaGetStockAvailable()
        .setSender(sender)
        .setDb(db)
        .setApplication(authenticaApplication);
    container.setBatch(authenticaGetStockAvailable);

    container.setNode(
        new AuthenticaGetCarriers()
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );

    container.setNode(
        new AuthenticaGetOrder()
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );

    container.setNode(
        new AuthenticaGetReceipt()
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );

    container.setNode(
        new AuthenticaCreateProduct()
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );

    container.setNode(
        new AuthenticaUpdateProduct('product')
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );

    container.setNode(
        new AuthenticaCreateOrder()
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );

    container.setNode(
        new AuthenticaUpdateOrder()
            .setSender(sender)
            .setDb(db)
            .setApplication(authenticaApplication),
    );
}
