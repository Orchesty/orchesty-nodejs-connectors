import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ServantApplication, {
    BASE_URL,
    NAME as SERVANT_NAME,
} from '../../lib/Servant/ServantApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export default function init(): void {
    appInstall(SERVANT_NAME, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [BASE_URL]: '',
            [USER]: 'neco@neco.cz',
            [PASSWORD]: '123456',
        },
    });
    const app = new ServantApplication();

    container.setApplication(app);
}
