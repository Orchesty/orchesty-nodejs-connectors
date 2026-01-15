import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import
AmazonApplication, {
    DEVELOPERID, MWSAUTHTOKEN,
    NAME as AMAZON_APP,
    SELLINGPARTNERID,
} from '../src/AmazonApplication';
import AmazonGetOrdersBatch from '../src/Batch/AmazonGetOrdersBatch';
import AmazonListCatalogItemsBatch from '../src/Batch/AmazonListCatalogItemsBatch';
import AmazonCreateShipmentConnector from '../src/Connector/AmazonCreateShipmentConnector';
import AmazonGetListingsItemConnector
    from '../src/Connector/AmazonGetListingsItemConnector';
import AmazonPutListingsItemConnector
    from '../src/Connector/AmazonPutListingsItemConnector';

export default function init(): void {
    appInstall(AMAZON_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [SELLINGPARTNERID]: 'selling_partner_id',
            [DEVELOPERID]: 'developer_id',
            [MWSAUTHTOKEN]: 'mws_auth_token',
        },
    });

    const app = new AmazonApplication(sender);
    container.setApplication(app);

    container.setNode(new AmazonCreateShipmentConnector(), app);
    container.setNode(new AmazonListCatalogItemsBatch(), app);
    container.setNode(new AmazonGetOrdersBatch(), app);
    container.setNode(new AmazonPutListingsItemConnector(), app);
    container.setNode(new AmazonGetListingsItemConnector(), app);
}
