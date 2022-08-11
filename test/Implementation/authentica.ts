import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AuthenticaApplication, { NAME as AUTHENTICA } from '../../lib/Authentica/AuthenticaApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import AuthenticaGetShippingMethods from '../../lib/Authentica/Connector/AuthenticaGetShippingMethods';
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

  return appInstall(
    AUTHENTICA,
    DEFAULT_USER,
    {
      [AUTHORIZATION_FORM]: {
        [CLIENT_ID]: 'testId',
        [CLIENT_SECRET]: 'testSecret',
      },
    },
  );
}
