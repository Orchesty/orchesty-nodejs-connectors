import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RaynetCRMGetActivities from '../src/Batch/RaynetCRMGetActivities';
import RaynetCRMGetClients from '../src/Batch/RaynetCRMGetClients';
import RaynetCRMGetContactPersons from '../src/Batch/RaynetCRMGetContactPersons';
import RaynetCRMSubscribeWebhook from '../src/Batch/RaynetCRMSubscribeWebhook';
import RaynetCRMUnregisterWebhook from '../src/Batch/RaynetCRMUnregisterWebhook';
import RaynetCRMGetVoipByTel from '../src/Connector/RaynetCRMGetVoipByTel';
import RaynetCRMUniversalActivityDetail from '../src/Connector/RaynetCRMUniversalActivityDetail';
import RaynetCRMUniversalCreateActivity from '../src/Connector/RaynetCRMUniversalCreateActivity';
import RaynetCRMUniversalDeleteActivity from '../src/Connector/RaynetCRMUniversalDeleteActivity';
import RaynetCRMUniversalUpdateActivity from '../src/Connector/RaynetCRMUniversalUpdateActivity';
import RaynetCRMApplication, { INSTANCE_NAME, NAME as SUPPLY_DO_APP } from '../src/RaynetCRMApplication';

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
    container.setNode(new RaynetCRMGetClients(), raynetCRMApplication);
    container.setNode(new RaynetCRMGetContactPersons(), raynetCRMApplication);
    container.setNode(new RaynetCRMGetVoipByTel(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalActivityDetail(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalCreateActivity(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalUpdateActivity(), raynetCRMApplication);
    container.setNode(new RaynetCRMUniversalDeleteActivity(), raynetCRMApplication);
    container.setNode(new RaynetCRMSubscribeWebhook(), raynetCRMApplication);
    container.setNode(new RaynetCRMUnregisterWebhook(), raynetCRMApplication);
}
