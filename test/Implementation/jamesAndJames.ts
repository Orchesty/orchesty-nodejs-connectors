import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import JamesAndJamesCreateOrder from '../../lib/JamesAndJames/Connector/JamesAndJamesCreateOrder';
import JamesAndJamesCreateProduct from '../../lib/JamesAndJames/Connector/JamesAndJamesCreateProduct';
import JamesAndJamesUpdateOrder from '../../lib/JamesAndJames/Connector/JamesAndJamesUpdateOrder';
import JamesAndJamesUpdateProduct from '../../lib/JamesAndJames/Connector/JamesAndJamesUpdateProduct';
import JamesAndJamesApplication, {
    BASE_URL,
    BEARER_TOKEN,
    NAME as JAMES_AND_JAMES_APP,
} from '../../lib/JamesAndJames/JamesAndJamesApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export function mock(): void {
    appInstall(JAMES_AND_JAMES_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [BEARER_TOKEN]: 'Token',
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
}
