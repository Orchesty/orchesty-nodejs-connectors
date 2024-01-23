import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RaynetCRMGetActivities from '../../lib/RaynetCRM/Batch/RaynetCRMGetActivities';
import RaynetCRMUniversalActivityDetail from '../../lib/RaynetCRM/Connector/RaynetCRMUniversalActivityDetail';
import RaynetCRMUniversalCreateActivities from '../../lib/RaynetCRM/Connector/RaynetCRMUniversalCreateActivities';
import RaynetCRMUniversalUpdateActivities from '../../lib/RaynetCRM/Connector/RaynetCRMUniversalUpdateActivities';
import RaynetCRMApplication, {
    INSTANCE_NAME,
    NAME as SUPPLY_DO_APP,
} from '../../lib/RaynetCRM/RaynetCRMApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export function mock(): void {
    appInstall(SUPPLY_DO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: 'user@user.cz',
            [PASSWORD]: '123456',
            [INSTANCE_NAME]: 'testovaci',
        },
    });
}

export function init(): void {
    const raynetCRMApplication = new RaynetCRMApplication();

    container.setNode(new RaynetCRMGetActivities(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalActivityDetail(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalCreateActivities(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalUpdateActivities(), raynetCRMApplication);
}
