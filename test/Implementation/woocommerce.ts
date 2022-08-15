import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import {
  appInstall,
  DEFAULT_PASSWORD,
  DEFAULT_USER,
} from '../DataProvider';
import {
  container, db, sender,
} from '../TestAbstract';
import WooCommerceGetProducts from '../../lib/WooCommerce/Batch/WooCommerceGetProducts';
import WooCommerceApplication, { NAME, WOOCOMMERCE_URL } from '../../lib/WooCommerce/WooCommerceApplication';
import WooCommerceGetVariants from '../../lib/WooCommerce/Batch/WooCommerceGetVariants';
import WooCommerceGetOrders from '../../lib/WooCommerce/Batch/WooCommerceGetOrders';
import WooCommerceGetShippingMethods from '../../lib/WooCommerce/Batch/WooCommerceGetShippingMethods';

export default async function init(): Promise<void> {
  await appInstall(
    NAME,
    DEFAULT_USER,
    {
      [AUTHORIZATION_FORM]: {
        [USER]: DEFAULT_USER,
        [PASSWORD]: DEFAULT_PASSWORD,
        [WOOCOMMERCE_URL]: 'http://woocomerce.com',
      },
    },
  );

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
  container.setBatch(wooCommerceGetShippingMethods);
}
