import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CoreServices from '@orchesty/nodejs-sdk/dist/lib/DIContainer/CoreServices';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import ShoptetGetAllOrders from '../../lib/Shoptet/Connector/ShoptetGetAllOrders';
import ShoptetGetAllProducts from '../../lib/Shoptet/Connector/ShoptetGetAllProducts';
import ShoptetJobFinishedWebhook from '../../lib/Shoptet/Connector/ShoptetJobFinishedWebhook';
import ShoptetGetProductDetail from '../../lib/Shoptet/Connector/ShoptetGetProductDetail';
import ShoptetParseJsonLines from '../../lib/Shoptet/Batch/ShoptetParseJsonLines';
import ShoptetGetShippingMethods from '../../lib/Shoptet/Connector/ShoptetGetShippingMethods';
import {
  cacheService, container, db, sender,
} from '../TestAbstract';
import APluginShoptetApplication from '../../lib/Shoptet/APluginShoptetApplication';
import ShoptetGetEshopInfo from '../../lib/Shoptet/Connector/ShoptetGetEshopInfo';
import ShoptetGetOrderChangesList from '../../lib/Shoptet/Batch/ShoptetGetOrderChangesList';

const NAME = 'shoptet';

class ImplPluginShoptetApplication extends APluginShoptetApplication {
  getName = (): string => NAME;

  protected shoptetHost = 'www.test.cz';

  getFormStack = (): FormStack => new FormStack();
}

export default async function init(): Promise<void> {
  await appInstall(
    NAME,
    DEFAULT_USER,
    {
      [AUTHORIZATION_FORM]: {
        [TOKEN]: DEFAULT_ACCESS_TOKEN,
      },
    },
    {
      eshopId: '222651',
    },
  );
  const implPluginShoptetApplication = new ImplPluginShoptetApplication(
    cacheService,
    container.get(CoreServices.TOPOLOGY_RUNNER),
  );

  const cacheKey = `${NAME}ApiKey_TestUser`;

  const redisService = container.get(CoreServices.REDIS) as Redis;
  await redisService.set(
    cacheKey,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    JSON.stringify({ expires_in: 55, access_token: 'testToken' }),
    10,
  );

  const shoptetGetAllOrders = new ShoptetGetAllOrders()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setConnector(shoptetGetAllOrders);

  const shoptetGetAllProducts = new ShoptetGetAllProducts()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setConnector(shoptetGetAllProducts);

  const shoptetJobFinishedWebhook = new ShoptetJobFinishedWebhook()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setConnector(shoptetJobFinishedWebhook);

  const shoptetGetProductDetail = new ShoptetGetProductDetail()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setConnector(shoptetGetProductDetail);

  const shoptetParseJsonLines = new ShoptetParseJsonLines()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setBatch(shoptetParseJsonLines);

  const shoptetGetShippingMethods = new ShoptetGetShippingMethods()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setConnector(shoptetGetShippingMethods);

  const shoptetGetEshopInfo = new ShoptetGetEshopInfo()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setConnector(shoptetGetEshopInfo);

  const shoptetGetOrderChangesList = new ShoptetGetOrderChangesList()
    .setSender(sender)
    .setDb(db)
    .setApplication(implPluginShoptetApplication);
  container.setBatch(shoptetGetOrderChangesList);
}
