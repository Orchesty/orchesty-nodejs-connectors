import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import GObalikCreateOrderConnector from '../src/Connectors/GObalikCreateOrderConnector';
import GObalikOrderDetailConnector from '../src/Connectors/GObalikOrderDetailConnector';
import GObalikOrderListConnector from '../src/Connectors/GObalikOrderListConnector';
import GObalikApplication, { NAME as GOBALIK_APP } from '../src/GObalikApplication';

export default function init(): void {
    appInstall(GOBALIK_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,
        },
    });

    const app = new GObalikApplication();
    container.setApplication(app);
    const createOrder = new GObalikCreateOrderConnector();
    const orderList = new GObalikOrderListConnector();
    const orderDetail = new GObalikOrderDetailConnector();

    createOrder
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(createOrder);

    orderList
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(orderList);

    orderDetail
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setConnector(orderDetail);
}
