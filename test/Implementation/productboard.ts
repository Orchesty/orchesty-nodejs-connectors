import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProductboardListAllFeaturesBatch from '../../lib/Productboard/Batch/ProductboardListAllFeaturesBatch';
import ProductboardListAllProductsBatch from '../../lib/Productboard/Batch/ProductboardListAllProductsBatch';
import ProductboardCreateNewFeatureConnector
    from '../../lib/Productboard/Connector/ProductboardCreateNewFeatureConnector';
import ProductboardApplication, { NAME as PRODUCTBOARD_APP } from '../../lib/Productboard/ProductboardApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default function init(): void {
    appInstall(PRODUCTBOARD_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: DEFAULT_ACCESS_TOKEN,
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
