import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import UpgatesCreateWebhooks from '../../lib/Upgates/Batch/UpgatesCreateWebhooks';
import UpgatesGetOrders from '../../lib/Upgates/Batch/UpgatesGetOrders';
import UpgatesGetProducts from '../../lib/Upgates/Batch/UpgatesGetProducts';
import UpgatesDeleteWebhooks from '../../lib/Upgates/Connector/UpgatesDeleteWebhooks';
import UpgatesGetOrderStates from '../../lib/Upgates/Connector/UpgatesGetOrderStates';
import UpgatesGetShipments from '../../lib/Upgates/Connector/UpgatesGetShipments';
import UpgatesApplication, { NAME, UPGATES_URL } from '../../lib/Upgates/UpgatesApplication';
import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export function mock(extraNonEncryptedSettings?: IApplicationSettings): ApplicationInstall {
    return appInstall(
        NAME,
        DEFAULT_USER,
        {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [USER]: DEFAULT_USER,
                [PASSWORD]: DEFAULT_PASSWORD,
                [UPGATES_URL]: 'https://private-anon-903e641b16-upgatesapiv2.apiary-mock.com',
            },
        },
        extraNonEncryptedSettings,
    );
}

export function init(): void {
    const upgatesApplication = new UpgatesApplication();
    container.setApplication(upgatesApplication);

    container.setNode(new UpgatesCreateWebhooks(), upgatesApplication);
    container.setNode(new UpgatesDeleteWebhooks(), upgatesApplication);
    container.setNode(new UpgatesGetOrders(), upgatesApplication);
    container.setNode(new UpgatesGetProducts(), upgatesApplication);
    container.setNode(new UpgatesGetOrderStates(), upgatesApplication);
    container.setNode(new UpgatesGetShipments(), upgatesApplication);
}
