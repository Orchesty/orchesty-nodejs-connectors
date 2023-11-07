import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ServantGetInventory from '../../lib/Servant/Batch/ServantGetInventory';
import ServantApplication, { BASE_URL, NAME as SERVANT_NAME } from '../../lib/Servant/ServantApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export function init(): void {
    appInstall(SERVANT_NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: 'neco@neco.cz',
            [BASE_URL]: 'https://www.webskladservant.cz/impl/SAPI/V5/?wsdl',
            [PASSWORD]: '123456',
        },
    });
    const app = new ServantApplication();

    container.setApplication(app);
    container.setNode(new ServantGetInventory(), app);
}
