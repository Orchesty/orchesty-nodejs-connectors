import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import AuthenticaApplication, { NAME as AUTHENTICA } from '../../lib/Authentica/AuthenticaApplication';
import AuthenticaGetStock from '../../lib/Authentica/Batch/AuthenticaGetStock';
import AuthenticaGetOrderStatus from '../../lib/Authentica/Connector/AuthenticaGetOrderStatus';
import AuthenticaGetShippingMethods from '../../lib/Authentica/Connector/AuthenticaGetShippingMethods';
import AuthenticaPutOrders from '../../lib/Authentica/Connector/AuthenticaPutOrders';
import AuthenticaPostProducts from '../../lib/Authentica/Connector/AuthenticaPutProducts';
import {
    appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_USER,
} from '../DataProvider';
import {
    cacheService, container, db, sender,
} from '../TestAbstract';

export default async function init(): Promise<ApplicationInstall> {
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

    return appInstall(
        AUTHENTICA,
        DEFAULT_USER,
        {
            [AUTHORIZATION_FORM]: {
                [CLIENT_ID]: DEFAULT_CLIENT_ID,
                // eslint-disable-next-line max-len
                [CLIENT_SECRET]: DEFAULT_CLIENT_SECRET,
            },
        },
    );
}
