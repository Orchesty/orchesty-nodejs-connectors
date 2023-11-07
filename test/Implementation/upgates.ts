import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import UpgatesCreateWebhooks from '../../lib/Upgates/Batch/UpgatesCreateWebhooks';
import UpgatesApplication, { NAME, UPGATES_URL } from '../../lib/Upgates/UpgatesApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export default function init(): void {
    appInstall(
        NAME,
        DEFAULT_USER,
        {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [USER]: DEFAULT_USER,
                [PASSWORD]: DEFAULT_PASSWORD,
                [UPGATES_URL]: 'https://private-anon-903e641b16-upgatesapiv2.apiary-mock.com',
            },
        },
    );
    const upgatesApplication = new UpgatesApplication();
    container.setApplication(upgatesApplication);

    container.setNode(new UpgatesCreateWebhooks(), upgatesApplication);
}
