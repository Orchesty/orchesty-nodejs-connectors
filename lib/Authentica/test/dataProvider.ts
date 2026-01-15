import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { cacheService, container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import AuthenticaApplication, {
    NAME as AUTHENTICA,
} from '../src/AuthenticaApplication';
import AuthenticaGetStock from '../src/Batch/AuthenticaGetStock';
import AuthenticaGetStockAvailable from '../src/Batch/AuthenticaGetStockAvailable';
import AuthenticaCreateOrder from '../src/Connector/AuthenticaCreateOrder';
import AuthenticaCreateProduct from '../src/Connector/AuthenticaCreateProduct';
import AuthenticaCreateReceipt from '../src/Connector/AuthenticaCreateReceipt';
import { AuthenticaGetCarriers } from '../src/Connector/AuthenticaGetCarriersConnector';
import AuthenticaGetOrder from '../src/Connector/AuthenticaGetOrder';
import AuthenticaGetOrderStatus from '../src/Connector/AuthenticaGetOrderStatus';
import AuthenticaGetReceipt from '../src/Connector/AuthenticaGetReceipt';
import AuthenticaGetShippingMethods from '../src/Connector/AuthenticaGetShippingMethods';
import AuthenticaPostLabel from '../src/Connector/AuthenticaPostLabel';
import AuthenticaPutOrders from '../src/Connector/AuthenticaPutOrders';
import AuthenticaPostProducts from '../src/Connector/AuthenticaPutProducts';
import AuthenticaUpdateOrder from '../src/Connector/AuthenticaUpdateOrder';
import AuthenticaUpdateProduct from '../src/Connector/AuthenticaUpdateProduct';
import AuthenticaUpdateReceipt from '../src/Connector/AuthenticaUpdateReceipt';

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

            access_token: 'testAccessToken',
            refresh_token: 'testRefreshToken',
            refresh_token_expiration: 1759965308,

        }),
        4,
    );
}

export async function initAuthenticaTest(): Promise<void> {
    mock();
    await regiterApiKey();

    const authenticaApplication = new AuthenticaApplication(cacheService);
    container.setApplication(authenticaApplication);

    container.setNode(new AuthenticaGetShippingMethods(), authenticaApplication);
    container.setNode(new AuthenticaPutOrders(), authenticaApplication);
    container.setNode(new AuthenticaPostProducts(), authenticaApplication);
    container.setNode(new AuthenticaGetOrderStatus(), authenticaApplication);
    container.setNode(new AuthenticaGetStock(), authenticaApplication);
    container.setNode(new AuthenticaGetStockAvailable(), authenticaApplication);
    container.setNode(new AuthenticaGetCarriers(), authenticaApplication);
    container.setNode(new AuthenticaGetOrder(), authenticaApplication);
    container.setNode(new AuthenticaGetReceipt(), authenticaApplication);
    container.setNode(new AuthenticaCreateProduct(), authenticaApplication);
    container.setNode(new AuthenticaUpdateProduct('product'), authenticaApplication);
    container.setNode(new AuthenticaCreateOrder(), authenticaApplication);
    container.setNode(new AuthenticaUpdateOrder(), authenticaApplication);
    container.setNode(new AuthenticaCreateReceipt(), authenticaApplication);
    container.setNode(new AuthenticaUpdateReceipt(), authenticaApplication);
    container.setNode(new AuthenticaPostLabel(), authenticaApplication);
}
