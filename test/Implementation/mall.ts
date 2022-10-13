import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { CLIENT_ID } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import MallGetOrderListBatch from '../../lib/Mall/Batch/MallGetOrderListBatch';
import MallGetProductListBatch from '../../lib/Mall/Batch/MallGetProductListBatch';
import MallGetOrderDetailConnector from '../../lib/Mall/Connector/MallGetOrderDetailConnector';
import MallGetProductDetailConnector from '../../lib/Mall/Connector/MallGetProductDetailConnector';
import MallPostProductConnector from '../../lib/Mall/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '../../lib/Mall/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '../../lib/Mall/Connector/MallPutProductConnector';
import MallApplication, { NAME as MALL_APP } from '../../lib/Mall/MallApplication';
import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_USER } from '../DataProvider';
import { container, db, sender } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(MALL_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
        },
    });

    const app = new MallApplication();
    container.setApplication(app);

    const getProductList = new MallGetProductListBatch();
    const getOrdersList = new MallGetOrderListBatch();
    const postProduct = new MallPostProductConnector();
    const getProductDetail = new MallGetProductDetailConnector();
    const getOrderDetail = new MallGetOrderDetailConnector();
    const putProduct = new MallPutProductConnector();
    const putOrder = new MallPutOrdersConnector();

    getProductList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getProductList);

    getOrdersList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getOrdersList);

    postProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(postProduct);

    getProductDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getProductDetail);

    getOrderDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(getOrderDetail);

    putProduct
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(putProduct);

    putOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(putOrder);
}
