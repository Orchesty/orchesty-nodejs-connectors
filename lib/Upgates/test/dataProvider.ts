import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import UpgatesCreateWebhooks from '../src/Batch/UpgatesCreateWebhooks';
import UpgatesGetOrders from '../src/Batch/UpgatesGetOrders';
import UpgatesGetProducts from '../src/Batch/UpgatesGetProducts';
import UpgatesDeleteWebhooks from '../src/Connector/UpgatesDeleteWebhooks';
import UpgatesGetOrderStates from '../src/Connector/UpgatesGetOrderStates';
import UpgatesGetPayments from '../src/Connector/UpgatesGetPayments';
import UpgatesGetProductParameters from '../src/Connector/UpgatesGetProductParameters';
import UpgatesGetShipments from '../src/Connector/UpgatesGetShipments';
import UpgatesApplication, { NAME, UPGATES_URL } from '../src/UpgatesApplication';

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
    container.setNode(new UpgatesGetPayments(), upgatesApplication);
    container.setNode(new UpgatesGetProductParameters(), upgatesApplication);
}
