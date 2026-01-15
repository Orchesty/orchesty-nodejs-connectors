import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProductboardListAllFeaturesBatch from '../src/Batch/ProductboardListAllFeaturesBatch';
import ProductboardListAllProductsBatch from '../src/Batch/ProductboardListAllProductsBatch';
import ProductboardCreateNewFeatureConnector
    from '../src/Connector/ProductboardCreateNewFeatureConnector';
import ProductboardApplication, { NAME as PRODUCTBOARD_APP } from '../src/ProductboardApplication';

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
