import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';
import ProductboardApplication, { NAME as PRODUCTBOARD_APP } from '../../lib/Productboard/ProductboardApplication';
import ProductboardListAllFeaturesBatch from '../../lib/Productboard/Batch/ProductboardListAllFeaturesBatch';
import ProductboardListAllProductsBatch from '../../lib/Productboard/Batch/ProductboardListAllProductsBatch';
import ProductboardCreateNewFeatureConnector
  from '../../lib/Productboard/Connector/ProductboardCreateNewFeatureConnector';

export default async function init(): Promise<void> {
  await appInstall(PRODUCTBOARD_APP, DEFAULT_USER, {
    [AUTHORIZATION_FORM]: {
      [TOKEN]: '7bvdaaxvxzhwrg6ayei2d3umjjnaudlsa8knyrlkfuwrq5prrttucyjd4usulp7o',
    },
  });
  const app = new ProductboardApplication();
  container.setApplication(app);

  const listAllFeatures = new ProductboardListAllFeaturesBatch();
  const listAllProducts = new ProductboardListAllProductsBatch();
  const createNewFeature = new ProductboardCreateNewFeatureConnector();

  listAllFeatures
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listAllFeatures);
  listAllProducts
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setBatch(listAllProducts);
  createNewFeature
    .setSender(sender)
    .setDb(db)
    .setApplication(app);
  container.setConnector(createNewFeature);
}
