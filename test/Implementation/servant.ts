import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ServantGetInventory from '../../lib/Servant/Batch/ServantGetInventory';
import ServantGetWarehouses from '../../lib/Servant/Connector/ServantGetWarehouses';
import ServantApplication, { NAME as SERVANT_NAME } from '../../lib/Servant/ServantApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export function init(): void {
    appInstall(SERVANT_NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: 'neco@neco.cz',
            [PASSWORD]: '123456',
        },
    });
    const app = new ServantApplication();

    container.setApplication(app);
    container.setNode(new ServantGetInventory(), app);
    container.setNode(new ServantGetWarehouses(), app);
}
