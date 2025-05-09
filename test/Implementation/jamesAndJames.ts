import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import JamesAndJamesGetOrders from '../../lib/JamesAndJames/Batch/JamesAndJamesGetOrders';
import JamesAndJamesGetProductStockV1 from '../../lib/JamesAndJames/Batch/JamesAndJamesGetProductStockV1';
import JamesAndJamesGetProductStockV2 from '../../lib/JamesAndJames/Batch/JamesAndJamesGetProductStockV2';
import JamesAndJamesCreateASN from '../../lib/JamesAndJames/Connector/JamesAndJamesCreateASN';
import JamesAndJamesCreateOrder from '../../lib/JamesAndJames/Connector/JamesAndJamesCreateOrder';
import JamesAndJamesCreateProduct from '../../lib/JamesAndJames/Connector/JamesAndJamesCreateProduct';
import JamesAndJamesUpdateASN from '../../lib/JamesAndJames/Connector/JamesAndJamesUpdateASN';
import JamesAndJamesUpdateOrder from '../../lib/JamesAndJames/Connector/JamesAndJamesUpdateOrder';
import JamesAndJamesUpdateProduct from '../../lib/JamesAndJames/Connector/JamesAndJamesUpdateProduct';
import JamesAndJamesApplication, {
    API_KEY,
    BASE_URL,
    NAME as JAMES_AND_JAMES_APP,
} from '../../lib/JamesAndJames/JamesAndJamesApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
