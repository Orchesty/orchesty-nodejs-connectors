import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import JamesAndJamesGetOrders from '../src/Batch/JamesAndJamesGetOrders';
import JamesAndJamesGetProductStockV1 from '../src/Batch/JamesAndJamesGetProductStockV1';
import JamesAndJamesGetProductStockV2 from '../src/Batch/JamesAndJamesGetProductStockV2';
import JamesAndJamesCreateASN from '../src/Connector/JamesAndJamesCreateASN';
import JamesAndJamesCreateOrder from '../src/Connector/JamesAndJamesCreateOrder';
import JamesAndJamesCreateProduct from '../src/Connector/JamesAndJamesCreateProduct';
import JamesAndJamesUpdateASN from '../src/Connector/JamesAndJamesUpdateASN';
import JamesAndJamesUpdateOrder from '../src/Connector/JamesAndJamesUpdateOrder';
import JamesAndJamesUpdateProduct from '../src/Connector/JamesAndJamesUpdateProduct';
import JamesAndJamesApplication, {
    API_KEY,
    BASE_URL,
    NAME as JAMES_AND_JAMES_APP,
} from '../src/JamesAndJamesApplication';

export function mock(): void {
    appInstall(JAMES_AND_JAMES_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [API_KEY]: 'Token',
            [BASE_URL]: 'https://controlport.co.uk/api/v2',
        },
    });
}

export function init(): void {
    const jamesAndJamesApplication = new JamesAndJamesApplication();

    container.setNode(new JamesAndJamesCreateOrder(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesUpdateOrder(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesCreateProduct(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesUpdateProduct(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesGetProductStockV1(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesGetProductStockV2(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesGetOrders(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesCreateASN(), jamesAndJamesApplication);
    container.setNode(new JamesAndJamesUpdateASN(), jamesAndJamesApplication);
}
