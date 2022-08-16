import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AuthenticaApplication, { NAME as AUTHENTICA } from '../../lib/Authentica/AuthenticaApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import AuthenticaGetShippingMethods from '../../lib/Authentica/Connector/AuthenticaGetShippingMethods';
import {
  cacheService, container, db, sender,
} from '../TestAbstract';
import AuthenticaPutOrders from '../../lib/Authentica/Connector/AuthenticaPutOrders';
import AuthenticaPostProducts from '../../lib/Authentica/Connector/AuthenticaPutProducts';
import AuthenticaGetOrderStatus from '../../lib/Authentica/Connector/AuthenticaGetOrderStatus';
import AuthenticaGetStock from '../../lib/Authentica/Batch/AuthenticaGetStock';

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
        [CLIENT_ID]: '7c314ce107e4417de085331313ed80ab',
        // eslint-disable-next-line max-len
        [CLIENT_SECRET]: '56bac563ad5a4e0d9c397b61b7c0f6a9db454782b303db5d80e19cf1c7e99283c01945d5b3c6a295569b9cebde3bafeb3665de60b483a7f337575f1ad2b45c32',
      },
    },
  );
}
