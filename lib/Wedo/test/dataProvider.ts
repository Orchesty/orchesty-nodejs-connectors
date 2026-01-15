import { appInstall, DEFAULT_PASSWORD, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container, db, sender } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import WedoGetPackageBatch from '../src/Batch/WedoGetPackageBatch';
import WedoApplication, { NAME as WEDO_APP } from '../src/WedoApplication';

export default function init(): void {
    appInstall(WEDO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [USER]: DEFAULT_USER,
            [PASSWORD]: DEFAULT_PASSWORD,

        },
    });

    const app = new WedoApplication();
    container.setApplication(app);

    const getPackage = new WedoGetPackageBatch();

    getPackage
        .setSender(sender)
        .setDb(db)
        .setApplication(app);
    container.setBatch(getPackage);
}
