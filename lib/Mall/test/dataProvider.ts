import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { CLIENT_ID } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import MallGetOrderListBatch from '../src/Batch/MallGetOrderListBatch';
import MallGetProductListBatch from '../src/Batch/MallGetProductListBatch';
import MallGetOrderDetailConnector from '../src/Connector/MallGetOrderDetailConnector';
import MallGetProductDetailConnector from '../src/Connector/MallGetProductDetailConnector';
import MallPostProductConnector from '../src/Connector/MallPostProductConnector';
import MallPutOrdersConnector from '../src/Connector/MallPutOrdersConnector';
import MallPutProductConnector from '../src/Connector/MallPutProductConnector';
import MallApplication, { NAME as MALL_APP } from '../src/MallApplication';

export default function init(): void {
    appInstall(MALL_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: DEFAULT_CLIENT_ID,
        },
    });
    appInstall(MALL_APP, DEFAULT_USER, {
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
