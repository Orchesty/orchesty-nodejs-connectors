import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import
AmazonApplication, {
    DEVELOPERID, MWSAUTHTOKEN,
    NAME as AMAZON_APP,
    SELLINGPARTNERID,
} from '../../lib/AmazonApps/SellingPartner/AmazonApplication';
import AmazonGetOrdersBatch from '../../lib/AmazonApps/SellingPartner/Batch/AmazonGetOrdersBatch';
import AmazonListCatalogItemsBatch from '../../lib/AmazonApps/SellingPartner/Batch/AmazonListCatalogItemsBatch';
import AmazonCreateShipmentConnector from '../../lib/AmazonApps/SellingPartner/Connector/AmazonCreateShipmentConnector';
import AmazonGetListingsItemConnector
    from '../../lib/AmazonApps/SellingPartner/Connector/AmazonGetListingsItemConnector';
import AmazonPutListingsItemConnector
    from '../../lib/AmazonApps/SellingPartner/Connector/AmazonPutListingsItemConnector';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, sender } from '../TestAbstract';

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
