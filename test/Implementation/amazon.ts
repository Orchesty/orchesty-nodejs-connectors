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
import { container, db, sender } from '../TestAbstract';

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

    const createShipment = new AmazonCreateShipmentConnector();
    const listCatalogItem = new AmazonListCatalogItemsBatch();
    const putListingsItem = new AmazonPutListingsItemConnector();
    const getListingsItem = new AmazonGetListingsItemConnector();
    const getOrders = new AmazonGetOrdersBatch();

    createShipment
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createShipment);

    listCatalogItem
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(listCatalogItem);

    getOrders
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getOrders);

    putListingsItem
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(putListingsItem);

    getListingsItem
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getListingsItem);
}
